// src/routes/PlaceOrder.jsx
import React, {useState, useEffect} from "react";
import { account, databases, storage, DATABASE_ID, ORDERS_COLLECTION_ID, BUCKET_ID, USERS_COLLECTION_ID } from "../appwrite";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder(){
  const [service, setService] = useState("writing");
  const [deadline, setDeadline] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function prefill() {
      try {
        const user = await account.get();
        if(user) {
          setName(user.name || "");
          setEmail(user.email || "");
        }
      } catch (e) {
        // not logged in -> ignore
      }
    }
    prefill();
  }, []);

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user
      let userId = null;
      try {
        const user = await account.get();
        userId = user.$id;
      } catch (x) {
        userId = null; // allow anonymous? MVP expects auth ideally
      }

      // Upload files to Appwrite Storage
      const uploaded = [];
      for (const f of files) {
        // Appwrite storage requires a unique fileId string for createFile
        const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const res = await storage.createFile(BUCKET_ID, uniqueId, f);
        // res.$id is file id, res.$permissions/res.bucket are included
        uploaded.push({ name: f.name, fileId: res.$id, url: `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${res.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT}` });
      }

      // Create order document with uploaded file IDs
      const order = {
        clientId: userId,
        name,
        email,
        service,
        deadline,
        wordCount: wordCount || null,
        files: uploaded,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      await databases.createDocument(DATABASE_ID, ORDERS_COLLECTION_ID, "unique()", order);

      alert("Order created! Please confirm payment on WhatsApp.");
      navigate("/dashboard");
    } catch(e){
      console.error(e);
      alert("Error: " + (e.message || JSON.stringify(e)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Place Order</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div><input placeholder="Email or WhatsApp" value={email} onChange={e=>setEmail(e.target.value)} required/></div>

        <div>
          <label>Service</label>
          <select value={service} onChange={e=>setService(e.target.value)}>
            <option value="writing">Writing</option>
            <option value="transcription">Transcription</option>
            <option value="editing">Editing</option>
          </select>
        </div>

        <div><input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} required/></div>
        <div><input placeholder="Word count (if writing)" value={wordCount} onChange={e=>setWordCount(e.target.value)} /></div>

        <div>
          <label>Upload files (assignment / audio)</label>
          <input type="file" multiple onChange={handleFiles} />
        </div>

        <div style={{marginTop:10}}>
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Order"}</button>
        </div>
      </form>

      <div style={{marginTop:16}}>
        <strong>Payment (MVP)</strong>
        <p>Use M-Pesa: 07xx xxxx or WhatsApp us to confirm payment.</p>
      </div>
    </div>
  );
}

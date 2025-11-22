// src/routes/AdminDashboard.jsx
import React, {useEffect, useState} from "react";
import { account, databases, storage, DATABASE_ID, ORDERS_COLLECTION_ID, BUCKET_ID } from "../appwrite";

export default function AdminDashboard(){
  const [orders, setOrders] = useState([]);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchAll() {
      try {
        const list = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID);
        if (mounted) setOrders(list.documents.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch(e) {
        console.error(e);
      }
    }
    fetchAll();
    // Optional: poll or use realtime Appwrite for updates
    return () => { mounted = false; };
  }, []);

  const startUpload = (orderId) => {
    setUploadingFor(orderId);
  };

  const handleFile = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const submitUpload = async () => {
    if(!fileToUpload || !uploadingFor) return alert("Pick file and an order");
    try {
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const res = await storage.createFile(BUCKET_ID, uniqueId, fileToUpload);

      // update order doc with adminFileId and status
      await databases.updateDocument(DATABASE_ID, ORDERS_COLLECTION_ID, uploadingFor, {
        adminFileId: res.$id,
        status: "completed"
      });

      alert("Uploaded completed file and marked order completed");
      setFileToUpload(null);
      setUploadingFor(null);

      // refresh orders list
      const list = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID);
      setOrders(list.documents.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch(e){
      console.error(e);
      alert("Error: " + (e.message || JSON.stringify(e)));
    }
  };

  const logout = async () => {
    try { await account.deleteSession("current"); } catch(e){}
    window.location.href = "/";
  };

  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard</h2>
      <div style={{marginBottom:12}}>
        <button onClick={logout}>Logout</button>
      </div>

      <div>
        {orders.map(o => (
          <div key={o.$id} style={{border:"1px solid #eee", padding:8, marginBottom:8}}>
            <div><strong>{o.service}</strong> — {o.status}</div>
            <div>Client: {o.name} ({o.email})</div>
            <div>Files:
              <ul>
                {o.files?.map((f,idx) => <li key={idx}><a href={f.url} target="_blank" rel="noreferrer">{f.name}</a></li>)}
              </ul>
            </div>
            <div>
              {o.adminFileId ? <a href={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${o.adminFileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT}`} target="_blank" rel="noreferrer">Completed file</a> : (
                <>
                  <button onClick={() => startUpload(o.$id)}>Upload completed file</button>
                </>
              )}
            </div>

            {uploadingFor === o.$id && (
              <div style={{marginTop:8}}>
                <input type="file" onChange={handleFile} />
                <button onClick={submitUpload}>Submit Completed File</button>
                <button onClick={()=>{setUploadingFor(null); setFileToUpload(null);}}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// src/routes/PlaceOrder.jsx
import React, { useState, useEffect } from "react";
import { account, databases, storage, DATABASE_ID, ORDERS_COLLECTION_ID, BUCKET_ID } from "../appwrite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/constants";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";

export default function PlaceOrder() {
  const [service, setService] = useState("writing");
  const [deadline, setDeadline] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function prefill() {
      try {
        const user = await account.get();
        if (user) {
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

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        uploaded.push({ 
          name: f.name, 
          fileId: res.$id, 
          url: `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${res.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT}` 
        });
      }

      // Create order document with uploaded file IDs
      const order = {
        clientId: userId,
        name,
        email,
        service,
        deadline,
        description,
        wordCount: wordCount || null,
        files: uploaded,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      await databases.createDocument(DATABASE_ID, ORDERS_COLLECTION_ID, "unique()", order);

      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 2000);
    } catch(e){
      console.error(e);
      setError("Error: " + (e.message || JSON.stringify(e)));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Your order has been created successfully. Please confirm payment on WhatsApp.
            </p>
            <p className="text-gray-500">Redirecting to dashboard...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Place Your Order</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email or WhatsApp</label>
                <input
                  type="text"
                  placeholder="Enter email or WhatsApp"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="writing">Academic Writing</option>
                  <option value="transcription">Transcription</option>
                  <option value="editing">Editing</option>
                  <option value="proofreading">Proofreading</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Word Count (for writing)</label>
              <input
                type="number"
                placeholder="Enter word count"
                value={wordCount}
                onChange={e => setWordCount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Instructions</label>
              <textarea
                placeholder="Describe your requirements in detail..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Files (assignment / audio)</label>
              <input
                type="file"
                multiple
                onChange={handleFiles}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {files.map((f, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm text-gray-600">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" fullWidth loading={loading} className="py-3">
              Submit Order
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">💳 Payment (MVP)</h3>
            <p className="text-gray-600 text-sm">
              Use M-Pesa: 07xx xxxx or WhatsApp us to confirm payment after placing your order.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

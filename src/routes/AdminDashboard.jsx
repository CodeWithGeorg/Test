// src/routes/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { databases, storage, DATABASE_ID, ORDERS_COLLECTION_ID, BUCKET_ID } from "../appwrite";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/constants";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const list = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID);
      setOrders(list.documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const startUpload = (orderId) => {
    setUploadingFor(orderId);
  };

  const handleFile = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const submitUpload = async () => {
    if (!fileToUpload || !uploadingFor) return;
    try {
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const res = await storage.createFile(BUCKET_ID, uniqueId, fileToUpload);

      // update order doc with adminFileId and status
      await databases.updateDocument(DATABASE_ID, ORDERS_COLLECTION_ID, uploadingFor, {
        adminFileId: res.$id,
        status: "completed"
      });

      setFileToUpload(null);
      setUploadingFor(null);

      // refresh orders list
      await fetchOrders();
    } catch (e) {
      console.error(e);
      alert("Error: " + (e.message || JSON.stringify(e)));
    }
  };

  const cancelUpload = () => {
    setUploadingFor(null);
    setFileToUpload(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", label: "Pending" },
      processing: { variant: "info", label: "Processing" },
      completed: { variant: "success", label: "Completed" },
      cancelled: { variant: "danger", label: "Cancelled" },
    };
    const config = statusConfig[status] || { variant: "default", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and process client orders</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
            Logout
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "processing", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No orders found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.$id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {order.service?.charAt(0).toUpperCase() + order.service?.slice(1)} Order
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Client</p>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-gray-600">{order.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Deadline</p>
                        <p className="font-medium">{order.deadline || "Not specified"}</p>
                      </div>
                      {order.wordCount && (
                        <div>
                          <p className="text-gray-500">Word Count</p>
                          <p className="font-medium">{order.wordCount}</p>
                        </div>
                      )}
                      {order.description && (
                        <div>
                          <p className="text-gray-500">Description</p>
                          <p className="font-medium">{order.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Client Files */}
                    {order.files && order.files.length > 0 && (
                      <div className="mt-4">
                        <p className="text-gray-500 text-sm mb-2">Client Files:</p>
                        <div className="flex flex-wrap gap-2">
                          {order.files.map((file, idx) => (
                            <a
                              key={idx}
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100"
                            >
                              📎 {file.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admin Actions */}
                  <div className="lg:w-64">
                    {order.adminFileId ? (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-700 font-medium mb-2">✅ Completed</p>
                        <a
                          href={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${order.adminFileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm underline"
                        >
                          View Completed File
                        </a>
                      </div>
                    ) : uploadingFor === order.$id ? (
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <input
                          type="file"
                          onChange={handleFile}
                          className="w-full text-sm"
                        />
                        <div className="flex gap-2">
                          <Button size="small" onClick={submitUpload}>
                            Upload
                          </Button>
                          <Button size="small" variant="outline" onClick={cancelUpload}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => startUpload(order.$id)} fullWidth>
                        Upload Completed File
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

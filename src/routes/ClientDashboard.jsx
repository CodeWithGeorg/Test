import { useEffect, useState } from "react";
import { databases, account } from "../appwrite";
// import {OrderCard} from "../components/OrderCard";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION
      );
      setOrders(response.documents);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.$id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

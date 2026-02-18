import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import { ORDER_STATUS_LABELS } from '../config';
import { ROUTES, getOrderDetailsUrl } from '../routes/constants';

/**
 * Order History Page
 * Displays list of user's past orders
 */
export default function OrderHistory() {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders(user?.$id || user?.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">Error loading orders: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link
            to={ROUTES.PLACE_ORDER}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Your First Order
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.$id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900">
              Order #{order.$id?.slice(0, 8)}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Placed on: {createdAt}
          </p>
          {order.total && (
            <p className="text-sm font-medium text-gray-900 mt-1">
              Total: ${order.total}
            </p>
          )}
        </div>

        <Link
          to={getOrderDetailsUrl(order.$id)}
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

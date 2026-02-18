import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import LoadingButton from '../components/LoadingButton';
import { ORDER_STATUS_LABELS } from '../config';
import { ROUTES } from '../routes/constants';
import { useToast } from '../components/Toast';

/**
 * Order Details Page
 * Displays detailed information about a specific order
 */
export default function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { getOrderById, updateOrderStatus, cancelOrder, loading } = useOrders(user?.$id || user?.id);
  const toast = useToast();
  
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const orderData = await getOrderById(id);
      setOrder(orderData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id);
      toast.success('Order cancelled successfully');
      fetchOrder();
    } catch (err) {
      toast.error('Failed to cancel order');
    }
  };

  if (isLoading) {
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
          <p className="text-red-800">Error: {error}</p>
          <Link to={ROUTES.ORDER_HISTORY} className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <p className="text-gray-600">Order not found.</p>
        <Link to={ROUTES.ORDER_HISTORY} className="text-blue-600 hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A';
  const updatedAt = order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A';

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <Link to={ROUTES.ORDER_HISTORY} className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Orders
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{order.$id?.slice(0, 8)}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
        </div>

        {/* Order Info */}
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium text-gray-900">{createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="font-medium text-gray-900">{updatedAt}</p>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h2>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.name || item.productName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">${item.price}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">${item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {order.total && (
            <div className="mt-4 text-right">
              <p className="text-lg font-bold text-gray-900">
                Total: ${order.total}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {order.status === 'pending' && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <LoadingButton
              onClick={handleCancelOrder}
              loading={loading}
              variant="danger"
            >
              Cancel Order
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
}

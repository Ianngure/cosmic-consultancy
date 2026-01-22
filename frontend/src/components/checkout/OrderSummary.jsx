import React from 'react';
import { X } from 'lucide-react';
import Card from '../common/Card';

const OrderSummary = ({ items, onRemoveItem, showRemove = true }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-3 border-b">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  {item.category && (
                    <p className="text-sm text-gray-600">{item.category}</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">${item.price}</span>
                  {showRemove && onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold pt-4 border-t">
              <span>Total</span>
              <span className="text-indigo-600">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default OrderSummary;
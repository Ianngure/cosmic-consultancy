import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentService from '../services/paymentService';
import { CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { cartItems, getTotal, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Create order
      const courseIds = cartItems.map(course => course.id);
      const orderResponse = await paymentService.createOrder(courseIds);
      const orderId = orderResponse.order.id;

      // Create payment intent
      const { client_secret } = await paymentService.createPaymentIntent(orderId);

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Confirm payment on backend
      await paymentService.confirmPayment(paymentIntent.id);

      setSuccess(true);
      clearCart();

      // Redirect to success page
      setTimeout(() => {
        navigate('/my-courses');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/courses')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg inline-block">
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p>Redirecting to your courses...</p>
        </div>
      </div>
    );
  }

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {cartItems.map((course) => (
                <div key={course.id} className="flex justify-between py-3 border-b">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.category}</p>
                  </div>
                  <span className="font-semibold">${course.price}</span>
                </div>
              ))}

              <div className="flex justify-between pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-indigo-600">${getTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Payment Information</h2>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Details
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>

                <div className="flex items-center mb-6 text-sm text-gray-600">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <button
                  type="submit"
                  disabled={!stripe || processing}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {processing ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500 text-center">
                By completing your purchase you agree to these Terms of Service
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Secure Checkout</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <Lock className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>256-bit SSL encryption</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>PCI DSS compliant</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>Instant access after payment</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-2">What's Included</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>✓ Lifetime access to course materials</li>
                <li>✓ Downloadable resources</li>
                <li>✓ Certificate of completion</li>
                <li>✓ Email support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
import React, { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const BillingSettings = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [subscriptionPlan, setSubscriptionPlan] = useState('monthly');
  const [autoRenew, setAutoRenew] = useState(true);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const billingHistory = [
    { id: 1, date: '27 Feb 2025', amount: '$79.99', status: 'Paid', invoice: 'INV-001' },
    { id: 2, date: '27 Jan 2025', amount: '$79.99', status: 'Paid', invoice: 'INV-002' },
    { id: 3, date: '27 Dec 2024', amount: '$79.99', status: 'Paid', invoice: 'INV-003' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Billing Settings</h1>

        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Current Plan</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">Professional Plan</p>
                <p className="text-gray-400 mt-1">
                  {subscriptionPlan === 'monthly' ? '$79.99/month' : '$799.99/year'}
                </p>
                <p className="text-green-500 flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {autoRenew ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 mr-3">
                  Cancel Plan
                </button>
                <button className="w-full md:w-auto mt-2 md:mt-0 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Options */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Subscription Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  subscriptionPlan === 'monthly' 
                    ? 'border-teal-500 bg-gray-700' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                onClick={() => setSubscriptionPlan('monthly')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">Monthly Plan</h3>
                    <p className="text-gray-400 text-sm mt-1">$79.99 billed monthly</p>
                  </div>
                  {subscriptionPlan === 'monthly' && (
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                  )}
                </div>
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  subscriptionPlan === 'annual' 
                    ? 'border-teal-500 bg-gray-700' 
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                onClick={() => setSubscriptionPlan('annual')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">Annual Plan</h3>
                    <p className="text-gray-400 text-sm mt-1">$799.99 billed annually (save 16%)</p>
                  </div>
                  {subscriptionPlan === 'annual' && (
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={() => setAutoRenew(!autoRenew)}
                className="h-4 w-4 bg-gray-600 rounded"
              />
              <span className="ml-4 text-gray-300">Enable auto-renewal</span>
            </div>

            <button className="mt-6 w-full md:w-auto px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
              Save Subscription Settings
            </button>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Payment Method</h2>
            
            <div className="flex space-x-4 mb-6">
              <div 
                className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${
                  paymentMethod === 'card' ? 'bg-gray-700' : 'bg-gray-900'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
              </div>
              <div 
                className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${
                  paymentMethod === 'paypal' ? 'bg-gray-700' : 'bg-gray-900'
                }`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <span className="font-bold text-blue-400">P</span>
                <span>PayPal</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-700 text-white rounded-md"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-700 text-white rounded-md"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-4 bg-gray-700 rounded-md">
                <p className="text-gray-300">
                  You'll be redirected to PayPal to complete your payment setup when you save these settings.
                </p>
              </div>
            )}

            <button className="mt-6 w-full md:w-auto px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
              Save Payment Method
            </button>
          </div>

          {/* Billing History */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Billing History</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left text-gray-400">Date</th>
                    <th className="p-2 text-left text-gray-400">Amount</th>
                    <th className="p-2 text-left text-gray-400">Status</th>
                    <th className="p-2 text-left text-gray-400">Invoice</th>
                    <th className="p-2 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.amount}</td>
                      <td className="p-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">{item.invoice}</td>
                      <td className="p-2">
                        <button className="text-teal-500 hover:text-teal-400 transition-colors">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Billing Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Company (Optional)</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="Street Address"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">State/Province</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="State/Province"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 text-white rounded-md"
                  placeholder="Postal Code"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Country</label>
                <select className="w-full p-2 bg-gray-700 text-white rounded-md">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
            
            <button className="mt-6 w-full md:w-auto px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
              Save Billing Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
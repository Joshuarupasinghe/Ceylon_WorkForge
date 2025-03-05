import React, { useState } from 'react';

const SuperAdminBilling = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  const billingHistory = [
    { id: 1, user: 'John Doe', date: '27 Feb 2025', amount: '$79.99', status: 'Paid', invoice: 'INV-001' },
    { id: 2, user: 'Jane Smith', date: '27 Jan 2025', amount: '$99.99', status: 'Pending', invoice: 'INV-002' },
    { id: 3, user: 'Mike Johnson', date: '27 Dec 2024', amount: '$49.99', status: 'Failed', invoice: 'INV-003' },
    { id: 4, user: 'Sarah Lee', date: '15 Mar 2025', amount: '$59.99', status: 'Paid', invoice: 'INV-004' },
    { id: 5, user: 'Robert Brown', date: '10 Feb 2025', amount: '$89.99', status: 'Pending', invoice: 'INV-005' },
    { id: 6, user: 'Emily White', date: '20 Jan 2025', amount: '$109.99', status: 'Failed', invoice: 'INV-006' },
    { id: 7, user: 'David Green', date: '5 Feb 2025', amount: '$39.99', status: 'Paid', invoice: 'INV-007' },
    { id: 8, user: 'Lucy Gray', date: '28 Jan 2025', amount: '$79.99', status: 'Pending', invoice: 'INV-008' },
    { id: 9, user: 'James Clark', date: '22 Dec 2024', amount: '$99.99', status: 'Failed', invoice: 'INV-009' },
    { id: 10, user: 'Sophia Turner', date: '14 Mar 2025', amount: '$69.99', status: 'Paid', invoice: 'INV-010' },
  ];

  const userActions = [
    { id: 1, user: 'Jack Hard', rating: 4.6 },
    { id: 2, user: 'Jack Hard', rating: 4.6 },
    { id: 3, user: 'Jack Hard', rating: 4.6 },
    { id: 4, user: 'Jack Hard', rating: 4.6 },
    { id: 5, user: 'Jack Hard', rating: 4.6 },
  ];

  // Function to simulate invoice download
  const downloadInvoice = (invoiceId) => {
    const invoiceUrl = `/invoices/${invoiceId}.pdf`; // You can replace this with the actual path or URL
    const link = document.createElement('a');
    link.href = invoiceUrl;
    link.download = `${invoiceId}.pdf`; // Sets the filename to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Super Admin Billing</h1>

        <div className="space-y-6">
          {/* Auto-Renewal Settings */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Billing Settings</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={() => setAutoRenew(!autoRenew)}
                className="h-4 w-4 bg-gray-600 rounded"
              />
              <span className="ml-4 text-gray-300">Enable auto-renewal for all users</span>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Billing Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left text-gray-400">User</th>
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
                      <td className="p-2">{item.user}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.amount}</td>
                      <td className={`p-2 font-semibold ${
                        item.status === 'Paid' ? 'text-green-400' : item.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {item.status}
                      </td>
                      <td className="p-2">{item.invoice}</td>
                      <td className="p-2">
                        <button
                          onClick={() => downloadInvoice(item.invoice)}
                          className="text-teal-500 hover:text-teal-400 transition-colors"
                        >
                          Download Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Actions */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">User Actions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left text-gray-400">User</th>
                    <th className="p-2 text-left text-gray-400">Rating</th>
                    <th className="p-2 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userActions.map((action) => (
                    <tr key={action.id} className="border-b border-gray-700">
                      <td className="p-2">{action.user}</td>
                      <td className="p-2">{action.rating}</td>
                      <td className="p-2">
                        <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-400 transition-colors">
                          Promote User
                        </button>
                        <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition-colors">
                          Demote User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuperAdminBilling;

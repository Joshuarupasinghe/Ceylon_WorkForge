import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { CreditCard } from "lucide-react";

export function Payment() {
  const [paymentMethods] = useState([
    { id: 1, last4: "4242", brand: "Visa", expiry: "12/25" },
    { id: 2, last4: "3579", brand: "Mastercard", expiry: "08/24" }
  ]);

  const [paymentHistory] = useState([
    { id: 1, date: "2025-03-15", amount: "$450", project: "Website Redesign" },
    { id: 2, date: "2025-02-28", amount: "$800", project: "Mobile App Development" }
  ]);

  return (
    <div className="space-y-6">
      {/* Payment Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{method.brand} ****{method.last4}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expires {method.expiry}</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700 text-sm">
                  Remove
                </button>
              </div>
            ))}
            <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Add New Payment Method
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{payment.amount}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{payment.project}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{payment.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
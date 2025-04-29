import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { useState } from 'react';

export function Schedule() {
  const [upcomingEvents] = useState([
    { id: 1, title: "Client Meeting", date: "Mar 15, 2025", time: "10:00 AM", client: "ABC Corp" },
    // ... other events
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm">Client: {event.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{event.date}</p>
                  <p className="text-sm">{event.time}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Reschedule
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            + Add New Event
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "../../components/ui/card";

export function DashboardSummary() {
  const summaryItems = [
    { title: "Active Projects", value: "5", change: "+2", up: true },
    { title: "Pending Tasks", value: "12", change: "-3", up: false },
    { title: "Total Budget", value: "$15,000", change: "+$2,500", up: true },
    { title: "Time Tracked", value: "87 hrs", change: "+12 hrs", up: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</p>
              </div>
              <div className={`text-sm ${item.up ? "text-green-500" : "text-red-500"}`}>
                {item.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
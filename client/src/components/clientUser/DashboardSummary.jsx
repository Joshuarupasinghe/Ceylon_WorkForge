import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import api from "../../services/api";

export function DashboardSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get('/api/services/summary')
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error('Failed to load dashboard summary:', err);
      });
  }, []);

  if (!summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* placeholder loading cards */}
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2" />
              <div className="h-8 bg-gray-300 rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const items = [
    {
      title: 'Active Projects',
      value: summary.activeProjects,
      change: '' /* you can compute a delta if you like */,
      up: true
    },
    {
      title: 'Pending Tasks',
      value: summary.pendingTasks,
      change: '',
      up: false
    },
    {
      title: 'Total Budget',
      value: `Rs.${summary.totalBudget.toLocaleString()}`,
      change: '',
      up: true
    },
    {
      title: 'Time Tracked',
      value: `${summary.timeTracked} hrs`,
      change: '',
      up: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</p>
              </div>
              <div className={`text-sm ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                {item.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

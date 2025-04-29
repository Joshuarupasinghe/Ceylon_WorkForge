import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { useState } from 'react';


export function Freelancers({ searchQuery }) {
  const [freelancers] = useState([
    {
      id: 1,
      name: "John Doe",
      skill: "Web Developer",
      rating: 4.9,
      hourlyRate: "$45",
      projectsCompleted: 24,
      availability: "Available",
    },
    // ... other freelancers
  ]);

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailabilityColor = (availability) => 
    availability === "Available" 
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Freelancers</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredFreelancers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id}>
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{freelancer.name}</h3>
                      <p className="text-sm">{freelancer.skill}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(freelancer.availability)}`}>
                      {freelancer.availability}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      {getRatingStars(freelancer.rating)}
                    </div>
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span>{freelancer.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects Completed:</span>
                      <span>{freelancer.projectsCompleted}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    Contact
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No freelancers match your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import React, { useState } from "react";

/**
 * Dummy data with 9 main categories.
 * Each category has:
 *  - name
 *  - subcategories (array of strings)
 *  - freelancers (array of objects)
 */
const categoriesData = [
  {
    name: "IT Services",
    subcategories: ["Software Development", "Network Administration", "IT Support"],
    freelancers: [
      {
        id: 1,
        name: "John Smith",
        location: "New York, USA",
        rating: 5,
        subcategory: "Software Development",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+1",
      },
      {
        id: 2,
        name: "Jane Doe",
        location: "London, UK",
        rating: 4,
        subcategory: "Network Administration",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+2",
      },
      {
        id: 3,
        name: "Alice Johnson",
        location: "Berlin, Germany",
        rating: 5,
        subcategory: "IT Support",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+3",
      },
      {
        id: 4,
        name: "Bob Brown",
        location: "Paris, France",
        rating: 5,
        subcategory: "Software Development",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+4",
      },
      {
        id: 5,
        name: "Carlos Garcia",
        location: "Madrid, Spain",
        rating: 4,
        subcategory: "Network Administration",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+5",
      },
      {
        id: 6,
        name: "Diana Wilson",
        location: "Toronto, Canada",
        rating: 5,
        subcategory: "IT Support",
        image: "https://via.placeholder.com/300?text=IT+Freelancer+6",
      },
    ],
  },
  {
    name: "Construction",
    subcategories: ["Residential", "Commercial", "Renovation"],
    freelancers: [
      {
        id: 1,
        name: "Tom Jackson",
        location: "Dallas, USA",
        rating: 5,
        subcategory: "Residential",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+1",
      },
      {
        id: 2,
        name: "Emily Green",
        location: "Vancouver, Canada",
        rating: 4,
        subcategory: "Commercial",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+2",
      },
      {
        id: 3,
        name: "Michael Lee",
        location: "Sydney, Australia",
        rating: 5,
        subcategory: "Renovation",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+3",
      },
      {
        id: 4,
        name: "Sara Mills",
        location: "Melbourne, Australia",
        rating: 5,
        subcategory: "Residential",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+4",
      },
      {
        id: 5,
        name: "Richard Holmes",
        location: "Dublin, Ireland",
        rating: 4,
        subcategory: "Commercial",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+5",
      },
      {
        id: 6,
        name: "Paula Jenkins",
        location: "Auckland, New Zealand",
        rating: 5,
        subcategory: "Renovation",
        image: "https://via.placeholder.com/300?text=Construction+Freelancer+6",
      },
    ],
  },
  {
    name: "Communication",
    subcategories: ["PR", "Copywriting", "Transcription"],
    freelancers: [
      {
        id: 1,
        name: "Greg Baker",
        location: "Boston, USA",
        rating: 5,
        subcategory: "PR",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+1",
      },
      {
        id: 2,
        name: "Helen Clark",
        location: "Manchester, UK",
        rating: 4,
        subcategory: "Copywriting",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+2",
      },
      {
        id: 3,
        name: "Ibrahim Khan",
        location: "Dubai, UAE",
        rating: 5,
        subcategory: "Transcription",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+3",
      },
      {
        id: 4,
        name: "Jenny Lam",
        location: "Hong Kong",
        rating: 4,
        subcategory: "PR",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+4",
      },
      {
        id: 5,
        name: "Kevin Martin",
        location: "Cape Town, South Africa",
        rating: 5,
        subcategory: "Copywriting",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+5",
      },
      {
        id: 6,
        name: "Lucy Nguyen",
        location: "Hanoi, Vietnam",
        rating: 4,
        subcategory: "Transcription",
        image: "https://via.placeholder.com/300?text=Comm+Freelancer+6",
      },
    ],
  },
  {
    name: "Audio & Music",
    subcategories: ["Music Production", "Voice Over", "Audio Editing"],
    freelancers: [
      {
        id: 1,
        name: "Adam Jones",
        location: "Los Angeles, USA",
        rating: 5,
        subcategory: "Music Production",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+1",
      },
      {
        id: 2,
        name: "Bella Ross",
        location: "Nashville, USA",
        rating: 5,
        subcategory: "Voice Over",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+2",
      },
      {
        id: 3,
        name: "Chris Evans",
        location: "London, UK",
        rating: 4,
        subcategory: "Audio Editing",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+3",
      },
      {
        id: 4,
        name: "Daisy Brown",
        location: "Berlin, Germany",
        rating: 4,
        subcategory: "Music Production",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+4",
      },
      {
        id: 5,
        name: "Eric Smith",
        location: "Toronto, Canada",
        rating: 5,
        subcategory: "Voice Over",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+5",
      },
      {
        id: 6,
        name: "Fiona Clarke",
        location: "Melbourne, Australia",
        rating: 5,
        subcategory: "Audio Editing",
        image: "https://via.placeholder.com/300?text=Audio+Freelancer+6",
      },
    ],
  },
  {
    name: "Consulting",
    subcategories: ["Business Strategy", "Finance", "Legal"],
    freelancers: [
      {
        id: 1,
        name: "George White",
        location: "San Francisco, USA",
        rating: 5,
        subcategory: "Business Strategy",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+1",
      },
      {
        id: 2,
        name: "Hannah Black",
        location: "Chicago, USA",
        rating: 4,
        subcategory: "Finance",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+2",
      },
      {
        id: 3,
        name: "Ian Brown",
        location: "Seattle, USA",
        rating: 5,
        subcategory: "Legal",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+3",
      },
      {
        id: 4,
        name: "Jenny Smith",
        location: "Glasgow, UK",
        rating: 4,
        subcategory: "Business Strategy",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+4",
      },
      {
        id: 5,
        name: "Kyle Adams",
        location: "Dublin, Ireland",
        rating: 5,
        subcategory: "Finance",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+5",
      },
      {
        id: 6,
        name: "Laura Davis",
        location: "Rome, Italy",
        rating: 5,
        subcategory: "Legal",
        image: "https://via.placeholder.com/300?text=Consulting+Freelancer+6",
      },
    ],
  },
  {
    name: "Marketing",
    subcategories: ["Digital Marketing", "SEO", "Social Media"],
    freelancers: [
      {
        id: 1,
        name: "Mike Green",
        location: "Houston, USA",
        rating: 5,
        subcategory: "Digital Marketing",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+1",
      },
      {
        id: 2,
        name: "Nina Holmes",
        location: "Atlanta, USA",
        rating: 4,
        subcategory: "SEO",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+2",
      },
      {
        id: 3,
        name: "Oscar Perez",
        location: "Barcelona, Spain",
        rating: 5,
        subcategory: "Social Media",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+3",
      },
      {
        id: 4,
        name: "Paula King",
        location: "Dublin, Ireland",
        rating: 4,
        subcategory: "Digital Marketing",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+4",
      },
      {
        id: 5,
        name: "Rita Liu",
        location: "Singapore",
        rating: 5,
        subcategory: "SEO",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+5",
      },
      {
        id: 6,
        name: "Sam Taylor",
        location: "Sydney, Australia",
        rating: 5,
        subcategory: "Social Media",
        image: "https://via.placeholder.com/300?text=Marketing+Freelancer+6",
      },
    ],
  },
  {
    name: "Event Organizing",
    subcategories: ["Weddings", "Corporate", "Parties"],
    freelancers: [
      {
        id: 1,
        name: "Tina Rogers",
        location: "Miami, USA",
        rating: 5,
        subcategory: "Weddings",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+1",
      },
      {
        id: 2,
        name: "Uma Patel",
        location: "Toronto, Canada",
        rating: 4,
        subcategory: "Corporate",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+2",
      },
      {
        id: 3,
        name: "Victor Brown",
        location: "London, UK",
        rating: 5,
        subcategory: "Parties",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+3",
      },
      {
        id: 4,
        name: "Wendy Harris",
        location: "Auckland, New Zealand",
        rating: 5,
        subcategory: "Weddings",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+4",
      },
      {
        id: 5,
        name: "Xavier Young",
        location: "Vancouver, Canada",
        rating: 4,
        subcategory: "Corporate",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+5",
      },
      {
        id: 6,
        name: "Yvonne Lin",
        location: "Hong Kong",
        rating: 5,
        subcategory: "Parties",
        image: "https://via.placeholder.com/300?text=Event+Freelancer+6",
      },
    ],
  },
  {
    name: "Design",
    subcategories: ["Graphic Design", "UI/UX", "Illustration"],
    freelancers: [
      {
        id: 1,
        name: "Zara Brown",
        location: "Los Angeles, USA",
        rating: 5,
        subcategory: "Graphic Design",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+1",
      },
      {
        id: 2,
        name: "Alex Johnson",
        location: "San Diego, USA",
        rating: 4,
        subcategory: "UI/UX",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+2",
      },
      {
        id: 3,
        name: "Beatrice Kim",
        location: "Seoul, South Korea",
        rating: 5,
        subcategory: "Illustration",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+3",
      },
      {
        id: 4,
        name: "Calvin West",
        location: "Austin, USA",
        rating: 5,
        subcategory: "Graphic Design",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+4",
      },
      {
        id: 5,
        name: "Dana East",
        location: "Tokyo, Japan",
        rating: 4,
        subcategory: "UI/UX",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+5",
      },
      {
        id: 6,
        name: "Elena Rossi",
        location: "Milan, Italy",
        rating: 5,
        subcategory: "Illustration",
        image: "https://via.placeholder.com/300?text=Design+Freelancer+6",
      },
    ],
  },
  {
    name: "Photography & Video",
    subcategories: ["Photography", "Videography", "Editing"],
    freelancers: [
      {
        id: 1,
        name: "Frank Hall",
        location: "New York, USA",
        rating: 5,
        subcategory: "Photography",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+1",
      },
      {
        id: 2,
        name: "Grace Kelly",
        location: "London, UK",
        rating: 4,
        subcategory: "Videography",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+2",
      },
      {
        id: 3,
        name: "Hiro Tanaka",
        location: "Osaka, Japan",
        rating: 5,
        subcategory: "Editing",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+3",
      },
      {
        id: 4,
        name: "Iris Choi",
        location: "Seoul, South Korea",
        rating: 4,
        subcategory: "Photography",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+4",
      },
      {
        id: 5,
        name: "James Nguyen",
        location: "Hanoi, Vietnam",
        rating: 5,
        subcategory: "Videography",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+5",
      },
      {
        id: 6,
        name: "Karen Wong",
        location: "Singapore",
        rating: 5,
        subcategory: "Editing",
        image: "https://via.placeholder.com/300?text=Photo+Freelancer+6",
      },
    ],
  },
];

const FreelancePage = () => {
  // Keep track of the selected category & subcategory
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Find the currently selected category object
  const currentCategory = categoriesData.find((cat) => cat.name === selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset subcategory on category change
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  // Filter freelancers by selected subcategory (if any)
  const filteredFreelancers = currentCategory.freelancers.filter((freelancer) => {
    if (!selectedSubcategory) return true; // No subcategory selected, show all
    return freelancer.subcategory === selectedSubcategory;
  });

  return (
    <div className="p-4 pt-25">
      {/* Category Selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Category:</label>
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categoriesData.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Subcategory:</label>
        <select
          className="border p-2 rounded"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
        >
          <option value="">All Subcategories</option>
          {currentCategory.subcategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div key={freelancer.id} className="border rounded p-4 shadow-sm">
            <img
              src={freelancer.image}
              alt={freelancer.name}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="font-bold text-lg mb-1">{freelancer.name}</h3>
            <p className="text-gray-600">{freelancer.location}</p>
            <p className="text-yellow-500">Rating: {freelancer.rating} ★</p>
            <p className="mt-1 text-sm text-gray-500">
              Subcategory: {freelancer.subcategory}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancePage;

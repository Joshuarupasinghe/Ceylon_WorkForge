import { useState } from "react";
import { Building2, Laptop2, Phone, Music, Truck, Brain, PenLine, GraduationCap, TrendingUp, Paintbrush, Camera, PartyPopper, Wrench, FileText, UserRound, MapPin } from "lucide-react";

const allFreelancers = [
    // Construction
    { name: "Dulanjan Perera", location: "Piliyandala, Colombo", category: "Construction", skills: ["tools", "brush", "pen", "document"] },
    { name: "Amila Fernando", location: "Maskeliya, Nuwara Eliya", category: "Construction", skills: ["tools", "brush", "pen"] },
    { name: "Ishara Gunasekara", location: "Koswatta, Colombo", category: "Construction", skills: ["tools", "brush", "pen", "document"] },
  
    // IT service
    { name: "Tharindu Jayasinghe", location: "Colombo, Colombo", category: "IT service", skills: ["tools", "document"] },
    { name: "Nipun Wickramasinghe", location: "Nugegoda, Colombo", category: "IT service", skills: ["tools", "pen"] },
    { name: "Sasindu Dissanayake", location: "Kandy, Central", category: "IT service", skills: ["document", "brush"] },
  
    // Communication
    { name: "Chathurika Rajapaksha", location: "Malabe, Colombo", category: "Communication", skills: ["tools", "document"] },
    { name: "Dinesh Weerakkody", location: "Galle, Southern", category: "Communication", skills: ["pen"] },
    { name: "Pasan Abeywickrama", location: "Kurunegala, North Western", category: "Communication", skills: ["tools", "brush"] },
  
    // Audio and music
    { name: "Isuru Samarasekara", location: "Kandy, Central", category: "Audio and music", skills: ["brush"] },
    { name: "Dinithi Ranathunga", location: "Negombo, Gampaha", category: "Audio and music", skills: ["pen", "document"] },
    { name: "Ravindu Senanayake", location: "Colombo, Colombo", category: "Audio and music", skills: ["tools", "brush"] },
  
    // Transportation
    { name: "Nuwan Priyankara", location: "Negombo, Gampaha", category: "Transportation", skills: ["tools"] },
    { name: "Sajith Bandara", location: "Galle, Southern", category: "Transportation", skills: ["brush"] },
    { name: "Kasun Peris", location: "Pettah, Colombo", category: "Transportation", skills: ["tools", "document"] },
  
    // Consulting
    { name: "Samadhi Madushani", location: "Colombo, Colombo", category: "Consulting", skills: ["document"] },
    { name: "Ashan Perera", location: "Matara, Southern", category: "Consulting", skills: ["pen"] },
    { name: "Hiruni Jayasundara", location: "Kandy, Central", category: "Consulting", skills: ["tools", "brush"] },
  
    // Article writing
    { name: "Dinuka Senarath", location: "Matara, Southern", category: "Article writing", skills: ["pen"] },
    { name: "Thilini Samarasinghe", location: "Colombo, Colombo", category: "Article writing", skills: ["document", "brush"] },
    { name: "Mihiran Ranasinghe", location: "Galle, Southern", category: "Article writing", skills: ["pen", "tools"] },
  
    // Teaching
    { name: "Yasitha Wijesekara", location: "Galle, Southern", category: "Teaching", skills: ["document"] },
    { name: "Chamathka Alwis", location: "Colombo, Colombo", category: "Teaching", skills: ["pen", "tools"] },
    { name: "Chathuranga Mendis", location: "Kandy, Central", category: "Teaching", skills: ["brush", "document"] },
  
    // Marketing
    { name: "Sanjula Madushanka", location: "Kandy, Central", category: "Marketing", skills: ["tools", "brush"] },
    { name: "Shanika Senanayake", location: "Nugegoda, Colombo", category: "Marketing", skills: ["document", "pen"] },
    { name: "Pasindu Samarathunga", location: "Colombo, Colombo", category: "Marketing", skills: ["tools", "brush"] },
  
    // Design
    { name: "Shehan De Silva", location: "Nugegoda, Colombo", category: "Design", skills: ["brush"] },
    { name: "Sachini Rajapakse", location: "Matara, Southern", category: "Design", skills: ["pen", "document"] },
    { name: "Kalindu Priyadarshana", location: "Kandy, Central", category: "Design", skills: ["tools", "brush"] },
  
    // Photography
    { name: "Nadeesha Kumari", location: "Dehiwala, Colombo", category: "Photography", skills: ["document"] },
    { name: "Ravindu Udara", location: "Galle, Southern", category: "Photography", skills: ["tools", "pen"] },
    { name: "Chinthaka Weerarathne", location: "Colombo, Colombo", category: "Photography", skills: ["brush", "document"] },
  
    // Event Organizing
    { name: "Kasuni Wickramasinghe", location: "Colombo, Colombo", category: "Event Organizing", skills: ["tools"] },
    { name: "Dilshan Pathirana", location: "Kandy, Central", category: "Event Organizing", skills: ["pen", "document"] },
    { name: "Heshan Premathilaka", location: "Galle, Southern", category: "Event Organizing", skills: ["tools", "brush"] }
  ];

const skillIcons = {
  tools: <Wrench className="w-5 h-5" />, 
  brush: <Paintbrush className="w-5 h-5" />, 
  pen: <PenLine className="w-5 h-5" />, 
  document: <FileText className="w-5 h-5" /> 
};

const categoryIcons = {
  Construction: <Building2 className="w-5 h-5" />, 
  "IT service": <Laptop2 className="w-5 h-5" />, 
  Communication: <Phone className="w-5 h-5" />, 
  "Audio and music": <Music className="w-5 h-5" />, 
  Transportation: <Truck className="w-5 h-5" />, 
  Consulting: <Brain className="w-5 h-5" />, 
  "Article writing": <PenLine className="w-5 h-5" />, 
  Teaching: <GraduationCap className="w-5 h-5" />, 
  Marketing: <TrendingUp className="w-5 h-5" />, 
  Design: <Paintbrush className="w-5 h-5" />, 
  Photography: <Camera className="w-5 h-5" />, 
  "Event Organizing": <PartyPopper className="w-5 h-5" />
};

const FreelancePage = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  const categories = [
    "All",
    "Construction",
    "IT service",
    "Communication",
    "Audio and music",
    "Transportation",
    "Consulting",
    "Article writing",
    "Teaching",
    "Marketing",
    "Design",
    "Photography",
    "Event Organizing"
  ];

  const locations = ["All", ...Array.from(new Set(allFreelancers.map(f => f.location)))];

  const filteredFreelancers = allFreelancers.filter(f => {
    const categoryMatch = filterCategory === "All" || f.category === filterCategory;
    const locationMatch = filterLocation === "All" || f.location === filterLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Freelancers</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Category Filter */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
          >
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Freelancer Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFreelancers.map((freelancer, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <div className="bg-white p-3 rounded-full shadow-md">
                <UserRound className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{freelancer.name}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {freelancer.location}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="bg-yellow-400 p-2 rounded-full">
                  {categoryIcons[freelancer.category] || <Building2 className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {freelancer.category}
                </span>
              </div>

              <div className="flex gap-2 mt-2 text-gray-700">
                {freelancer.skills.map((skill, i) => (
                  <span key={i}>{skillIcons[skill]}</span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
export default FreelancePage;

import React from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const blogCategories = [
    { 
      name: "IT Services", 
      jobs: 145, 
      image: "/public/imges/IT services.png",
      description: "IT Services encompass a wide range of solutions including software development, network security, and cloud computing. Did you hear? The latest freelance AI tool is shaking up the industry!"
    },
    { 
      name: "Construction", 
      jobs: 64, 
      image: "/public/imges/Construction.png",
      description: "Freelance construction services cover architectural planning, structural engineering, and on-site project management. Rumor has it that a top freelancer just landed a million-dollar contract!"
    },
    { 
      name: "Communication", 
      jobs: 112, 
      image: "/public/imges/commu.webp",
      description: "Effective communication is essential in every industry. Some freelancers are making six figures just by crafting viral tweets! Can you believe it?"
    },
    { 
      name: "Audio & Music", 
      jobs: 78, 
      image: "/public/imges/Audio&music.png",
      description: "From music production to sound engineering, freelance professionals in this category create audio content for media, advertising, and entertainment industries. One freelancer’s beat just got picked up by a major record label!"
    },
    { 
      name: "Transportation", 
      jobs: 89, 
      image: "/public/imges/Transportation.png",
      description: "Transportation freelancers specialize in logistics, vehicle dispatching, and supply chain management. A freelancer recently saved a logistics company thousands with an optimized route plan!"
    },
    { 
      name: "Consulting", 
      jobs: 93, 
      image: "/public/imges/Consulting.png",
      description: "Freelance consultants provide expert advice in fields such as finance, business strategy, and operations management. Word on the street is that a consultant helped turn a failing startup into a multi-million-dollar company!"
    },
    { 
      name: "Article Writing", 
      jobs: 127, 
      image: "/public/imges/Article-Rewriter-.webp",
      description: "Writers craft compelling articles, blog posts, and web content. Some freelance bloggers are making more than traditional journalists! How’s that for a career change?"
    },
    { 
      name: "Teaching", 
      jobs: 86, 
      image: "/public/imges/teaching.png",
      description: "Freelance educators offer tutoring, online courses, and academic consulting. Online teachers are now becoming influencers with thousands of students worldwide!"
    },
    { 
      name: "Marketing", 
      jobs: 155, 
      image: "/public/imges/Marketing-Digital.png",
      description: "Digital marketers, SEO experts, and social media managers provide freelance services to help brands expand their online presence. One freelancer’s viral campaign just took a small brand global!"
    },
    { 
      name: "Design", 
      jobs: 168, 
      image: "/public/imges/Design.jpg",
      description: "Graphic designers, UI/UX specialists, and branding experts create visually stunning content. A freelance designer’s logo recently got sold for $50,000!"
    },
    { 
      name: "Photography & Video", 
      jobs: 93, 
      image: "/public/imges/Photography & Video.jpeg",
      description: "Freelancers in photography and videography capture high-quality images and videos. Did you know a freelancer’s short film just made it to an international festival?"
    },
    { 
      name: "Event Organizing", 
      jobs: 58, 
      image: "/public/imges/Event Organizing.jpg",
      description: "Event planners, wedding coordinators, and corporate event organizers offer freelance services to create memorable experiences. Insiders say a freelance planner recently organized a celebrity wedding!"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 pt-30">
      <h1 className="text-4xl font-bold text-teal-500 text-center mb-8"> Services Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
              <p className="text-gray-600 mt-2">{category.jobs} jobs available</p>
              <p className="text-gray-500 text-sm mt-2">{category.description}</p>
              <Link to={`/blog/${category.name.toLowerCase().replace(/ /g, "-")}`} className="text-teal-500 hover:text-teal-700 mt-4 inline-block font-medium">
                Explore →
              </Link>
            </div>
          </div>
        ))}
        
      </div>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 pt-16">
  <div className="md:w-1/2 p-8 flex flex-col justify-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Programming & Tech</h2>
    <p className="text-gray-600">What is a Penetration Test, and Does Your Website Need One?</p>
    <p className="text-gray-500 mt-2">
    Penetration testing could help you find and fix security flaws in your company’s website. Learn more about how pen testing works and find your tester today.?
    </p>

  </div>
  <div className="md:w-1/2">
    <img
      src="/public/imges/section.png"
      alt="Category Title"
      className="w-full h-64 object-cover"
    />
  </div>
</div>

    </div>
  );
};

export default BlogPage;

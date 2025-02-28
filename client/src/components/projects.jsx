import React, { useState } from 'react';

const FreelanceProjects = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Logo Design', client: 'John Doe', status: 'In Progress', submissions: [] },
    { id: 2, title: 'Website Development', client: 'Sara B', status: 'In Progress', submissions: [] },
    { id: 3, title: 'Social Media Marketing Campaign', client: 'Alex P', status: 'Finished', submissions: ['Campaign Report.pdf'] },
    { id: 4, title: 'SEO Optimization', client: 'Mike J', status: 'Pending', submissions: [] },
    { id: 5, title: 'Mobile App Design', client: 'Laura T', status: 'Delayed', submissions: [] }
  ]);

  const handleFileUpload = (projectId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, submissions: [...project.submissions, file.name], status: 'Finished' }
        : project
    ));
  };

  return (
    
    <div className="p-6 bg-gray-900 min-h-screen text-gray-300">
      <h2 className="text-2xl font-semibold mb-4">Freelance Projects</h2>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-400">Client: {project.client}</p>
            <p className="text-gray-300">Status: <span className={getStatusClass(project.status)}>{project.status}</span></p>
            
            {project.status === 'In Progress' && (
              <div className="mt-4">
                <label className="block text-sm mb-2">Submit Work:</label>
                <input type="file" onChange={(e) => handleFileUpload(project.id, e)} className="border p-2 rounded bg-gray-700" />
              </div>
            )}

            {project.submissions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Submitted Files:</h4>
                <ul className="list-disc pl-5 text-gray-400">
                  {project.submissions.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'text-green-400';
    case 'In Progress':
      return 'text-yellow-400';
    case 'Finished':
      return 'text-blue-400';
    case 'Pending':
      return 'text-gray-400';
    case 'Delayed':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

export default FreelanceProjects;

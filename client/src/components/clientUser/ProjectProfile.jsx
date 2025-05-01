import { MessageCircle, Paperclip, X, ArrowLeft, Download } from "lucide-react";

export function ProjectProfile({ job, onClose }) {
  const freelancers = [
    { id: 1, name: "John Doe", avatar: "JD", online: true },
    { id: 2, name: "Sarah Smith", avatar: "SS", online: false },
  ];

  const files = [
    { id: 1, name: "design-specs.pdf", size: "2.4 MB", url: "#" },
    { id: 2, name: "contract.docx", size: "1.2 MB", url: "#" },
  ];

  const handleDownload = (fileUrl, fileName) => {
    // Implement actual download logic
    console.log(`Downloading ${fileName} from ${fileUrl}`);
    // Temporary simulation
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startChat = (freelancerId) => {
    console.log(`Starting chat with freelancer ${freelancerId}`);
    // Implement actual chat logic
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-800 rounded-lg w-full max-w-4xl mx-auto relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="sticky top-0 right-0 ml-auto block p-4 text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>

          <div className="px-6 pb-6">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">{job.title}</h1>
            </div>

            {/* Project Meta - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* ... (keep existing status boxes) */}
            </div>

            {/* Description with Scroll */}
            <div className="bg-gray-700 p-6 rounded-lg mb-8 max-h-[300px] overflow-y-auto">
              <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Freelancers Section - Individual Chat */}
            <div className="bg-gray-700 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Team Members</h2>
              <div className="space-y-4">
                {freelancers.map(freelancer => (
                  <div key={freelancer.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <span className="text-teal-500">{freelancer.avatar}</span>
                        </div>
                        {freelancer.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                        )}
                      </div>
                      <span className="text-white">{freelancer.name}</span>
                    </div>
                    <button 
                      onClick={() => startChat(freelancer.id)}
                      className="p-2 text-teal-500 hover:bg-teal-500/10 rounded-lg transition-colors"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloadable Project Files */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Project Files</h2>
              <div className="space-y-3">
                {files.map(file => (
                  <div
                    key={file.id}
                    onClick={() => handleDownload(file.url, file.name)}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-900/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Paperclip size={18} className="text-gray-400" />
                      <span className="text-white">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">{file.size}</span>
                      <Download size={16} className="text-teal-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
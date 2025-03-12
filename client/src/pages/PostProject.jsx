import React, { useState } from 'react';

// Custom question mark icon component
const QuestionMarkIcon = () => (
  <div className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-teal-400 text-gray-900 text-xs font-bold">
    ?
  </div>
);

// Custom paperclip icon component
const PaperclipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
  </svg>
);



const FullDesktopView = () => {
  // Form state
  const [formData, setFormData] = useState({
    category: 'product-designer',
    subcategory: '',
    title: '',
    description: '',
    budgetType: '',
    currency: ''
  });
  
  // Files state
  const [files, setFiles] = useState([]);
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Step tracking for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  
  // Tooltips visibility state
  const [tooltips, setTooltips] = useState({
    category: false,
    subcategory: false,
    title: false,
    description: false,
    budgetType: false,
    currency: false
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Toggle tooltip visibility
  const toggleTooltip = (field) => {
    setTooltips(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Remove a file from the list
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subcategory) newErrors.subcategory = "Subcategory is required";
    if (!formData.title) newErrors.title = "Project title is required";
    if (formData.title && formData.title.length < 10) newErrors.title = "Title must be at least 10 characters";
    if (!formData.description) newErrors.description = "Project description is required";
    if (formData.description && formData.description.length < 50) newErrors.description = "Description must be at least 50 characters";
    if (!formData.budgetType) newErrors.budgetType = "Budget type is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  };

  // Get subcategory options based on selected category
  const getSubcategories = () => {
    const subcategories = {
      'product-designer': [
        { value: 'ui-design', label: 'UI Design' },
        { value: 'ux-design', label: 'UX Design' },
        { value: 'prototyping', label: 'Prototyping' },
        { value: 'user-research', label: 'User Research' }
      ],
      'web-developer': [
        { value: 'frontend', label: 'Frontend Development' },
        { value: 'backend', label: 'Backend Development' },
        { value: 'fullstack', label: 'Full Stack Development' },
        { value: 'cms', label: 'CMS Development' }
      ],
      'mobile-developer': [
        { value: 'ios', label: 'iOS Development' },
        { value: 'android', label: 'Android Development' },
        { value: 'react-native', label: 'React Native' },
        { value: 'flutter', label: 'Flutter' }
      ],
      'graphic-designer': [
        { value: 'logo-design', label: 'Logo Design' },
        { value: 'illustration', label: 'Illustration' },
        { value: 'brand-identity', label: 'Brand Identity' }
      ],
      'content-writer': [
        { value: 'blog-posts', label: 'Blog Posts' },
        { value: 'copywriting', label: 'Copywriting' },
        { value: 'technical-writing', label: 'Technical Writing' }
      ],
      'digital-marketer': [
        { value: 'seo', label: 'SEO' },
        { value: 'social-media', label: 'Social Media Marketing' },
        { value: 'ppc', label: 'PPC Advertising' }
      ]
    };
    
    return subcategories[formData.category] || [];
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
        
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow py-8 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto p-6 bg-gray-950 rounded-lg shadow-lg border border-gray-800 text-gray-100">
            <h1 className="text-center text-3xl font-bold text-teal-400 mb-8">Post a Project</h1>
            
            {/* Sri Lanka Savings Banner */}
            <div className="bg-gray-900 border-l-4 border-teal-500 p-4 mb-6 rounded-md">
              <h3 className="font-bold text-teal-400 mb-1">Sri Lanka Freelancer Savings</h3>
              <p className="text-sm text-gray-300">
                Enjoy up to 40% savings when hiring talented Sri Lankan freelancers compared to global rates. 
                Our Sri Lankan professionals offer excellent quality work at competitive prices.
              </p>
            </div>
            
            {submitSuccess && (
              <div className="bg-teal-900 border-l-4 border-teal-500 p-4 mb-6 rounded-md">
                <h3 className="font-bold text-teal-300 mb-1">Success!</h3>
                <p className="text-sm text-gray-300">
                  Your project has been successfully posted. You'll start receiving proposals soon!
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block font-semibold text-gray-300 text-sm">CATEGORY</label>
                  <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('category')}>
                    <QuestionMarkIcon />
                  </span>
                </div>
                {tooltips.category && (
                  <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                    Select the main category that best describes the type of work you need.
                  </div>
                )}
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full p-2 bg-gray-900 border ${errors.category ? 'border-red-500' : 'border-gray-800'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                >
                  <option value="product-designer">Product Designer</option>
                  <option value="web-developer">Web Developer</option>
                  <option value="mobile-developer">Mobile App Developer</option>
                  <option value="graphic-designer">Graphic Designer</option>
                  <option value="content-writer">Content Writer</option>
                  <option value="digital-marketer">Digital Marketer</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block font-semibold text-gray-300 text-sm">SUBCATEGORY</label>
                  <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('subcategory')}>
                    <QuestionMarkIcon />
                  </span>
                </div>
                {tooltips.subcategory && (
                  <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                    Choose a more specific area within your selected category.
                  </div>
                )}
                <select 
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className={`w-full p-2 bg-gray-900 border ${errors.subcategory ? 'border-red-500' : 'border-gray-800'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                >
                  <option value="">Select a subcategory</option>
                  {getSubcategories().map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.subcategory && <p className="text-red-500 text-xs mt-1">{errors.subcategory}</p>}
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block font-semibold text-gray-300 text-sm">Project Title</label>
                  <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('title')}>
                    <QuestionMarkIcon />
                  </span>
                </div>
                {tooltips.title && (
                  <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                    A clear, concise title will attract qualified freelancers. Be specific about what you need.
                  </div>
                )}
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 bg-gray-900 border ${errors.title ? 'border-red-500' : 'border-gray-800'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                  placeholder="Enter a descriptive title for your project"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Min. 10 characters</span>
                  <span className="text-xs text-gray-400">{formData.title.length} / 100</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="block font-semibold text-gray-300 text-sm">Project Description</label>
                  <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('description')}>
                    <QuestionMarkIcon />
                  </span>
                </div>
                {tooltips.description && (
                  <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                    Provide detailed information about your project requirements, goals, and expectations.
                  </div>
                )}
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-2 bg-gray-900 border-2 ${errors.description ? 'border-red-500' : 'border-teal-600'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                  rows="6"
                  placeholder="Describe your project requirements in detail..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">Min. 50 characters</span>
                  <span className="text-xs text-gray-400">{formData.description.length} / 5000</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block font-semibold text-gray-300 text-sm mb-2">Attachments</label>
                <div className="flex items-center mb-3">
                  <label className="flex items-center bg-gray-800 text-gray-200 px-4 py-2 rounded hover:bg-gray-700 transition duration-300 cursor-pointer">
                    <span className="mr-2"><PaperclipIcon /></span>
                    Attach Files
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </label>
                  <span className="text-xs text-gray-400 ml-3">Max 5 files, 10MB each</span>
                </div>
                
                {files.length > 0 && (
                  <div className="bg-gray-900 p-3 rounded border border-gray-800">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Attached Files ({files.length})</h4>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                          <span className="truncate max-w-xs">{file.name}</span>
                          <button 
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4 mb-6">
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <label className="block font-semibold text-gray-300 text-sm">BUDGET TYPE</label>
                    <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('budgetType')}>
                      <QuestionMarkIcon />
                    </span>
                  </div>
                  {tooltips.budgetType && (
                    <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                      Choose how you'd like to pay for this project.
                    </div>
                  )}
                  <select 
                    name="budgetType"
                    value={formData.budgetType}
                    onChange={handleChange}
                    className={`w-full p-2 bg-gray-900 border ${errors.budgetType ? 'border-red-500' : 'border-gray-800'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                  >
                    <option value="">Select budget type</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="milestone">Milestone Based</option>
                  </select>
                  {errors.budgetType && <p className="text-red-500 text-xs mt-1">{errors.budgetType}</p>}
                </div>
                
                <div className="w-1/2">
                  <div className="flex items-center mb-2">
                    <label className="block font-semibold text-gray-300 text-sm">CURRENCY</label>
                    <span className="ml-1 cursor-pointer" onClick={() => toggleTooltip('currency')}>
                      <QuestionMarkIcon />
                    </span>
                  </div>
                  {tooltips.currency && (
                    <div className="text-xs bg-gray-900 p-2 rounded mb-2 text-gray-300 border border-gray-800">
                      Select the currency you want to pay in.
                    </div>
                  )}
                  <select 
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className={`w-full p-2 bg-gray-900 border ${errors.currency ? 'border-red-500' : 'border-gray-800'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-100`}
                  >
                    <option value="">Select currency</option>
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="lkr">LKR (₨)</option>
                  </select>
                  {errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Your information is secure and encrypted</span>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex items-center ${isSubmitting ? 'bg-gray-600' : 'bg-teal-500 hover:bg-teal-600'} text-gray-900 font-semibold py-3 px-6 rounded transition duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
        </div>
  );
};

export default FullDesktopView;
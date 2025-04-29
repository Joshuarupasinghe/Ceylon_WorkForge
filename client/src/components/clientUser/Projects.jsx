import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { ChevronRight, Calendar, DollarSign, Tag, CheckCircle, X, Pencil, Trash2 } from "lucide-react";
import api from "../../services/api";
import { ProjectProfile } from "./ProjectProfile";

export function Projects({ searchQuery }) {
    // State for fetched jobs and categories
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcats, setSubcats] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);

    // State for the "Add Job" form
    const [showForm, setShowForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        category: '',
        subcategory: '',
        type: 'request'
    });

    // Form validation state
    const [formErrors, setFormErrors] = useState({});

    // Load existing client requests and categories on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const [jobsRes, catsRes] = await Promise.all([
                    api.get('/api/services/requests'),
                    api.get('/api/categories')
                ]);
                setJobs(jobsRes.data);
                setCategories(catsRes.data);
            } catch (err) {
                console.error("Error loading data:", err);
            }
        };
        loadData();
    }, []);

    // When the selected category changes, update subcategory list
    useEffect(() => {
        const cat = categories.find(c => c._id === newJob.category);
        setSubcats(cat?.subcategories || []);
        // If the currently chosen subcategory is no longer valid, clear it
        if (newJob.subcategory && !cat?.subcategories.map(s => s._id).includes(newJob.subcategory)) {
            setNewJob(j => ({ ...j, subcategory: '' }));
        }
    }, [newJob.category, categories]);

    // Filter jobs based on searchQuery
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper to map status to badge color
    const getStatusColor = status => {
        switch (status) {
            case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
            case "Planning": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
            case "On Hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
            case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    // Handle form field changes
    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewJob(j => ({ ...j, [name]: value }));

        // Clear error when field is filled
        if (value && formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Form validation
    const validateStep = (step) => {
        const errors = {};

        if (step === 1) {
            if (!newJob.title) errors.title = "Title is required";
            if (!newJob.category) errors.category = "Please select a category";
            if (!newJob.subcategory) errors.subcategory = "Please select a subcategory";
        }

        if (step === 2) {
            if (!newJob.budget) errors.budget = "Budget is required";
            if (!newJob.description) errors.description = "Description is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form step navigation
    const nextStep = () => {
        if (validateStep(1)) {
            setFormStep(2);
        }
    };

    const prevStep = () => {
        setFormStep(1);
    };

    const resetForm = () => {
        setFormStep(1);
        setShowForm(false);
        setFormErrors({});
        setEditingJobId(null);
        setNewJob({
            title: '',
            description: '',
            budget: '',
            deadline: '',
            category: '',
            subcategory: '',
            type: 'request'
        });
    };

    const handleEdit = (job) => {
        setShowForm(true);
        setEditingJobId(job._id);
        setNewJob({
            title: job.title,
            description: job.description,
            budget: job.budget,
            deadline: job.deadline ? job.deadline.split('T')[0] : '',
            category: job.category._id,
            subcategory: job.subcategory._id,
            type: job.type
        });
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/api/services/${jobId}`);
                const res = await api.get('/api/services/requests');
                setJobs(res.data);
            } catch (err) {
                console.error('Error deleting job:', err);
            }
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateStep(formStep)) return;

        try {
            const payload = {
                title: newJob.title,
                description: newJob.description,
                budget: Number(newJob.budget),
                deadline: newJob.deadline,
                category: newJob.category,
                subcategory: newJob.subcategory,
                type: newJob.type
            };

            if (editingJobId) {
                await api.put(`/api/services/${editingJobId}`, payload);
            } else {
                await api.post('/api/services', payload);
            }

            setShowSuccess(true);
            const res = await api.get('/api/services/requests');
            setJobs(res.data);

            setTimeout(() => {
                setShowSuccess(false);
                resetForm();
            }, 2000);
        } catch (err) {
            console.error('Error saving job:', err);
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Your Projects</CardTitle>
                <button
                    onClick={() => setShowForm(f => !f)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                >
                    {showForm ? 'Cancel' : '+ Add Job'}
                </button>
            </CardHeader>

            {showForm && (
                <div className="relative bg-gray-800 p-6 rounded-lg mx-4 mb-6 border border-gray-700">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
                    >
                        <X size={18} />
                    </button>

                    {showSuccess ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <CheckCircle size={48} className="text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white">Job Added Successfully!</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-white">
                                        {formStep === 1 ? 'Project Details' : 'Budget & Description'}
                                    </h3>
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full ${formStep >= 1 ? 'bg-teal-500' : 'bg-gray-600'}`}></div>
                                        <div className="w-6 h-1 bg-gray-600 mx-1"></div>
                                        <div className={`w-3 h-3 rounded-full ${formStep === 2 ? 'bg-teal-500' : 'bg-gray-600'}`}></div>
                                    </div>
                                </div>
                            </div>

                            {formStep === 1 ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Project Title
                                        </label>
                                        <div className="relative">
                                            <input
                                                name="title"
                                                value={newJob.title}
                                                onChange={handleInputChange}
                                                placeholder="Enter project title"
                                                required
                                                className={`w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border ${formErrors.title ? 'border-red-500' : 'border-gray-600'
                                                    }`}
                                            />
                                            {formErrors.title && (
                                                <p className="mt-1 text-sm text-red-400">{formErrors.title}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Category
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    value={newJob.category}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={`w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border ${formErrors.category ? 'border-red-500' : 'border-gray-600'
                                                        } appearance-none`}
                                                >
                                                    <option value="">Select Category</option>
                                                    {categories.map(c => (
                                                        <option key={c._id} value={c._id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <Tag size={16} className="text-gray-400" />
                                                </div>
                                                {formErrors.category && (
                                                    <p className="mt-1 text-sm text-red-400">{formErrors.category}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Subcategory
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="subcategory"
                                                    value={newJob.subcategory}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={`w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border ${formErrors.subcategory ? 'border-red-500' : 'border-gray-600'
                                                        } appearance-none`}
                                                >
                                                    <option value="">Select Subcategory</option>
                                                    {subcats.map(sc => (
                                                        <option key={sc._id} value={sc._id}>{sc.name}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <Tag size={16} className="text-gray-400" />
                                                </div>
                                                {formErrors.subcategory && (
                                                    <p className="mt-1 text-sm text-red-400">{formErrors.subcategory}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Deadline
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="deadline"
                                                value={newJob.deadline}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <Calendar size={16} className="text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition-all duration-200"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Budget
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign size={16} className="text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                name="budget"
                                                value={newJob.budget}
                                                onChange={handleInputChange}
                                                placeholder="Enter budget amount"
                                                required
                                                className={`w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-gray-100 border ${formErrors.budget ? 'border-red-500' : 'border-gray-600'
                                                    }`}
                                            />
                                            {formErrors.budget && (
                                                <p className="mt-1 text-sm text-red-400">{formErrors.budget}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Project Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={newJob.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe your project details, requirements, and goals..."
                                            required
                                            rows={4}
                                            className={`w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100 border ${formErrors.description ? 'border-red-500' : 'border-gray-600'
                                                }`}
                                        />
                                        {formErrors.description && (
                                            <p className="mt-1 text-sm text-red-400">{formErrors.description}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="text-gray-300 hover:text-white px-6 py-2 rounded-md transition-all duration-200"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-md transition-all duration-200"
                                        >
                                            Submit Job
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            )}

            <CardContent>
                {filteredJobs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-left bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="p-3">Project Name</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Deadline</th>
                                    <th className="p-3">Progress</th>
                                    <th className="p-3">Budget</th>
                                    <th className="p-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredJobs.map(job => (
                                    <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                                        <td className="p-3 font-medium">{job.title}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {job.deadline
                                                ? new Date(job.deadline).toLocaleDateString()
                                                : '—'}
                                        </td>
                                        <td className="p-3">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${job.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs mt-1">{job.progress}%</span>
                                        </td>
                                        <td className="p-3">{`Rs.${job.budget}`}</td>
                                        <td className="p-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(job)}
                                                    className="p-1 text-blue-500 hover:text-blue-700 rounded-md hover:bg-blue-100/20 transition-colors"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job._id)}
                                                    className="p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-100/20 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <ChevronRight
                                                    size={18}
                                                    onClick={() => setSelectedJob(job)}
                                                    className="text-blue-500 hover:text-blue-700 cursor-pointer ml-2"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No projects match your search.</p>
                    </div>
                )}
            </CardContent>
            {selectedJob && (
                <ProjectProfile
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </Card>
    );
}
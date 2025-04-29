import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { ChevronRight } from "lucide-react";
import api from "../../services/api";
import { useState, useEffect } from 'react';

export function Projects({ searchQuery }) {
    const [projects] = useState([
        { id: 1, name: "Website Redesign", status: "In Progress", deadline: "Mar 30, 2025", progress: 65, budget: "$4,500" },
        { id: 2, name: "Mobile App Development", status: "Planning", deadline: "Apr 15, 2025", progress: 20, budget: "$8,000" },
        { id: 3, name: "SEO Optimization", status: "On Hold", deadline: "Mar 25, 2025", progress: 40, budget: "$2,500" },
        { id: 4, name: "Brand Identity Design", status: "Completed", deadline: "Mar 10, 2025", progress: 100, budget: "$3,200" },
    ]);
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcats, setSubcats] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        category: '',
        subcategory: '',
        type: 'request'
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [jobsRes, catRes] = await Promise.all([
                    api.get('/api/services/requests'),
                    api.get('/api/categories')
                ]);
                setJobs(jobsRes.data);
                setCategories(catRes.data);
            } catch (error) {
                console.error("Error loading categories or services data:", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const cat = categories.find(c => c.name === newJob.category);
        setSubcats(cat?.subcategories || []);

        if (!cat?.subcategories.map(s => s.name).includes(newJob.subcategory)) {
            setNewJob(j => ({ ...j, subcategory: '' }));
        }
    }, [newJob.category, categories]);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
            case "Planning": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
            case "On Hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
            case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob(j => ({ ...j, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/api/services', newJob);
            // reload jobs
            const res = await api.get('/api/services/requests');
            setJobs(res.data);
            setShowForm(false);
            setNewJob({
                title: '', description: '', budget: '',
                deadline: '', category: '', subcategory: '',
                type: 'request'
            });
        } catch (err) {
            console.error('Error creating job:', err);
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Your Projects</CardTitle>
                <button
                    onClick={() => setShowForm(f => !f)}
                    className="text-teal-500 hover:underline text-sm"
                >
                    {showForm ? 'Cancel' : '+ Add Job'}
                </button>
            </CardHeader>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="title"
                            value={newJob.title}
                            onChange={handleInputChange}
                            placeholder="Job title"
                            required
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        />
                        <input
                            type="number"
                            name="budget"
                            value={newJob.budget}
                            onChange={handleInputChange}
                            placeholder="Budget"
                            required
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        />
                        <input
                            type="date"
                            name="deadline"
                            value={newJob.deadline}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        />
                        <select
                            name="category"
                            value={newJob.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <select
                            name="subcategory"
                            value={newJob.subcategory}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        >
                            <option value="">Select Subcategory</option>
                            {subcats.map(sc => (
                                <option key={sc._id} value={sc._id}>{sc.name}</option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        name="description"
                        value={newJob.description}
                        onChange={handleInputChange}
                        placeholder="Job description"
                        required
                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-100"
                        rows={3}
                    />
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md"
                    >
                        Submit Job
                    </button>
                </form>
            )}

            <CardContent>
                {filteredProjects.length > 0 ? (
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
                                {filteredProjects.map((project) => (
                                    <tr key={project._id || project.id}>
                                        <td className="p-3 font-medium">{project.title}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {project.deadline
                                                ? new Date(project.deadline).toLocaleDateString()
                                                : '—'}
                                        </td>
                                        <td className="p-3">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs mt-1">{project.progress}%</span>
                                        </td>
                                        <td className="p-3">{`$${project.budget}`}</td>
                                        <td className="p-3 text-right">
                                            <ChevronRight size={18} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
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
        </Card>
    );
}
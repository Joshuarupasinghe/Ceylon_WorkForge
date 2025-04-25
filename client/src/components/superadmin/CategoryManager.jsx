// src/components/CategoryManager.jsx
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const CategoryManager = () => {
    // state
    const [categories, setCategories] = useState([]);
    const [mainInput, setMainInput] = useState('');
    const [subsInput, setSubsInput] = useState('');
    const [editingIdx, setEditingIdx] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // fetch from API
    const fetchCategories = async () => {
        try {
            const res = await api.get('/api/categories');
            setCategories(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const resetForm = () => {
        setMainInput('');
        setSubsInput('');
        setEditingIdx(null);
        setImageFile(null);
        setPreviewUrl('');
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleAddOrEdit = async () => {
        const subs = subsInput
            .split(',')
            .map(s => s.trim())
            .filter(s => s);

        if (!mainInput.trim()) return;

        try {
            // const formData = new FormData();
            // formData.append('name', mainInput.trim());
            // formData.append('subcategories', JSON.stringify(subs));
            // if (imageFile) {
            //     formData.append('image', imageFile);
            // }

            // if (editingIdx === null) {
            //     // create
            //     await api.post('/api/categories', formData, {
            //         headers: { 'Content-Type': 'multipart/form-data' }
            //     });
            // } else {
            //     // update
            //     const id = categories[editingIdx]._id;
            //     await api.put(`/api/categories/${id}`, formData, {
            //         headers: { 'Content-Type': 'multipart/form-data' }
            //     });
            // }
            const formData = new FormData();
            formData.append('name', mainInput.trim());
            formData.append('subcategories', JSON.stringify(subs));
            if (imageFile) {
                formData.append('image', imageFile);
            }
            if (editingIdx === null) {
                // Create a new category
                await api.post('/api/categories', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Update an existing category
                const id = categories[editingIdx]._id;
                await api.put(`/api/categories/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchCategories();
            resetForm();
        } catch (err) {
            console.error('Save error:', err);
        }
    };

    const handleEditClick = (idx) => {
        const cat = categories[idx];
        setMainInput(cat.name);
        setSubsInput(cat.subcategories.join(', '));
        setEditingIdx(idx);
        setPreviewUrl(cat.image || '');
        setImageFile(null);
    };

    const handleDelete = async (idx) => {
        const cat = categories[idx];
        if (!window.confirm(`Delete "${cat.name}" and all its sub-categories?`)) return;
        try {
            await api.delete(`/api/categories/${cat._id}`);
            fetchCategories();
            resetForm();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div className="space-y-8 text-gray-100">
            {/* ➤ Form Card */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add / Edit Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        value={mainInput}
                        onChange={e => setMainInput(e.target.value)}
                        placeholder="Main category name"
                        className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-gray-100"
                    />
                    <input
                        type="text"
                        value={subsInput}
                        onChange={e => setSubsInput(e.target.value)}
                        placeholder="Sub-categories, comma-separated"
                        className="w-full bg-gray-700 border-gray-600 rounded-md px-4 py-2 text-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-300">Category Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="text-gray-100"
                    />
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="mt-3 w-32 h-32 object-cover rounded-md border"
                        />
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleAddOrEdit}
                        className="bg-teal-500 hover:bg-teal-600 px-5 py-2 rounded-md transition"
                    >
                        {editingIdx === null ? 'Add Category' : 'Save Changes'}
                    </button>
                    {editingIdx !== null && (
                        <button
                            onClick={resetForm}
                            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* ➤ Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categories.map((cat, idx) => (
                    <div
                        key={cat._id}
                        className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between"
                    >
                        {/* Header */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-semibold">{cat.name}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(idx)}
                                        className="p-2 hover:bg-gray-700 rounded-md transition"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-5 h-5 text-teal-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="p-2 hover:bg-red-700 rounded-md transition"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-400" />
                                    </button>
                                </div>
                            </div>

                            {cat.image && (
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="mb-4 w-full h-40 object-cover rounded-md"
                                />
                            )}

                            {/* Sub-category Badges */}
                            <div className="flex flex-wrap gap-2">
                                {cat.subcategories.map(sub => (
                                    <span
                                        key={sub}
                                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManager;

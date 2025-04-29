// src/pages/client/ClientProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { profileService } from '../../services/api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/card';
import {
  User as UserIcon,
  Mail as MailIcon,
  Briefcase,
  Calendar,
  Key,
  LogOut
} from 'lucide-react';

export default function ClientProfile() {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    profilePicture: null,
    previewUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load user data into form
  useEffect(() => {
    if (user) {
      setForm({
        firstName:  user.firstName,
        lastName:   user.lastName,
        email:      user.email,
        company:    user.company,
        previewUrl: user.profilePicture || '',
        profilePicture: null
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({
      ...f,
      profilePicture: file,
      previewUrl: URL.createObjectURL(file)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        firstName:     form.firstName,
        lastName:      form.lastName,
        email:         form.email,
        company:       form.company,
        profileImage:  form.profilePicture
      };
      const res = await profileService.createOrUpdateProfile(payload);
      const updated = res.data.user || res.data;
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <p className="p-6 text-center">Loading your profile…</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Your Settings</CardTitle>
          <div className="space-x-2">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-1 rounded-md ${
                activeTab === 'personal'
                  ? 'bg-teal-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`px-3 py-1 rounded-md ${
                activeTab === 'account'
                  ? 'bg-teal-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Account Settings
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'personal' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center">
                {form.previewUrl ? (
                  <img
                    src={form.previewUrl}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="flex items-center text-sm font-medium">
                    <UserIcon className="mr-1" /> First Name
                  </span>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="flex items-center text-sm font-medium">
                    <UserIcon className="mr-1" /> Last Name
                  </span>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                    required
                  />
                </label>
              </div>

              {/* Email & Company */}
              <label className="block">
                <span className="flex items-center text-sm font-medium">
                  <MailIcon className="mr-1" /> Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </label>
              <label className="block">
                <span className="flex items-center text-sm font-medium">
                  <Briefcase className="mr-1" /> Company
                </span>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  required
                />
              </label>

              {/* Submit */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                {message && <span className="text-sm">{message}</span>}
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Role & Member Since */}
              <p className="flex items-center">
                <Key className="mr-1" /> <strong>Role:</strong> {user.role}
              </p>
              <p className="flex items-center">
                <Calendar className="mr-1" />{' '}
                <strong>Member Since:</strong>{' '}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

              {/* Change Password (stub) */}
              <button
                onClick={() => alert('Change password flow goes here')}
                className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                <Key /> <span>Change Password</span>
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 px-4 py-2 rounded-md"
              >
                <LogOut /> <span>Log Out</span>
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

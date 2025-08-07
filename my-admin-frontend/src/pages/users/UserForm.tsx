import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import type { User } from '../../types';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // Add roles and other fields as needed
  });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchUser = async () => {
        try {
          const response = await api.get<User>(`/management/users/${id}`);
          setFormData({
            username: response.data.username,
            email: response.data.email,
            password: '', // Password should not be fetched
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isEditing) {
        await api.put(`/management/users/${id}`, formData);
      } else {
        await api.post('/management/users', formData);
      }
      navigate('/users');
    } catch (err) {
      setError('Failed to save user. Please check the data.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading form...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing? 'Edit User' : 'Create User'}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder={isEditing? 'Leave blank to keep current password' : ''}
              required={!isEditing}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/users')} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { avatarUrl } from '../../../constants/help'
import Horizontal from '../../../components/alignments/Horizontal';
import Modal from '../../../components/Modal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useGetAllAdmins } from '../../../utils/queries/adminQueries';
import { useUpdateAdmin } from '../../../utils/mutations/adminMutations';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const AdminProfile: React.FC = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const { username } = useParams();

  const { data: admins, isLoading } = useGetAllAdmins();
  const updateMutation = useUpdateAdmin();
  const [editError, setEditError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const admin = admins?.find(a =>
    a.fullName === username || a.id === username || a.email === username
  );

  const [editForm, setEditForm] = useState({ fullName: '', email: '', password: '' });

  const handleEdit = () => {
    if (admin) {
      setEditForm({ fullName: admin.fullName, email: admin.email, password: '' });
    }
    setEditError(null);
    setIsEditModal(true);
  };

  const handleSave = async () => {
    if (!admin) return;
    setEditError(null);
    try {
      const payload: any = {};
      if (editForm.fullName && editForm.fullName !== admin.fullName) payload.fullName = editForm.fullName;
      if (editForm.email && editForm.email !== admin.email) payload.email = editForm.email;
      if (editForm.password) payload.password = editForm.password;

      if (Object.keys(payload).length === 0) {
        setIsEditModal(false);
        return;
      }

      await updateMutation.mutateAsync({ id: admin.id, data: payload });
      setIsEditModal(false);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || err?.message || 'Failed to update admin.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner className="h-64" />;
  }

  if (!admin) {
    return (
      <Horizontal>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Admin not found. The admin "{username}" does not exist.
        </div>
      </Horizontal>
    );
  }

  const profileImg = avatarUrl(admin.profile_picture, admin.fullName);

  return (
    <Horizontal>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profileImg}
            alt={admin.fullName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h1 className="text-2xl font-bold">{admin.fullName}</h1>
            <p className="text-gray-500">{admin.email}</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {admin.status}
            </span>
          </div>
        </div>

        <div className="space-y-0 border border-gray-200 rounded-lg">
          <div className="flex justify-between p-4 border-b border-gray-200">
            <span className="font-medium text-gray-500">Full Name</span>
            <span>{admin.fullName}</span>
          </div>
          <div className="flex justify-between p-4 border-b border-gray-200">
            <span className="font-medium text-gray-500">Email</span>
            <span>{admin.email}</span>
          </div>
          <div className="flex justify-between p-4 border-b border-gray-200">
            <span className="font-medium text-gray-500">Role</span>
            <span className="capitalize">{admin.role}</span>
          </div>
          <div className="flex justify-between p-4 border-b border-gray-200">
            <span className="font-medium text-gray-500">Date Registered</span>
            <span>{admin.date || '—'}</span>
          </div>
          <div className="flex justify-between p-4">
            <span className="font-medium text-gray-500">Last Login</span>
            <span>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : '—'}</span>
          </div>
        </div>

        <button
          onClick={handleEdit}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          Edit Admin
        </button>
      </div>

      <Modal
        isOpen={isEditModal}
        onClose={() => { setIsEditModal(false); setShowPassword(false); }}
        title="Edit Admin"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-center">
            <img
              src={profileImg}
              alt={admin.fullName}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="Full name"
            value={editForm.fullName}
            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            className="border p-2 border-gray-200 rounded"
            autoComplete="new-email"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password (leave blank to keep current)"
              value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              className="border p-2 pr-10 border-gray-200 rounded w-full"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {editError && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{editError}</p>
          )}

          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {updateMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save'}
          </button>
        </div>
      </Modal>
    </Horizontal>
  )
}

export default AdminProfile

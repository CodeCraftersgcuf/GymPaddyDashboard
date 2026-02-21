import React, { useState } from 'react';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import Modal from '../../../../components/Modal';
import { avatarUrl } from '../../../../constants/help';
import { Link } from 'react-router-dom';
import { useUpdateAdmin, useDeleteAdmin } from '../../../../utils/mutations/adminMutations';

interface Props {
  displayData: {
    id: string;
    fullName: string;
    profile_picture: string;
    role: string;
    status: string;
    date: string;
    email: string;
    gender: string;
  };
}

const AdminRow: React.FC<Props> = ({ displayData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: displayData.fullName,
    email: displayData.email,
    password: '',
  });
  const [editError, setEditError] = useState<string | null>(null);

  const updateMutation = useUpdateAdmin();
  const deleteMutation = useDeleteAdmin();

  const handleSave = async () => {
    setEditError(null);
    try {
      const payload: any = {};
      if (formData.fullName !== displayData.fullName) payload.fullName = formData.fullName;
      if (formData.email !== displayData.email) payload.email = formData.email;
      if (formData.password) payload.password = formData.password;

      if (Object.keys(payload).length > 0) {
        await updateMutation.mutateAsync({ id: displayData.id, data: payload });
      }
      setShowEditModal(false);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || err?.message || 'Failed to update admin.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(displayData.id);
      setShowDeleteConfirm(false);
    } catch (err: any) {
      console.error('Delete error:', err);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-100 transition">
        <td className="p-4"><input type="checkbox" className="form-checkbox" /></td>
        <td className="p-4 flex items-center gap-2">
          <img
            src={avatarUrl(displayData.profile_picture, displayData.fullName)}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {displayData.fullName}
        </td>
        <td className="p-4 capitalize">{displayData.role}</td>
        <td className="p-4">
          <span className={`inline-block w-4 h-4 rounded ${displayData.status === 'active' ? 'bg-green-600' : 'bg-gray-300'}`} />
        </td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4 flex gap-2 items-center">
          <Link
            to={`/settings/admin/management/${encodeURIComponent(displayData.fullName)}`}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            Details
          </Link>
          <button
            onClick={() => { setFormData({ fullName: displayData.fullName, email: displayData.email, password: '' }); setEditError(null); setShowEditModal(true); }}
            className="cursor-pointer border border-gray-300 p-2 rounded"
          >
            <Pencil size={16} color="gray" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="cursor-pointer border border-gray-300 p-2 rounded"
          >
            <Trash2 size={16} color="gray" />
          </button>
        </td>
      </tr>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Admin">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-center">
            <img
              src={avatarUrl(displayData.profile_picture, displayData.fullName)}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />
          <input
            type="password"
            placeholder="New password (leave blank to keep current)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border p-2 border-gray-200 rounded"
          />

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

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Delete Admin">
        <div className="flex flex-col gap-4 p-4">
          <p>Are you sure you want to delete <strong>{displayData.fullName}</strong>? This action cannot be undone.</p>
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminRow;

import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Modal from '../../../../components/Modal';
import { avatarUrl } from '../../../../constants/help';
import { Link } from 'react-router-dom';

interface Props {
  displayData: {
    id: number;
    fullName: string;
    profile_picture: string;
    role: string;
    status: 'active' | 'inactive';
    date: string;
    email: string;
    gender: string;
    password: string;
  };
}

const AdminRow: React.FC<Props> = ({ displayData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState(displayData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, profile_picture: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSave = () => {
    console.log('Updated data:', formData);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    console.log('Deleting displayData ID:', displayData.id);
  };

  return (
    <>
      <tr className="hover:bg-gray-100 transition">
        <td className="p-4">
          <input type="checkbox" className="form-checkbox" />
        </td>
        <td className="p-4 flex items-center gap-2">
          <img
            src={avatarUrl(displayData.profile_picture, displayData.fullName)}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          {displayData.fullName}
        </td>
        <td className="p-4">{displayData.role}</td>
        <td className="p-4">
          <span className={`inline-block w-4 h-4 rounded ${displayData.status === 'active' ? 'bg-green-600' : 'bg-gray-300'}`}></span>
        </td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4 flex gap-2 items-center">
          <Link to={`/settings/admin/management/${displayData.fullName}`} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">
            Details
          </Link>
          <button onClick={() => setShowEditModal(true)} className="cursor-pointer border border-gray-300 p-2 rounded">
            <Pencil size={16} color='gray' />
          </button>
          <button onClick={handleDelete} className="cursor-pointer border border-gray-300 p-2 rounded">
            <Trash2 size={16} color='gray' />
          </button>
        </td>
      </tr>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Admin">
        <div className="flex flex-col gap-4 p-4">
          <label className="flex flex-col items-center justify-center">
            <img
              src={avatarUrl(formData.profile_picture, formData.fullName)}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <input type="text" name="fullName" placeholder="Full name" value={formData.fullName} onChange={handleInputChange} className="border p-2 border-gray-200 rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border p-2 border-gray-200 rounded" />
          <select name="gender" value={formData.gender} onChange={handleInputChange} className="border p-2 border-gray-200 rounded">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="border p-2 border-gray-200 rounded" />
          <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600" onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </>
  );
};

export default AdminRow;

import React from 'react';
import { avatarUrl } from '../../../constants/help';
import { Link } from 'react-router-dom';

interface Props {
  displayData: {
    profile_picture?: string;
    fullName: string;
    gender: string;
    age: number;
    goal: string;
    status: 'active' | 'inactive';
    regDate: string;
  };
}

const GymRow: React.FC<Props> = ({ displayData }) => {
  return (
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
      <td className="p-4">{displayData.gender}</td>
      <td className="p-4">{displayData.age}</td>
      <td className="p-4">{displayData.goal}</td>
      <td className="p-4">
        <span className={`inline-block w-4 h-4 rounded ${displayData.status === 'active' ? 'bg-green-600' : 'bg-gray-300'}`}></span>
      </td>
      <td className="p-4">{displayData.regDate}</td>
      <td className="p-4">
        <Link to={`/user/management/${displayData.fullName}/gymhub`} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">
          Profile
        </Link>
      </td>
    </tr>
  );
};

export default GymRow;

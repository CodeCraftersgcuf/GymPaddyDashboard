import React from 'react';
import { AlertOctagonIcon, AlertTriangleIcon } from 'lucide-react';
import MoreDropdown from '../../../components/MoreDropdown';
import { avatarUrl } from '../../../constants/help';
import { Link } from 'react-router-dom';

interface Props {
  displayData: {
    profile_picture?: string;
    fullName: string;
    location: string;
    age: number;
    videoVerification: 'pending' | 'verified';
    subscription: boolean;
    date: string;
  };
}

const ConnectTableRow: React.FC<Props> = ({ displayData }) => {
  console.log(displayData," : single data")
  return (
    <tr className="hover:bg-gray-100 transition cursor-pointer">
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
      <td className="p-4">{displayData.location}</td>
      <td className="p-4">{displayData.age}</td>
      <td className="p-4">
        <span
          className={`inline-block w-4 h-4 rounded ${
            displayData.videoVerification === 'pending' ? 'bg-yellow-500' : 'bg-green-600'
          }`}
        ></span>
      </td>
      <td className="p-4">
        <span
          className={`inline-block w-4 h-4 rounded ${
            displayData.subscription ? 'bg-green-700' : 'bg-gray-300'
          }`}
        ></span>
      </td>
      <td className="p-4">{displayData.date}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Link to={`/user/management/${displayData.fullName}/connect`} className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600">
            Details
          </Link>
          <MoreDropdown menuClass="min-w-[140px] bg-white">
            <div className="flex flex-col gap-1 px-1 text-sm text-black">
              <button className="py-2 px-2 hover:underline cursor-pointer text-left flex items-center gap-2">
                <AlertOctagonIcon size={20} /> Hide displayData
              </button>
              <button className="py-2 px-2 hover:underline cursor-pointer text-left flex items-center gap-2 text-red-600">
                <AlertTriangleIcon size={20} color="red" /> Delete displayData
              </button>
            </div>
          </MoreDropdown>
        </div>
      </td>
    </tr>
  );
};

export default ConnectTableRow;

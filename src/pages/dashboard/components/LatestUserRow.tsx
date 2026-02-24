import React from 'react'
import { Link } from 'react-router-dom';
import { avatarUrl } from '../../../constants/help';

interface UserRowProps {
    displayData: {
        id?: number | string;
        fullName: string;
        username: string;
        email: string;
        phoneNumber: string;
        age: number;
        lastLogin: string;
        profileImage?: string | null;
    };
    selectedIds?: Set<string>;
    onToggle?: (id: string) => void;
}

const LatestUserRow: React.FC<UserRowProps> = ({ displayData, selectedIds, onToggle }) => {
    const isSelected = selectedIds?.has(String(displayData.id)) ?? false;

    return (
        <tr className={`hover:bg-gray-100 transition cursor-pointer relative ${isSelected ? 'bg-red-50' : ''}`}>
            <td className="p-2 py-4 px-4 w-10">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => { e.stopPropagation(); onToggle?.(String(displayData.id)); }}
                    className="cursor-pointer"
                />
            </td>
            <td className="p-2 py-4">
                <div className="flex items-center gap-2">
                    <img
                        src={avatarUrl(displayData.profileImage, displayData.fullName)}
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                    {displayData.fullName}
                </div>
            </td>
            <td className="p-2 py-4">{displayData.username}</td>
            <td className="p-2 py-4">{displayData.email}</td>
            <td className="p-2 py-4">{displayData.phoneNumber}</td>
            <td className="p-2 py-4">{displayData.age}</td>
            <td className="p-2 py-4">{displayData.lastLogin}</td>
            <td className="p-2 py-4">
                {displayData.username ? (
                    <Link to={`/user/management/profile/${displayData.username}`} className="bg-red-500 text-white px-4 py-2 rounded">
                        Details
                    </Link>
                ) : (
                    <span className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed">Details</span>
                )}
            </td>
        </tr>
    );
};

export default LatestUserRow;

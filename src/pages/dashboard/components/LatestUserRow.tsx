import React from 'react'
import { avatarUrl } from '../../../constants/help';

interface UserRowProps {
    displayData: {
        id?: number;
        fullName: string;
        username: string;
        email: string;
        phoneNumber: string;
        age: number;
        lastLogin: string;
        profileImage?: string | null;
    };
}
interface props {
    displayData: UserRowProps['displayData']
}

const LatestUserRow: React.FC<props> = ({ displayData }) => {
    return (
        <tr className="hover:bg-gray-100 transition cursor-pointer relative">
            <td className="p-2 py-4 px-4 w-10">
                <input type="checkbox" />
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
            <td className="p-2 py-4 ">{displayData.age}</td>
            <td className="p-2 py-4">{displayData.lastLogin}</td>
            <td className="p-2 py-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Details</button>
            </td>
        </tr>
    );
};

export default LatestUserRow;

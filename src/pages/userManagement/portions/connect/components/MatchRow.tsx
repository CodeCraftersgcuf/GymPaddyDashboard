import React, { useState } from 'react';
import { avatarUrl } from '../../../../../constants/help';
import MediaSlider from './MediaSlider'; 

interface ReportImageRowProps {
  displayData: {
    id: number;
    image: string;
    name: string;
    location: string;
    date: string;
    images: string[]; // ✅ Add this line
  };
}

const MatchRow: React.FC<ReportImageRowProps> = ({ displayData }) => {
  const [showImageSlider, setShowImageSlider] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-100 transition cursor-pointer relative">
        <td className="p-4">
          <input type="checkbox" />
        </td>
        <td className="p-4">
          <img
            src={avatarUrl(displayData.image, displayData.name)}
            alt={displayData.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </td>
        <td className="p-4">{displayData.name}</td>
        <td className="p-4">{displayData.location}</td>
        <td className="p-4">{displayData.date}</td>
        <td className="p-4">
          <button
            onClick={() => setShowImageSlider(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            View Image
          </button>
        </td>
      </tr>

      {/* ✅ Image Slider Modal */}
      {showImageSlider && (
        <MediaSlider
          type="image"
          media={displayData.images}
          onClose={() => setShowImageSlider(false)}
        />
      )}
    </>
  );
};

export default MatchRow;

import React, { useState } from "react";
import HeaderWrapper from "../../components/HeaderWrapper";
import { useLocation, useParams } from "react-router-dom";
import Horizontal from "../../../../components/alignments/Horizontal";

const Support: React.FC = () => {
  const location = useLocation();
  const [activeTab, setactiveTab] = useState('all');
  const { username } = useParams();

  return (
    <HeaderWrapper
      location={location}
      user={username}
      activeTab={activeTab}
      setActiveTab={setactiveTab}
    >
      <Horizontal>
        <h1 className="text-2xl font-medium">Chat History</h1>
        <div className="rounded-xl bg-white shadow-md shadow-gray-400 p-8 text-center text-gray-500">
          No chat history available for this user.
        </div>
      </Horizontal>
    </HeaderWrapper>
  );
};

export default Support;

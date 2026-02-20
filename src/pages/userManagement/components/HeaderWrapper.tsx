import React, { useEffect, useState } from 'react'
import TabNavigation from './TabNavigation';
import images from '../../../constants/images';
import { useNavigate } from 'react-router-dom';

interface props {
    location: any;
    user: string | number | undefined;
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (string: string) => void;
}

const HeaderWrapper: React.FC<props> = ({ children, activeTab, setActiveTab, user, location }) => {
    const navigate = useNavigate()
    const safeUser = user && user !== 'undefined' && user !== 'null' ? user : '';
    const [dynamicTab, setdynamicTab] = useState(`/user/management/profile/${safeUser}`);
    const tabs = [
        { id: `/user/management/profile/${safeUser}`, label: 'Activity', image: images.user },
        { id: `/user/management/${safeUser}/social`, label: 'Socials', image: images.social },
        // { id: `/user/management/${safeUser}/connect`, label: 'gym', image: images.love },
        { id: `/user/management/${safeUser}/market`, label: 'Market', image: images.market },
        // { id: `/user/management/${safeUser}/gymhub`, label: 'GymHub', image: images.gym },
        { id: `/user/management/${safeUser}/transactions`, label: 'Transactions', image: images.transaction },
        { id: `/user/management/${safeUser}/verifications`, label: 'Verifications', image: images.verification },
        { id: `/user/management/${safeUser}/chat`, label: 'Chat', image: images.support },
    ];
    useEffect(() => {
        const currentTab = tabs.find((tab) => tab.id === location.pathname);
        if (currentTab) setdynamicTab(currentTab.id);
    }, [activeTab]);
    const handleTabChange = (tabId: string) => {
        setdynamicTab(tabId);
        setActiveTab(tabId);
        navigate(tabId)
        console.log('Selected tab:', tabId);
    };

    return (
        <>
            <TabNavigation tabs={tabs} onTabChange={handleTabChange} activeTab={dynamicTab} />

            <div className='flex flex-col gap-6'>
                {children}
            </div>
        </>
    )
}

export default HeaderWrapper
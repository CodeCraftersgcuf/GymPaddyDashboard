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
    const [dynamicTab, setdynamicTab] = useState(`user/management/profile/${user}`);
    const tabs = [
        { id: `/user/management/profile/${user}`, label: 'Activity', image: images.user },
        { id: `/user/management/${user}/social`, label: 'Socials', image: images.social },
        // { id: `/user/management/${user}/connect`, label: 'gym', image: images.love },
        { id: `/user/management/${user}/market`, label: 'Market', image: images.market },
        // { id: `/user/management/${user}/gymhub`, label: 'GymHub', image: images.gym },
        { id: `/user/management/${user}/transactions`, label: 'Transactions', image: images.transaction },
        { id: `/user/management/${user}/verifications`, label: 'Verifications', image: images.verification },
        { id: `/user/management/${user}/chat`, label: 'Chat', image: images.support },
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
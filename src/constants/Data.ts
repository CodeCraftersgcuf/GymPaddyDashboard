import images from "./images";

export interface SubDetail {
    icon: string;
    name: string;
    value: number;
}

export interface StatsCardProps {
    icon: string;
    heading: string;
    subHeading: string;
    IconColor: string;
    value: number | string;
    changeStatus: string;
    subDetail: SubDetail[];
}
// export type NotificationType = 'all' | 'socials' | 'connect' | 'market' | 'gym';

// export type NotificationType = 'all' | 'socials' | 'connect' | 'market' | 'gym';

export const dashboardStatics = [
    {
        icon: images.user,
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: [
            {
                icon: images.comments,
                name: 'Social',
                value: 1000,
            },
            {
                icon: images.heart,
                name: 'Connect',
                value: 1000,
            },
            {
                icon: images.marketIcon,
                name: 'Market',
                value: 1000,
            },
            {
                icon: images.GymIcon,
                name: 'Gym Hub',
                value: 1000,
            },
        ]
    },
    {
        icon: images.transaction,
        heading: 'Total',
        subHeading: 'Transactions',
        IconColor: '#0000FF',
        value: 1000,
        changeStatus: 'up',
        subDetail: [
            {
                icon: images.comments,
                name: 'Social',
                value: 1000,
            },
            {
                icon: images.heart,
                name: 'Connect',
                value: 1000,
            },
            {
                icon: images.marketIcon,
                name: 'Market',
                value: 1000,
            },
            {
                icon: images.GymIcon,
                name: 'Gym Hub',
                value: 1000,
            },
        ]
    },
    {
        icon: images.revenue,
        heading: 'Total',
        subHeading: 'Revenue',
        IconColor: '#008000',
        value: 1000,
        changeStatus: 'up',
        subDetail: [
            {
                icon: images.comments,
                name: 'Social',
                value: 1000,
            },
            {
                icon: images.heart,
                name: 'Connect',
                value: 1000,
            },
            {
                icon: images.marketIcon,
                name: 'Market',
                value: 1000,
            },
            {
                icon: images.GymIcon,
                name: 'Gym Hub',
                value: 1000,
            },
        ]
    },
]



export interface UserRow {
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    gender: string,
    age: number;
    lastLogin: string;
    isActive: boolean;
    action: string;
}


export const latestUsers = [
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": true,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": false,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": true,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": true,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": false,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": true,
        "action": "Details"
    },
    {
        "fullName": "Qmardeen Malik",
        "username": "Maleekfrenzy",
        "email": "qamardeenoladimeji@gmail.com",
        "phoneNumber": "07033484845",
        'age': 14,
        'gender': 'male',
        "lastLogin": "07/03/25 - 01:22 AM",
        "isActive": false,
        "action": "Details"
    }
]



export interface User {
    profile_picture?: string;
    username: string;
}

export interface NotificationProps {
    user: User;
    title: string;
    message: string;
    type: string;
    time: string;
    status: string;
}
export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
}

export interface NotificationFormData {
    title: string;
    message: string;
}

export interface TabProps {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}
export const allnotification = [
    {
        user: { username: "john_doe" },
        title: "New Follower",
        message: "Alice started following you.",
        type: "socials",
        time: "Just now",
        status: "approved"
    },
    {
        user: { username: "fitguy92" },
        title: "Workout Reminder",
        message: "Don't forget leg day today!",
        type: "gym",
        time: "5 minutes ago",
        status: "pending"
    },
    {
        user: { username: "sara_k" },
        title: "New Connection Request",
        message: "You have a new connection request from Mike.",
        type: "connect",
        time: "10 minutes ago",
        status: "approved"
    },
    {
        user: { username: "marketqueen" },
        title: "Stock Alert",
        message: "Tesla shares up by 5%.",
        type: "market",
        time: "30 minutes ago",
        status: "approved"
    },
    {
        user: { username: "admin" },
        title: "System Update",
        message: "New features added to your dashboard.",
        type: "all",
        time: "1 hour ago",
        status: "pending"
    },
    {
        user: { username: "gymbro" },
        title: "Class Booked",
        message: "You’re booked for Yoga at 6PM.",
        type: "gym",
        time: "1 hour ago",
        status: "approved"
    },
    {
        user: { username: "nancy23" },
        title: "Social Mention",
        message: "You were tagged in a photo.",
        type: "socials",
        time: "2 hours ago",
        status: "pending"
    },
    {
        user: { username: "traderjoe" },
        title: "Crypto Update",
        message: "Bitcoin dropped 3% in the last hour.",
        type: "market",
        time: "3 hours ago",
        status: "approved"
    },
    {
        user: { username: "emma_xo" },
        title: "Friend Request",
        message: "Emma wants to connect with you.",
        type: "connect",
        time: "4 hours ago",
        status: "approved"
    },
    {
        user: { username: "support_team" },
        title: "All Systems Go",
        message: "All features are now fully operational.",
        type: "all",
        time: "6 hours ago",
        status: "pending"
    },
    {
        user: { username: "zumba_life" },
        title: "New Gym Challenge",
        message: "Join the 10-day core challenge!",
        type: "gym",
        time: "8 hours ago",
        status: "approved"
    },
    {
        user: { username: "jackyboy" },
        title: "Market Summary",
        message: "Your daily market digest is ready.",
        type: "market",
        time: "10 hours ago",
        status: "pending"
    },
    {
        user: { username: "lucy88" },
        title: "New Like",
        message: "Lucy liked your recent post.",
        type: "socials",
        time: "12 hours ago",
        status: "approved"
    },
    {
        user: { username: "fitnessguru" },
        title: "Gym Tip of the Day",
        message: "Hydration is key during cardio!",
        type: "gym",
        time: "13 hours ago",
        status: "pending"
    },
    {
        user: { username: "connor_dev" },
        title: "New Connect",
        message: "You connected with Connor.",
        type: "connect",
        time: "16 hours ago",
        status: "approved"
    },
    {
        user: { username: "marketwatch" },
        title: "Market Notification",
        message: "Gold prices are rising.",
        type: "market",
        time: "18 hours ago",
        status: "approved"
    },
    {
        user: { username: "megastar" },
        title: "Post Shared",
        message: "Your post was shared 5 times.",
        type: "socials",
        time: "20 hours ago",
        status: "pending"
    },
    {
        user: { username: "connectplus" },
        title: "Network Suggestion",
        message: "You might know Alex from TechMeet.",
        type: "connect",
        time: "22 hours ago",
        status: "approved"
    },
    {
        user: { username: "marketbuzz" },
        title: "Crypto Surge",
        message: "ETH breaks past $3,000!",
        type: "market",
        time: "1 day ago",
        status: "pending"
    },
    {
        user: { username: "team_admin" },
        title: "General Update",
        message: "Maintenance scheduled for Friday.",
        type: "all",
        time: "2 days ago",
        status: "approved"
    }
];

export const mockNotifications = [
    {
        id: '1',
        title: 'New Gym Program Available',
        message: 'Check out our new "Ultimate Strength" program designed by professional trainers. Limited spots available!',
        timestamp: '2024-03-15 09:30 AM',
        type: 'gym'
    },
    {
        id: '2',
        title: 'Special Discount Alert',
        message: 'Get 30% off on all premium subscriptions for the next 24 hours. Use code PREMIUM30 at checkout.',
        timestamp: '2024-03-15 10:15 AM',
        type: 'market'
    },
    {
        id: '3',
        title: 'Community Challenge',
        message: 'Join our 30-day transformation challenge! Share your progress and win exciting prizes.',
        timestamp: '2024-03-15 11:00 AM',
        type: 'socials'
    },
    {
        id: '4',
        title: 'New Connection Request',
        message: 'Sarah Johnson wants to connect with you. Accept the request to start training together!',
        timestamp: '2024-03-15 11:45 AM',
        type: 'connect'
    },
    {
        id: '5',
        title: 'Workout Milestone Achieved',
        message: 'Congratulations! You\'ve completed 50 workouts. Share your achievement with the community!',
        timestamp: '2024-03-15 12:30 PM',
        type: 'gym'
    },
    {
        id: '6',
        title: 'New Product Launch',
        message: 'Introducing our new line of sustainable workout gear. Pre-order now for exclusive benefits!',
        timestamp: '2024-03-15 01:15 PM',
        type: 'market'
    },
    {
        id: '7',
        title: 'Live Session Alert',
        message: 'Your favorite trainer Mike is going live in 30 minutes. Don\'t miss this high-intensity workout!',
        timestamp: '2024-03-15 02:00 PM',
        type: 'socials'
    },
    {
        id: '8',
        title: 'Group Challenge Update',
        message: 'Your team is currently leading the monthly fitness challenge! Keep up the great work!',
        timestamp: '2024-03-15 02:45 PM',
        type: 'connect'
    },
    {
        id: '9',
        title: 'Nutrition Workshop',
        message: 'Register now for our upcoming nutrition workshop with certified dietitian Emma Wilson.',
        timestamp: '2024-03-15 03:30 PM',
        type: 'gym'
    },
    {
        id: '10',
        title: 'Flash Sale Alert',
        message: 'Next hour only! Get 50% off on all protein supplements. Limited stock available!',
        timestamp: '2024-03-15 04:15 PM',
        type: 'market'
    },
    {
        id: '11',
        title: 'Community Poll',
        message: 'Help us improve! Take our quick survey about your favorite workout classes.',
        timestamp: '2024-03-15 05:00 PM',
        type: 'socials'
    },
    {
        id: '12',
        title: 'New Training Partner Match',
        message: 'We found a perfect training partner match for you! Check their profile now.',
        timestamp: '2024-03-15 05:45 PM',
        type: 'connect'
    },
    {
        id: '13',
        title: 'Achievement Unlocked',
        message: 'You\'ve reached your monthly fitness goal! Check your rewards in the dashboard.',
        timestamp: '2024-03-15 06:30 PM',
        type: 'gym'
    },
    {
        id: '14',
        title: 'Limited Time Offer',
        message: 'Buy one get one free on all workout equipment! Offer valid until midnight.',
        timestamp: '2024-03-15 07:15 PM',
        type: 'market'
    },
    {
        id: '15',
        title: 'Trending Workout',
        message: 'Your recent workout video is trending! It has been viewed over 1000 times.',
        timestamp: '2024-03-15 08:00 PM',
        type: 'socials'
    },
    {
        id: '16',
        title: 'New Friend Request',
        message: 'Alex Thompson wants to add you to their fitness circle. Accept to start sharing workouts!',
        timestamp: '2024-03-15 08:45 PM',
        type: 'connect'
    },
    {
        id: '17',
        title: 'Personal Best Alert',
        message: 'Congratulations! You\'ve set a new personal record in today\'s workout!',
        timestamp: '2024-03-15 09:30 PM',
        type: 'gym'
    },
    {
        id: '18',
        title: 'Exclusive Member Discount',
        message: 'As a premium member, get early access to our new fitness accessories collection!',
        timestamp: '2024-03-15 10:15 PM',
        type: 'market'
    },
    {
        id: '19',
        title: 'Content Milestone',
        message: 'Your fitness tips have helped 10,000 community members! Keep sharing your knowledge!',
        timestamp: '2024-03-15 11:00 PM',
        type: 'socials'
    },
    {
        id: '20',
        title: 'Group Challenge Victory',
        message: 'Your team won the weekly challenge! Claim your rewards in the rewards section.',
        timestamp: '2024-03-15 11:45 PM',
        type: 'connect'
    }
];




export interface SupportTableRow {
    id: string;
    user: User;
    message: string;
    created_at: string;
    status: string;
}

// constants/Data.ts
export const supportTickets = [
    {
        id: "1",
        user: { username: "john_doe", profile_picture: "" },
        message: "I need help with my account.",
        created_at: "2025-04-09T08:30:00Z",
        status: "pending",
        type: "connect"
    },
    {
        id: "2",
        user: { username: "sarah_k", profile_picture: "" },
        message: "My payment didn't go through.",
        created_at: "2025-04-08T15:10:00Z",
        status: "approved",
        type: "market"
    },
    {
        id: "3",
        user: { username: "Howdy", profile_picture: "" },
        message: "My payment Failed",
        created_at: "2025-04-08T15:10:00Z",
        status: "approved",
        type: "socials"
    },
    {
        id: "4",
        user: { username: "Alex", profile_picture: "" },
        message: "I can't access my gym membership.",
        created_at: "2025-04-08T15:10:00Z",
        status: "approved",
        type: "gym"
    },
]


export const allAnalytic = [
    { "label": "Total Users", "value": "20,000" },
    { "label": "Online Users", "value": "1,400" },
    { "label": "Active Users", "value": "300" },
    { "label": "Bounce Rate", "value": "200" },
    { "label": "Deleted Accounts", "value": "20" },
    { "label": "Total Revenue", "value": "N20,000" },
    { "label": "Total Deposits", "value": "N20,000" },
    { "label": "Total Withdrawals", "value": "N20,000" },
    { "label": "Admin Earnings", "value": "N20,000" },
    { "label": "Ads Earnings", "value": "N20,000" },
    { "label": "Social Earnings", "value": "N20,000" },
    { "label": "Livestream Earnings", "value": "N20,000" },
    { "label": "Withdrawal Commission", "value": "N20,000" },
    { "label": "Market Earnings", "value": "N20,000" },
    { "label": "Total Subscribers", "value": "2,500" },
    { "label": "Recurring Subscribers", "value": "300" }
]


export const Useranalytics = [
    { "label": "Total Users", "value": "20,000" },
    { "label": "Online Users", "value": "1,400" },
    { "label": "Active Users", "value": "300" },
    { "label": "Bounce Rate", "value": "200" },
    { "label": "Deleted Accounts", "value": "20" },
    { "label": "Total Revenue", "value": "₦20,000" }
]
export const RevenueAnalytics = [
    { "label": "Total Deposits", "value": "₦20,000" },
    { "label": "Total Withdrawals", "value": "₦20,000" },
    { "label": "Admin Earnings", "value": "₦20,000" },
    { "label": "Ads Earnings", "value": "₦20,000" },
    { "label": "Social Earnings", "value": "₦20,000" },
    { "label": "Livestream Earnings", "value": "₦20,000" },
    { "label": "Withdrawal Commission", "value": "₦20,000" },
    { "label": "Market Earnings", "value": "₦20,000" },
    { "label": "Total Subscribers", "value": "2,500" },
    { "label": "Recurring Subscribers", "value": "300" }
]
export const AdsAnalytics = [
    { "label": "Total Ads placed", "value": "500" },
    { "label": "Online Ads", "value": "300" },
    { "label": "Pending Ads", "value": "200" },
    { "label": "Closed Ads", "value": "23" },
    { "label": "Boosted Posts", "value": "234" },
    { "label": "Active Boosts", "value": "34" }
]


export const VerificationsStatics = [
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Verified',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Pending',
        subHeading: 'Verification',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
]

export const VerificationsTable = [
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        "businessName": "ABCD Incorpoation",
        "category": "Gym Wears",
        'document': images.admin,
        'email': 'example@gmail.com',
        'phone': '123456789',
        "status": "approved",
        "created_at": "2025-04-09T08:30:00Z"
    },
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        "businessName": "ABCD Incorpoation",
        "category": "Gym Wears",
        'document': images.admin,
        'email': 'example@gmail.com',
        'phone': '123456789',
        "status": "pending",
        "created_at": "2025-04-09T08:30:00Z"
    },
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        "businessName": "ABCD Incorpoation",
        "category": "Gym Wears",
        'document': images.admin,
        'email': 'example@gmail.com',
        'phone': '123456789',
        "status": "rejected",
        "created_at": "2025-04-09T08:30:00Z"
    },
]
export const SubscriptionTable = [
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        "status": "active",
        'plan': "vip",
        'amount': 'N23,000',
        "created_at": "2025-04-09T08:30:00Z"
    },
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        "status": "active",
        'plan': "vip",
        'amount': 'N23,000',
        "created_at": "2025-04-09T08:30:00Z"
    },
    {
        "user": {
            "profile_picture": "https://via.placeholder.com/40",
            "username": "Qmardeen Malik"
        },
        'plan': "vip",
        'amount': 'N23,000',
        "status": "inactive",
        "created_at": "2025-04-09T08:30:00Z"
    },
]


export const UserStatics = [
    {
        icon: images.user, // replace with actual import or path
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#A52A2A',
        value: 6500,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social, // replace with actual import or path
        heading: 'Social',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: 200,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.love, // replace with actual import or path
        heading: 'Connect',
        subHeading: 'Users',
        IconColor: "#0000FF",
        value: 2000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.market, // replace with actual import or path
        heading: 'Marketplace',
        subHeading: 'Users',
        IconColor: '#008000',
        value: 1500,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.gym, // replace with actual import or path
        heading: 'Gym hub',
        subHeading: 'Users',
        IconColor: '#800080',
        value: 2500,
        changeStatus: 'up',
        subDetail: []
    }
];

export const userTableHeaders = [
    "Full Name",
    "Username",
    "Email",
    "Phone number",
    "Status",
    "Last login",
    "Action"
];


export const usersTable = [
    {
        id: 1,
        profile_picture: 'https://randomuser.me/api/portraits/men/1.jpg',
        fullName: 'Qmardeen Malik',
        username: 'Maleekfrenzy',
        email: 'qamardeenoladimeji@gmail.com',
        phoneNumber: '07033484845',
        age: 14,
        gender: 'male',
        status: 'online',
        lastLogin: '2025-07-03T01:22:00'
    },
    {
        id: 2,
        profile_picture: 'https://randomuser.me/api/portraits/men/2.jpg',
        fullName: 'Jane Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        phoneNumber: '08012345678',
        age: 14,
        gender: 'male',
        status: 'offline',
        lastLogin: '2025-07-01T20:00:00'
    }
    // Add more dummy users as needed
]


export const UserSocialStats = [
    {
        icon: images.social, // replace with correct icon reference if different
        heading: 'Total',
        subHeading: 'Posts',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Comments',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Likes',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Shares',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Saved',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: [],
    },
];


export const UserPostHeaders = [
    'Name',
    'Post',
    'Comments',
    'Like',
    'Replies',
    'Boost Status',
    'Date',
    'Action'
];
export const UserPostData = [
    {
        postType: 'Post',
        post: 'I love to visit the gym....',
        comments: 200,
        like: 40,
        replies: 3,
        boostStatus: 'No',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Post',
        post: 'I love to visit the gym....',
        comments: 200,
        like: 40,
        replies: 3,
        boostStatus: 'Yes',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Comment',
        post: 'I love to visit the gym....',
        comments: 200,
        like: 40,
        replies: 3,
        boostStatus: 'No',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Post',
        post: 'I love to visit the gym....',
        comments: 200,
        like: 40,
        replies: 3,
        boostStatus: 'No',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Like',
        post: 'I love to visit the gym....',
        comments: '-',
        like: '-',
        replies: '-',
        boostStatus: '-',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Post',
        post: 'I love to visit the gym....',
        comments: 200,
        like: 40,
        replies: 3,
        boostStatus: 'No',
        date: '07/03/25 - 01:22 AM'
    }
];
export const StatusPostHeaders = [
    'Name',
    'Post',
    'Views',
    'Likes',
    'Status',
    'Date',
    'Action'
];

export const StatusPostData = [
    {
        postType: 'Status',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d', // sample image
        views: 200,
        likes: 40,
        status: 'Running',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Status',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
        views: 200,
        likes: 40,
        status: 'Ended',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Status',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
        views: 200,
        likes: 40,
        status: 'Running',
        date: '07/03/25 - 01:22 AM'
    }
];


export const LivePostHeaders = [
    'Name',
    'Post',
    'Views',
    'Likes',
    'Earned',
    'Status',
    'Date',
    'Action'
];


export const LivePostData = [
    {
        postType: 'Live',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d', // replace with actual
        views: 200,
        likes: 40,
        earned: '2,000GP',
        status: 'Running',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Live',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
        views: 200,
        likes: 40,
        earned: '2,000GP',
        status: 'Running',
        date: '07/03/25 - 01:22 AM'
    },
    {
        postType: 'Live',
        postImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
        views: 200,
        likes: 40,
        earned: '2,000GP',
        status: 'Running',
        date: '07/03/25 - 01:22 AM'
    }
];

export const mockUser = {
    fullName: 'Qamardeen Malik',
    gender: 'M',
    targetWeight: '50kg',
    lastLogin: '01/01/25 - 06:22 AM',
    username: 'Maleekfrenzy',
    age: 24,
    bodyShape: 'Athletic',
    activeSessions: '20hrs',
    goal: 'Stay Fit',
    height: '5ft 7in',
    targetBodyShape: 'Athletic',
    focusArea: 'Full Body',
    weight: '55kg',
    dateRegistered: '01/01/25 - 06:22 AM'
};

export const mockAssessment = [
    { question: 'What exercise do you prefer ?', answer: 'No equipment' },
    { question: 'What exercise do you prefer ?', answer: 'No equipment' },
    { question: 'What exercise do you prefer ?', answer: 'No equipment' },
    { question: 'What exercise do you prefer ?', answer: 'No equipment' },
    { question: 'What exercise do you prefer ?', answer: 'No equipment' },
];

export const mockChallenges = [
    {
        day: 1,
        title: 'Full body monthly challenge',
        duration: 5,
        exercises: 11,
        progress: 20,
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
        day: 2,
        title: 'Core strength builder',
        duration: 15,
        exercises: 8,
        progress: 0,
        status: 'pending' as const,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
    {
        day: 3,
        title: 'Cardio blast',
        duration: 20,
        exercises: 6,
        progress: 100,
        status: 'completed' as const,
        imageUrl: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    },
];

export const WalletStats = [
    {
        icon: images.revenue, // update with actual icon import or path
        heading: 'GP Wallet',
        subHeading: 'Balance',
        value: '₦250,050',
        IconColor: '#FF0000',
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.revenue, // update with actual icon import or path
        heading: 'Total',
        subHeading: 'Topups',
        value: '10',
        IconColor: '#FF0000',
        changeStatus: 'up',
        subDetail: [],
    },
    {
        icon: images.revenue, // update with actual icon import or path
        heading: 'Total',
        subHeading: 'Withdrawals',
        value: '3',
        IconColor: '#FF0000',
        changeStatus: 'up',
        subDetail: [],
    },
];



export const TransactionFilter = [
    { name: 'all', value: 'all' },
    { name: 'completed', value: 'completed' },
    { name: 'pending', value: 'pending' },
    { name: 'failed', value: 'failed' },
]
export const UserTransactionData = [
    {
        id: 'qwhxj1233jxjqwjkek',
        amount: '₦25,000',
        status: 'successfull',
        type: 'topup',
        date: '07/03/25 - 01:22 AM',
        accountDetails: {
            accountNumber: '1234567890',
            accountName: 'John Doe',
            bankName: 'abc'
        },
    },
    {
        id: 'qwhxj1233jxjqwjkek',
        amount: '₦25,000',
        status: 'successfull',
        type: 'withdrawal',
        accountDetails: {
            accountNumber: '1234567890',
            accountName: 'John Doe',
            bankName: 'abc'
        },
        date: '07/03/25 - 01:22 AM',
    },
    {
        id: 'qwhxj1233jxjqwjkek',
        amount: '₦25,000',
        status: 'failed',
        type: 'topup',
        date: '07/03/25 - 01:22 AM',
        accountDetails: {
            accountNumber: '1234567890',
            accountName: 'John Doe',
            bankName: 'abc'
        },
    },
    {
        id: 'qwhxj1233jxjqwjkek',
        amount: '₦25,000',
        status: 'pending',
        type: 'withdrawal',
        accountDetails: {
            accountNumber: '1234567890',
            accountName: 'John Doe',
            bankName: 'abc'
        },
        date: '07/03/25 - 01:22 AM',
    },
    {
        id: 'qwhxj1233jxjqwjkek',
        amount: '₦25,000',
        status: 'successfull',
        type: 'topup',
        date: '07/03/25 - 01:22 AM',
        accountDetails: {
            accountNumber: '1234567890',
            accountName: 'John Doe',
            bankName: 'abc'
        },
    },
];


export const marketStatics = [
    {
        icon: images.marketIcon,
        heading: 'Total',
        subHeading: 'Listings',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.marketIcon,
        heading: 'Active',
        subHeading: 'Listings',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.marketIcon,
        heading: 'Boosted',
        subHeading: 'Listings',
        IconColor: '#FF0000',
        value: 1000,
        changeStatus: 'up',
        subDetail: []
    },
]

export const marketTabs = [
    { name: 'all', value: 'all' },
    { name: 'social', value: 'social' },
    { name: 'marketplace', value: 'marketplace' },
]

export const ListingTableHeaders = [
    "Img",
    "Name",
    "Price",
    "Category",
    "Boost Status",
    "Date",
    "Action"
];

export const ListingTableData = [
    {
        id: 1,
        image: images.admin,
        name: "20Kg Dumb bell",
        price: "₦25,000",
        category: "Equipment",
        boostedStatus: "boosted", // or "normal"
        status: "active", // hidden in table but useful for filtering
        date: "07/03/25 - 01:22 AM",
    },
    {
        id: 2,
        image: images.admin,
        name: "20Kg Dumb bell",
        price: "₦25,000",
        category: "Equipment",
        boostedStatus: "normal",
        status: "pending",
        date: "07/03/25 - 01:22 AM",
    },
    {
        id: 3,
        image: images.admin,
        name: "20Kg Dumb bell",
        price: "₦25,000",
        category: "Equipment",
        boostedStatus: "boosted",
        status: "closed",
        date: "07/03/25 - 01:22 AM",
    },
];


export interface User {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    interests: number;
    dateRegistered: string;
    relationshipStatus: string;
    interestedIn: string;
    distance: string;
    subscriptionStatus: string;
    images: string[];
    videos: string[];
}

export interface UserProfileProps {
    user: User;
}

export const matchesTableHeaders = [
    "Image",
    "Name",
    "Location",
    "Date",
    "Action",
];


export const matchesTableData = [
    {
        id: 1,
        name: "Sasha Brown",
        location: "Ikeja, Lagos",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        ],
        date: "07/03/25 - 01:22 AM",
    },
    {
        id: 2,
        name: "Sasha Brown",
        location: "Ikeja, Lagos",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        ],
        date: "07/03/25 - 01:22 AM",
    },
    {
        id: 3,
        name: "Sasha Brown",
        location: "Ikeja, Lagos",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        ],
        date: "07/03/25 - 01:22 AM",
    },
];

export const useramangement_Social_Statics = [
    {
        icon: images.user,
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#8B0000', // dark red
        value: 6500,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Social',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: 200,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.love,
        heading: 'Connect',
        subHeading: 'Users',
        IconColor: '#0000FF',
        value: 2000,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.marketIcon,
        heading: 'Marketplace',
        subHeading: 'Users',
        IconColor: '#008000',
        value: 1500,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.gym,
        heading: 'Gym hub',
        subHeading: 'Users',
        IconColor: '#800080',
        value: 2500,
        changeStatus: 'up',
        subDetail: []
    }
];

// starting transactions after jummah
export const revenueStats = [
    {
        icon: images.transaction,
        heading: 'Total',
        subHeading: 'Transactions',
        IconColor: '#8B0000',
        value: 500,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.revenue,
        heading: 'Total',
        subHeading: 'Revenue',
        IconColor: '#FF0000',
        value: '₦20,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.revenue,
        heading: 'Socials',
        subHeading: 'Revenue',
        IconColor: '#0000FF',
        value: '₦2,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.love,
        heading: 'Connect',
        subHeading: 'Revenue',
        IconColor: '#008000',
        value: '₦11,500',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.market,
        heading: 'Market place',
        subHeading: 'Revenue',
        IconColor: '#800080',
        value: '₦7,500',
        changeStatus: 'up',
        subDetail: []
    }
];


export const adsStatistics = [
    {
        icon: images.social, // replace with your ads icon
        heading: 'Total',
        subHeading: 'ADS',
        IconColor: '#FF0000',
        value: 200,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Social',
        subHeading: 'ADS',
        IconColor: '#FF0000',
        value: 150,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Market',
        subHeading: 'ADS',
        IconColor: '#FF0000',
        value: 50,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Ads',
        subHeading: 'Revenue',
        IconColor: '#FF0000',
        value: '₦20,000',
        changeStatus: 'up',
        subDetail: []
    }
];

export const adsTableHeaders = [
    "Name",
    "Title",
    "Price",
    "Duration",
    "Status",
    "Date",
    "Action"
];
export const adsTableData = [
    {
        id: 1,
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
        name: 'Qmardeen Malik',
        title: '20kg Dumb bell',
        price: '₦25,000',
        duration: '24 hrs',
        status: 'active',
        date: '07/03/25 - 01:22 AM',
        type: 'social',
        impressions: 2400,
        clicks: 1200,
        amountSpent: '2,500 GP',
        boostDuration: '5 days',
        dateCreated: '01/01/25 - 02:22 AM',
        listingStatus: 'active',
        adStatus: 'inactive',
        description: 'The best dumb bell you can get',
        category: 'Equipment'
    },
    {
        id: 2,
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        name: 'Sarah Johnson',
        title: 'Yoga Mat Premium',
        price: '₦15,000',
        duration: '48 hrs',
        status: 'pending',
        date: '07/03/25 - 02:15 PM',
        type: 'marketplace',
        impressions: 1800,
        clicks: 900,
        amountSpent: '1,800 GP',
        boostDuration: '3 days',
        dateCreated: '01/02/25 - 03:45 PM',
        listingStatus: 'active',
        adStatus: 'active',
        description: 'High-quality yoga mat for professionals',
        category: 'Equipment'
    },
    {
        id: 3,
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'John Smith',
        title: 'Protein Powder',
        price: '₦35,000',
        duration: '72 hrs',
        status: 'inactive',
        date: '07/02/25 - 11:30 AM',
        type: 'social',
        impressions: 3200,
        clicks: 1600,
        amountSpent: '3,000 GP',
        boostDuration: '7 days',
        dateCreated: '01/03/25 - 09:15 AM',
        listingStatus: 'inactive',
        adStatus: 'inactive',
        description: 'Premium whey protein powder',
        category: 'Supplements'
    }
];

export const socialManagementStats = [
    {
        icon: images.social, // replace with appropriate icon
        heading: 'Total',
        subHeading: 'Posts',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Comments',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Likes',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Shares',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Total',
        subHeading: 'Saved',
        IconColor: '#FF0000',
        value: 30,
        changeStatus: 'up',
        subDetail: []
    }
];


export const ConnectStatistics = [
    {
        icon: images.social, // replace with appropriate icon
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '20,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Subscribed',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '2,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Generated',
        subHeading: 'Revenue',
        IconColor: '#FF0000',
        value: '₦250,150',
        changeStatus: 'up',
        subDetail: []
    }
];

export const connectuserTableHeaders = [
    'Name',
    'Location',
    'Age',
    'Video Verification',
    'Subscription',
    'Date',
    'Action'
];

export const connectuserTableData = [
    {
        id: 1,
        fullName: 'Qmardeen Malik',
        location: 'Ikeja, Lagos',
        age: 25,
        videoVerification: 'pending',
        subscription: true,
        date: '07/03/25 - 01:22 AM'
    },
    {
        id: 4,
        fullName: 'Chiamaka Obi',
        location: 'Enugu, Nigeria',
        age: 24,
        videoVerification: 'verified',
        subscription: true,
        date: '07/03/25 - 01:30 AM'
    },
    {
        id: 5,
        fullName: 'Bashir Usman',
        location: 'Kano, Nigeria',
        age: 28,
        videoVerification: 'pending',
        subscription: false,
        date: '07/03/25 - 04:15 AM'
    },
    {
        id: 6,
        fullName: 'Maryam Bello',
        location: 'Kaduna, Nigeria',
        age: 26,
        videoVerification: 'verified',
        subscription: true,
        date: '07/03/25 - 05:00 AM'
    },
    {
        id: 7,
        fullName: 'Emeka Nwosu',
        location: 'Onitsha, Nigeria',
        age: 31,
        videoVerification: 'pending',
        subscription: false,
        date: '07/03/25 - 06:20 AM'
    },
    {
        id: 8,
        fullName: 'Aisha Ibrahim',
        location: 'Ilorin, Nigeria',
        age: 29,
        videoVerification: 'verified',
        subscription: true,
        date: '07/03/25 - 07:45 AM'
    },
    {
        id: 9,
        fullName: 'Tunde Adebayo',
        location: 'Ibadan, Nigeria',
        age: 32,
        videoVerification: 'pending',
        subscription: false,
        date: '07/03/25 - 08:10 AM'
    },
    {
        id: 10,
        fullName: 'Grace Umeh',
        location: 'Benin City',
        age: 27,
        videoVerification: 'verified',
        subscription: true,
        date: '07/03/25 - 09:25 AM'
    },
    {
        id: 11,
        fullName: 'Ibrahim Musa',
        location: 'Jos, Nigeria',
        age: 33,
        videoVerification: 'verified',
        subscription: false,
        date: '07/03/25 - 10:15 AM'
    },
    {
        id: 12,
        fullName: 'Zainab Garba',
        location: 'Sokoto, Nigeria',
        age: 26,
        videoVerification: 'pending',
        subscription: true,
        date: '07/03/25 - 11:50 AM'
    },
    {
        id: 13,
        fullName: 'Segun Ayodele',
        location: 'Abeokuta, Nigeria',
        age: 30,
        videoVerification: 'verified',
        subscription: false,
        date: '07/03/25 - 12:40 PM'
    },
    {
        id: 14,
        fullName: 'Nneka Chukwu',
        location: 'Awka, Nigeria',
        age: 28,
        videoVerification: 'pending',
        subscription: true,
        date: '07/03/25 - 01:55 PM'
    },
    {
        id: 15,
        fullName: 'Yakubu Danjuma',
        location: 'Maiduguri, Nigeria',
        age: 34,
        videoVerification: 'verified',
        subscription: false,
        date: '07/03/25 - 03:10 PM'
    }
];


export const listingStatistics = [
    {
        icon: images.social, // Replace with your actual icon asset
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '20,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Boosted',
        subHeading: 'Listings',
        IconColor: '#FF0000',
        value: '2,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Generated',
        subHeading: 'Revenue',
        IconColor: '#FF0000',
        value: '₦250,150',
        changeStatus: 'up',
        subDetail: []
    }
];

export const GymStats = [
    {
        icon: images.social, // Replace with actual icon path or import
        heading: 'Total',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '20,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Gymhub',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '2,000',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Online',
        subHeading: 'Users',
        IconColor: '#FF0000',
        value: '123',
        changeStatus: 'up',
        subDetail: []
    }
];

export const gymUserTableHeaders = [
    'Name',
    'Gender',
    'Age',
    'Goal',
    'Status',
    'Reg Date',
    'Action'
];

export const gymUserTableData = [
    {
        id: 1,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active', // or 'inactive'
        regDate: '07/03/25 - 01:22 AM'
    },
    {
        id: 2,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active',
        regDate: '07/03/25 - 01:22 AM'
    },
    {
        id: 3,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active',
        regDate: '07/03/25 - 01:22 AM'
    },
    {
        id: 4,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active',
        regDate: '07/03/25 - 01:22 AM'
    },
    {
        id: 5,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active',
        regDate: '07/03/25 - 01:22 AM'
    },
    {
        id: 6,
        profile_picture: '/images/user-avatar.jpg',
        fullName: 'Qmardeen Malik',
        gender: 'Male',
        age: 24,
        goal: 'Stay fit',
        status: 'active',
        regDate: '07/03/25 - 01:22 AM'
    }
];

export const adminStatistics = [
    {
        icon: images.social, // Replace with actual icon import
        heading: 'Total',
        subHeading: 'Admins',
        IconColor: '#FF0000',
        value: '20',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Online',
        subHeading: 'Admins',
        IconColor: '#FF0000',
        value: '5',
        changeStatus: 'up',
        subDetail: []
    },
    {
        icon: images.social,
        heading: 'Offline',
        subHeading: 'Admins',
        IconColor: '#FF0000',
        value: '3',
        changeStatus: 'up',
        subDetail: []
    }
];

export const adminUserTableHeaders = [
    'Name',
    'Role',
    'Status',
    'Date',
    'Action'
];


export const adminUserTableData = [
    {
        id: 1,
        fullName: 'Qmardeen Malik',
        profile_picture: '/images/user-avatar.jpg',
        role: 'Owner',
        status: 'active',
        date: '07/03/25 - 01:22 AM',
        email: 'qmardeen@example.com',
        gender: 'Male',
        password: '********'
    },
    {
        id: 2,
        fullName: 'username',
        profile_picture: '/images/user-avatar.jpg',
        role: 'Owner',
        status: 'active',
        date: '07/03/25 - 01:22 AM',
        email: 'qmardeen@example.com',
        gender: 'Male',
        password: '********'
    },
    {
        id: 3,
        fullName: 'John howdy',
        profile_picture: '/images/user-avatar.jpg',
        role: 'Owner',
        status: 'active',
        date: '07/03/25 - 01:22 AM',
        email: 'qmardeen@example.com',
        gender: 'Male',
        password: '********'
    }
];

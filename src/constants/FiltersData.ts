export const dates = [
    { name: 'all', value: 'all' },
    { name: 'today', value: 'today' },
    { name: 'week', value: '7' },
    { name: 'last 30 days', value: '30' },
    { name: 'last 365 days', value: '365' },
    { name: 'specific month', value: 'specific_month' },
    { name: 'specific year', value: 'specific_year' },
];

export const months = [
    { name: 'January', value: '0' }, { name: 'February', value: '1' }, { name: 'March', value: '2' },
    { name: 'April', value: '3' }, { name: 'May', value: '4' }, { name: 'June', value: '5' },
    { name: 'July', value: '6' }, { name: 'August', value: '7' }, { name: 'September', value: '8' },
    { name: 'October', value: '9' }, { name: 'November', value: '10' }, { name: 'December', value: '11' },
];

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 6 }, (_, i) => ({ name: String(currentYear - i), value: String(currentYear - i) }));
export const notificationStatus = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'approved',
        value: 'approved'
    },
    {
        name: 'pending',
        value: 'pending'
    },
]

export const analyticsTab = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'users',
        value: 'UsersPortion'
    },
    {
        name: 'Revenue',
        value: 'RevenuePortion'
    },
    {
        name: 'ads',
        value: 'AdsPortion'
    },
]
export const bulkFilter = [
    {
        name: 'Export AS CSV',
        value: 'ExportASCSV'
    },
]

export const UserActiveStatus = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'online',
        value: 'online'
    },
    {
        name: 'offline',
        value: 'offline'
    },
]

export const boostedFilter = [
    { name:'all',value:'all' },
    { name:'normal',value:'normal' },
    { name:'boosted',value:'boosted' },
]
export const socialFilter = [
    { name:'all',value:'all' },
    { name:'comment',value:'comment' },
    { name:'like',value:'like' },
    { name:'replies',value:'replies' },
]

export const adsStatus = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'active',
        value: 'active'
    },
    {
        name: 'pending',
        value: 'pending'
    },
    {
        name: 'paused',
        value: 'paused'
    },
    {
        name: 'completed',
        value: 'completed'
    },
]
export const connectVerifyStatus = [
    {
        name: 'all',
        value: 'all'
    },
    {
        name: 'verified',
        value: 'verified'
    },
    {
        name: 'pending',
        value: 'pending'
    },
]
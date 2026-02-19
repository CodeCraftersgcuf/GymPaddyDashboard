// This file ensures all assets are included in the build
// by importing them and making them available to the bundler
import images from '../constants/images';

// This function ensures all images are included in the build
// even if they're not immediately used in the initial render
export const ensureAllAssets = () => {
  // Return all images to ensure they're not tree-shaken
  return {
    // Icons
    booking: images.booking,
    dashboard: images.dashboard,
    earning: images.earning,
    notification: images.notification,
    rating: images.rating,
    riderManagement: images.riderManagement,
    setting: images.setting,
    statement: images.statement,
    support: images.support,
    tracking: images.tracking,
    userManagement: images.userManagement,
    Bell: images.Bell,
    
    // Images
    admin: images.admin,
    logo: images.logo,
    gym: images.gym,
    market: images.market,
    love: images.love,
    social: images.social,
    ads: images.ads,
    verification: images.verification,
    subcription: images.subcription,
    transaction: images.transaction,
    report: images.report,
    gymBg: images.gymBg,
    
    // Card Icons
    revenue: images.revenue,
    heart: images.heart,
    comments: images.comments,
    marketIcon: images.marketIcon,
    GymIcon: images.GymIcon,
    RevenueIcon: images.RevenueIcon,
    user: images.user,
  };
};

// Export the function to ensure it's not tree-shaken
export default ensureAllAssets;


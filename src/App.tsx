import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import './App.css'
// Ensure all assets are included in the build by importing them directly
import images from "./constants/images";

// Importing all pages
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/setting/Setting";
import Support from "./pages/support/Support";

import Transaction from "./pages/transaction/Transaction";
import Subcription from "./pages/subcription/Subcription";
import Verification from "./pages/verification/Verification";
import Ads from "./pages/ads/Ads";
import Analytics from "./pages/analytics/Analytics";
import SocialManagement from "./pages/social/SocialManagement";
import ConnectManagement from "./pages/connect/ConnectManagement";
import MarketManagement from "./pages/market/MarketManagement";
import GymManagement from "./pages/gym/GymManagement";
import Market from "./pages/userManagement/portions/market/Market";
import Connect from "./pages/userManagement/portions/connect/Connect";
import Social from "./pages/userManagement/portions/social/Social";
import UserManagement from "./pages/userManagement/UserManagement";
import Notification from "./pages/notification/Notification";
import UserProfile from "./pages/userManagement/portions/UserProfile";
import GymHub from "./pages/userManagement/portions/gymhub/GymHub";
import UserChat from "./pages/userManagement/portions/chat/UserChat";
import UserVerification from "./pages/userManagement/portions/verification/UserVerification";
import UserTransaction from "./pages/userManagement/portions/transactions/UserTransaction";
import UserManagementSocial from "./pages/userManegement_dropDown_portion/UserManagement_Social/UserManagementSocial";
import UserManagementConnect from "./pages/userManegement_dropDown_portion/UserManagement_Connect/UserManagementConnect";
import UserManagementMarket from "./pages/userManegement_dropDown_portion/UserManagement_Market/UserManagementMarket";
import UserManagementGym from "./pages/userManegement_dropDown_portion/UserManagement_Gym/UserManagementGym";
import AdminManagement from "./pages/setting/admin/AdminManagement";
import AdminProfile from "./pages/setting/admin/AdminProfile";
import Login from "./auth/Login";



const App: React.FC = () => {
  // Ensure all assets are included in the build by referencing them
  // This prevents tree-shaking of unused assets
  const allAssets = {
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
    Bell: images.Bell,
    revenue: images.revenue,
    heart: images.heart,
    comments: images.comments,
    marketIcon: images.marketIcon,
    GymIcon: images.GymIcon,
    RevenueIcon: images.RevenueIcon,
    user: images.user,
    gymBg: images.gymBg,
  };
  
  // Log to ensure they're not tree-shaken (this will be removed in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('All assets loaded:', Object.keys(allAssets));
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Layout Wraps All Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* user management */}
          <Route path="user/management" element={<UserManagement />} />
          <Route path="user/management/profile/:username" element={<UserProfile />} />
          <Route path="user/management/:username/social" element={<Social />} />
          <Route path="user/management/:username/market" element={<Market />} />
          <Route path="user/management/:username/connect" element={<Connect />} />
          <Route path="user/management/:username/gymhub" element={<GymHub />} />
          <Route path="/user/management/:username/chat" element={<UserChat />} />
          <Route path="/user/management/:username/verifications" element={<UserVerification />} />
          <Route path="/user/management/:username/transactions" element={<UserTransaction />} />


          {/* dropdown pages */}
          <Route path="user/management/social" element={<UserManagementSocial />} />
          <Route path="user/management/connect" element={<UserManagementConnect />} />
          <Route path="user/management/market" element={<UserManagementMarket />} />
          <Route path="user/management/gymhub" element={<UserManagementGym />} />

          <Route path="transaction" element={<Transaction />} />
          <Route path="subcription" element={<Subcription />} />
          <Route path="verification" element={<Verification />} />
          <Route path="ads" element={<Ads />} />
          <Route path="social" element={<SocialManagement />} />
          <Route path="connect" element={<ConnectManagement />} />
          <Route path="market" element={<MarketManagement />} />
          <Route path="gym" element={<GymManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="support" element={<Support />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<Setting />} />
          <Route path="settings/admin/management" element={<AdminManagement />} />
          <Route path="settings/admin/management/:username" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

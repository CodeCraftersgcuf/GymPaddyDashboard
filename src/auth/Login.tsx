import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';
import apiCall from '../utils/apiCall';
import { API_ROUTES } from '../config/apiRoutes';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await apiCall.post<{ access_token: string; user: any }>(
          API_ROUTES.AUTH.LOGIN,
          values
        );
        
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  // Ensure all assets are included in the build by referencing them
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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${images.gymBg})` }} // Replace with your background
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <img src={images.logo} alt="Logo" className="w-16 h-16" /> {/* Replace with your logo */}
        </div>
        
        {/* Hidden images to ensure they're included in the build */}
        <div style={{ display: 'none' }}>
          <img src={images.booking} alt="booking" />
          <img src={images.dashboard} alt="dashboard" />
          <img src={images.earning} alt="earning" />
          <img src={images.notification} alt="notification" />
          <img src={images.rating} alt="rating" />
          <img src={images.riderManagement} alt="riderManagement" />
          <img src={images.setting} alt="setting" />
          <img src={images.statement} alt="statement" />
          <img src={images.support} alt="support" />
          <img src={images.tracking} alt="tracking" />
          <img src={images.userManagement} alt="userManagement" />
          <img src={images.admin} alt="admin" />
          <img src={images.gym} alt="gym" />
          <img src={images.market} alt="market" />
          <img src={images.love} alt="love" />
          <img src={images.social} alt="social" />
          <img src={images.ads} alt="ads" />
          <img src={images.verification} alt="verification" />
          <img src={images.subcription} alt="subcription" />
          <img src={images.transaction} alt="transaction" />
          <img src={images.report} alt="report" />
          <img src={images.Bell} alt="Bell" />
          <img src={images.revenue} alt="revenue" />
          <img src={images.heart} alt="heart" />
          <img src={images.comments} alt="comments" />
          <img src={images.marketIcon} alt="marketIcon" />
          <img src={images.GymIcon} alt="GymIcon" />
          <img src={images.RevenueIcon} alt="RevenueIcon" />
          <img src={images.user} alt="user" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-1">Login</h2>
        <p className="text-center text-gray-500 mb-6">Login to your dashboard</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter Email"
            className="w-full border rounded p-2 focus:outline-none"
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter Password"
            className="w-full border rounded p-2 focus:outline-none"
            disabled={isLoading}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinkComp from "./components/Link";
import { Sidebar_links } from "../constants/sidebarLinks";
import images from "../constants/images";
import { LogOut, ArrowLeft } from "lucide-react";
import apiCall from "../utils/apiCall";
import { API_ROUTES } from "../config/apiRoutes";
interface SidebarProps {
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState<string>("/dashboard");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await apiCall.post(API_ROUTES.AUTH.LOGOUT);
        } catch {
            // Proceed with local logout even if API call fails
        } finally {
            localStorage.removeItem('authToken');
            navigate('/');
        }
    };

    return (
        <div
            className={`h-screen overflow-auto transition-all duration-300 ${menuOpen ? "w-[80px]" : "w-[300px]"} bg-theme-light text-black`}
        >
            {/* Mobile Close Button */}
            <div className="flex justify-end lg:hidden p-4">
                <button
                    className="text-xl cursor-pointer"
                    onClick={() => setMobileOpen(false)}
                >
                    ✕
                </button>
            </div>

            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 py-4 h-[72px]">
                {/* <Link to="/dashboard">
                    <h1 className="text-xl font-bold">Fast Logistics</h1>
                </Link> */}

                <img src={images.logo} alt="Logo" className="size-14 object-contain" />
                {/* Toggle Menu Icon */}
                {menuOpen && (
                    <div
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-4 left-4 bg-gray-800 p-2 rounded-md cursor-pointer"
                    >
                        <ArrowLeft size={22} className="text-white" />
                    </div>
                )}
            </div>

            {/* Menu Items */}
            <nav className="mt-4 px-4">
                <ul className="space-y-2">
                    {Sidebar_links.map((x, index) => (
                        <li key={index}>
                            <LinkComp
                                name={x.name}
                                link={x.link}
                                icon={x.icon}
                                sub={x.sublinks}
                                isActiveCheck={activeLink === x.link}
                                onClick={() => setActiveLink(x.link)}
                                menuStatus={menuOpen}
                            />
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 mt-4 flex items-center justify-center">
                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center justify-center p-2 gap-2 text-[#FF0000] font-bold rounded-lg w-full border border-[#F70F0F] hover:bg-red-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <LogOut size={22} />
                    {!menuOpen && <span>{loggingOut ? 'Logging out…' : 'Logout'}</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

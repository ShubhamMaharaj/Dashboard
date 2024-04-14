import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPost from "./AddPost";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showAddPost, setShowAddPost] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleAddPostClick = () => {
        setShowAddPost(!showAddPost);
        handleDrawerClose();
    };

    return (
        <div className="flex">
            <nav className="bg-gray-800 w-64 h-screen">
                <div className="flex items-center justify-between h-16 px-4">
                    <div>
                        <button className="text-white" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </button>
                        <span className="ml-2 text-white font-bold text-lg">Admin Panel</span>
                    </div>
                    <div className="flex items-center">
                        <button className="text-white" onClick={handleMenuOpen}>
                            <PersonIcon />
                        </button>
                        {anchorEl && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={handleMenuClose}>
                                    <RefreshIcon className="inline-block h-6 w-6" /> Refresh
                                </button>
                                <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={handleMenuClose}>
                                    <LogoutIcon className="inline-block h-6 w-6" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <ul>
                        <li>
                            <button className="block py-2 px-4 text-white hover:bg-gray-700" onClick={handleAddPostClick}>
                                <DashboardIcon className="inline-block h-6 w-6" />
                                <span className="ml-2">Add Post</span>
                            </button>
                        </li>
                        {/* Add more ListItems for other components */}
                    </ul>
                </div>
            </nav>
            <div className={`flex-1 ${open ? 'ml-64' : ''}`}>
                {/* Content */}
                {showAddPost && <AddPost />}
            </div>
        </div>
    );
}

export default Navbar;

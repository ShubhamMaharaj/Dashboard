import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPost from "./AddPost";
import HomePage from "./HomePage";
import Swal from 'sweetalert2';
import TopHead from "./TopHead";


const Navbar: React.FC = () => {

    const [showStates, setShowStates] = useState({
        showAddPost: false,
        showHomePage: true,
      });
      const [isMenuOpen, setIsMenuOpen] = useState(true);
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
     
    const toggleComponent = (componentName) => {
        setShowStates((prevState) => {
          const updatedStates = {};
          // Set the state of the clicked component to true
          updatedStates[componentName] = true;
          // Set the state of all other components to false
          Object.keys(prevState).forEach((key) => {
            if (key !== componentName) {
              updatedStates[key] = false;
            }
          });
          return updatedStates;
        });
      };
   
    return (
        <div className="">
           <div className="w-full flex">
               <nav className={`fixed left-0 top-0 bottom-0 bg-gray-800 h-screen bg-gray-800 w-64 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0 ' : '-translate-x-full '}`}>
                <div className="flex items-center justify-between h-16 px-4  border-white">
                    <div className="flex">
                        <h1 className="ml-2 text-white font-bold text-lg" style={{ fontSize: '2rem' }}>Admin Panel</h1>
                        
                    </div>
                   
                </div>
                <div className="mt-4">
                    <ul>
                        <li>
                        <button className="block py-2 px-4 text-white w-full text-left hover:bg-gray-700" onClick={() => toggleComponent('showHomePage')}>
                                <DashboardIcon className="inline-block h-6 w-6" />
                                <span className="ml-2">Dashboard</span>
                            </button>
                            <button className="block py-2 px-4 text-white w-full text-left hover:bg-gray-700" onClick={() => toggleComponent('showAddPost')}>
                                <PostAddIcon className="inline-block h-6 w-6" />
                                <span className="ml-2">Add Post</span>
                            </button>
                        </li>
                        {/* Add more ListItems for other components */}
                    </ul>
                </div>
               </nav>
               <div className={`flex-1 transition-margin duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                

                {/* Top HEad */}
                <TopHead isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
            
                {/* Content */}
                {showStates.showHomePage && <HomePage />}
                {showStates.showAddPost && <AddPost />}
               </div>

            </div>
            
        </div>
    );
}

export default Navbar;

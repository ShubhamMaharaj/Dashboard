import React, { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const TopHead: React.FC = ({ isMenuOpen, toggleMenu}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {

    if (option =='Logout'){
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Logout successful!',
          });
         
          navigate('/');
    }
    
    setIsOpen(false);
    // Perform any action based on the selected option
  };
   

    return (
       <>
            <div className="w-full flex justify-between p-3 bg-gray-800 h-16">
              
               {isMenuOpen?  <button onClick={toggleMenu}>
                    
                    <ClearIcon className="text-white inline-block h-6 w-6 mt-2 justify-start"/></button>: <button onClick={toggleMenu}>
                    
                     <MenuIcon className="text-white inline-block h-6 w-6 mt-2 justify-start"/></button>}
                  
                   <div className="">
                     <button
                     onClick={toggleDropdown}
                     className="text-gray-800 bg-white rounded-full p-2 focus:outline-none"
                     >
        <PersonIcon />
                    </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 top-16 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => handleOptionClick("Logout")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none"
              role="menuitem"
            >
               Logout  <LogoutIcon/>
              
            </button>
            <button
              onClick={() => handleOptionClick("Refresh")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none"
              role="menuitem"
            >
              Refresh <RefreshIcon/>
            </button>
            {/* Add more options as needed */}
          </div>
        </div>
      )}
                       
                    </div>
                 
                   
               </div>
       
       
       </>
    );
}

export default TopHead;

import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import React, { useState } from "react";
import AddPost from "./AddPost";
import AllPosts from "./AllPost";
import HomePage from "./HomePage";
import PushNotification from './PushNotification';
import TopHead from "./TopHead";

interface ShowType {
  showAddPost: boolean;
  showHomePage: boolean;
  showAllPosts: boolean;
  showPushNotification: boolean;
}

const Navbar: React.FC = () => {

  const [showStates, setShowStates] = useState<ShowType>({
    showAddPost: false,
    showHomePage: true,
    showAllPosts: false,
    showPushNotification: false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleComponent = (componentName: keyof ShowType): void => {
    setShowStates((prevState) => {
      const updatedStates: ShowType = {} as ShowType;
      updatedStates[componentName] = true;
      Object.keys(prevState).forEach((key) => {
        if (key !== componentName) {
          updatedStates[key as keyof ShowType] = false;
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
                <button className="block py-2 px-4 text-white w-full text-left hover:bg-gray-700" onClick={() => toggleComponent('showAllPosts')}>
                  <PostAddIcon className="inline-block h-6 w-6" />
                  <span className="ml-2">All Post</span>
                </button>
                <button className="block py-2 px-4 text-white w-full text-left hover:bg-gray-700" onClick={() => toggleComponent('showPushNotification')}>
                  <PostAddIcon className="inline-block h-6 w-6" />
                  <span className="ml-2">Push Notification</span>
                </button>
              </li>
              {/* Add more ListItems for other components */}
            </ul>
          </div>
        </nav>
        <div className={`flex-1 transition-margin duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>


          {/* Top HEad */}
          <TopHead isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

          {/* Content */}
          {showStates.showHomePage && <HomePage />}
          {showStates.showAddPost && <AddPost />}
          {showStates.showAllPosts && <AllPosts />}
          {showStates.showPushNotification && <PushNotification />}
        </div>

      </div>

    </div>
  );
}

export default Navbar;

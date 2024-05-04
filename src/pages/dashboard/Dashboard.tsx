import React, { } from "react";
// import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";

const Dashboard: React.FC = () => {
  // const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  // const handleMenuClick = () => {
  //   setOpenNavBarMobile(true);
  // };

  // const handleMenuCloseClick = () => {
  //   setOpenNavBarMobile(false);
  // };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">

      {/* <TopBar className="z-10 relative" openMenu={handleMenuClick} /> */}
      <div className="overflow-hidden w-full">
        <NavBar />

      </div>
    </div>
  );
}

export default Dashboard;

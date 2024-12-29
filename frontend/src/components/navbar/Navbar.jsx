

// import "./navbar.scss";
// import {
//   HomeOutlined,
//   DarkModeOutlined,
//   WbSunnyOutlined,
//   NotificationsOutlined,
//   SearchOutlined,
// } from "@mui/icons-material";
// import { AuthContext } from '../../context/authContext';

// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";

// const Navbar = () => {
//   const { state, dispatch } = useContext(AuthContext); 
//   const { toggle, darkMode } = useContext(DarkModeContext);
//   const user = {};
//   const logout={};
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleToggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <div className="navbar">
//       <div className="left">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span>MyApp</span>
//         </Link>
//         <HomeOutlined />
//         {darkMode ? <WbSunnyOutlined onClick={toggle} /> : <DarkModeOutlined onClick={toggle} />}
//         <div className="search">
//           <SearchOutlined />
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="right">
//         <NotificationsOutlined />
//         <div className="user" onClick={handleToggleDropdown}>
//           <img
//             src={user?.attributes?.picture || "default-avatar.png"}
//             alt="Profile"
//           />
//           <span>{user?.attributes?.name || "Guest"}</span>
//           {dropdownOpen && (
//             <div className="dropdown">
//               {user ? (
//                 <button onClick={logout}>Logout</button>
//               ) : (
//                 <button onClick={() => navigate("/login")}>Login</button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import "./navbar.scss";
import {
  HomeOutlined,
  DarkModeOutlined,
  WbSunnyOutlined,
  NotificationsOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Retrieve username from state or fallback to localStorage
  let username = "Guest";
  try {
    username =
      state?.user?.username ||
      JSON.parse(localStorage.getItem("user"))?.username ||
      "Guest";
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }

  const handleToggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    dispatch({ type: "LOGOUT" }); // Update context
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <span>MyApp</span>
        </Link>
        <HomeOutlined />
        {darkMode ? (
          <WbSunnyOutlined onClick={toggle} />
        ) : (
          <DarkModeOutlined onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <NotificationsOutlined />
        <div
          className="user"
          onClick={handleToggleDropdown}
          role="button"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <img
            src={
              state?.user?.profilePicture || "default-avatar.png"
            } // Fallback to default avatar
            alt="Profile"
          />
          <span>{username}</span>
          {dropdownOpen && (
            <div className="dropdown">
              {state?.user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={() => navigate("/login")}>Login</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



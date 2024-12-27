

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
import { AuthContext } from "../../context/authContext"; 
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { state,dispatch } = useContext(AuthContext);
  const username = state?.user?.username || JSON.parse(localStorage.getItem("user"))?.username;

  const { toggle, darkMode } = useContext(DarkModeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    const handleLogout = () => {
      localStorage.removeItem('authToken'); 
      dispatch({ type: 'LOGOUT' }); 
      navigate('/login'); 
    };
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
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
        <div className="user" onClick={handleToggleDropdown}>
          <img
            src={state.user?.attributes?.picture || "default-avatar.png"} // Use user data from state
            alt="Profile"
          />
          <span>{username || "Guest"}</span> {/* Display user name from state */}
          {dropdownOpen && (
            <div className="dropdown">
              {state.user ? (
                <button onClick={handleLogout}>Logout</button> // Show logout if user is logged in
              ) : (
                <button onClick={() => navigate("/login")}>Login</button> // Show login if no user
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

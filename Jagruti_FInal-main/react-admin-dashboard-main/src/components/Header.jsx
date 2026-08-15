import { useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaBars,
  FaUserCircle
} from "react-icons/fa";

function Header({toggleSidebar}) {

  const [dark,setDark]=useState(false);

  const [showProfile,setShowProfile]=useState(false);

  return (

    <div className="header">

      <div className="d-flex align-items-center gap-3">

        <button
          className="icon-btn"
          onClick={toggleSidebar}
        >

          <FaBars/>

        </button>

        <input
          type="text"
          className="form-control search-box"
          placeholder="Search..."
        />

      </div>

      <div className="d-flex align-items-center gap-4">

        <button
          className="icon-btn"
          onClick={()=>setDark(!dark)}
        >

          {dark?<FaSun/>:<FaMoon/>}

        </button>

        <div className="position-relative">

          <FaBell className="fs-5"/>

          <span className="notification-badge">

            5

          </span>

        </div>

        <div className="position-relative">

          <button
            className="icon-btn"
            onClick={()=>setShowProfile(!showProfile)}
          >

            <FaUserCircle size={28}/>

          </button>

          {

            showProfile &&

            <div className="profile-menu">

              <p>My Profile</p>

              <p>Settings</p>

              <hr/>

              <p>Logout</p>

            </div>

          }

        </div>

      </div>

    </div>

  )

}

export default Header;
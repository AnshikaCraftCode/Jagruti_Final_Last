import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHandsHelping,
  FaNewspaper,
  FaHandHoldingHeart,
  FaImages,
  FaEnvelopeOpenText,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Logo from "../assets/images/logo.jpeg";

function Sidebar({ collapsed, setCollapsed }) {
  const menuItems = [
    {
      path: "/",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      path: "/program",
      icon: <FaHandsHelping />,
      label: "Programs",
    },
    {
      path: "/blog",
      icon: <FaNewspaper />,
      label: "Blogs",
    },
    {
      path:"/donation",
      icon: <FaHandHoldingHeart />,
      label: "Donations",
    },
    {
      path: "/gallery",
      icon: <FaImages />,
      label: "Gallery",
    },
    {
      path: "/contact",
      icon: <FaEnvelopeOpenText />,
      label: "Contact",
    },
    
  ];

  return (
    <>
      <style>{`
        .admin-sidebar {
          width: 100%;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: #031436;
          color: #fff;
          scrollbar-width: none;
        }

        .admin-sidebar::-webkit-scrollbar {
          display: none;
        }

        .sidebar-header {
          width: 100%;
          min-height: 110px;
          padding: 20px;
          background: #031436;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .sidebar-brand-wrapper {
          min-width: 0;
          overflow: hidden;
        }

        .sidebar-logo {
          width: 50px;
          height: 50px;
          // padding: 1px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid;
          overflow: hidden;
          flex-shrink: 0;
        }

        .sidebar-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .sidebar-brand h5 {
          margin: 0;
          color: #fff;
          font-size: 17px;
          font-weight: 800;
        }

        .sidebar-brand small {
          color: #FCA5A5;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .sidebar-toggle {
          width: 35px;
          height: 35px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(229,57,53,.2);
          color: #E53935;
        }

        .sidebar-nav {
          width: 100%;
          padding-top: 10px;
        }

        .sidebar-link {
          width: 100%;
          min-height: 60px;
          padding: 0 25px;
          display: flex;
          align-items: center;
          gap: 18px;
          color: #E2E8F0;
          text-decoration: none;
          transition: all 0.25s ease;
          position: relative;
          white-space: nowrap;
        }

        .sidebar-link svg {
          width: 20px;
          min-width: 20px;
          font-size: 18px;
        }

        .sidebar-link:hover {
          color: #fff;
          background: rgba(229,57,53,.12);
        }

        .sidebar-link.active {
          color: #fff;
          background: #E53935;
        }

        .sidebar-link.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #fff;
        }

        .collapsed-link {
          justify-content: center;
          padding: 0;
        }

        .sidebar-logout {
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .sidebar-header {
            padding: 15px;
          }

          .sidebar-link {
            padding: 0 20px;
          }

          .collapsed-link {
            padding: 0;
          }
        }
      `}</style>

      <div className="admin-sidebar">

        {/* Sidebar Header */}
        <div
          className="sidebar-header d-flex align-items-center justify-content-between"
        >

          {!collapsed && (
            <div className="sidebar-brand-wrapper d-flex align-items-center gap-3">

              <div className="sidebar-logo">
                <img
                  src={Logo}
                  alt="Jagruti Foundation"
                />
              </div>

              <div className="sidebar-brand">
                <h5>Jagruti</h5>
                <small>FOUNDATION</small>
              </div>

            </div>
          )}

          {collapsed && (
            <div className="sidebar-logo">
              <img
                src={Logo}
                alt="Jagruti Foundation"
              />
            </div>
          )}

          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FaChevronRight />
            ) : (
              <FaChevronLeft />
            )}
          </button>

        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  collapsed ? "collapsed-link" : ""
                } ${isActive ? "active" : ""}`
              }
            >
              {item.icon}

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </NavLink>
          ))}

         

        </nav>

      </div>
    </>
  );
}

export default Sidebar;
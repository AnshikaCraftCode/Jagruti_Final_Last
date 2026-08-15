import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Dropdown, Badge } from "react-bootstrap";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaCheck,
  FaSignOutAlt,
} from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();

  // Load saved theme preference or default to false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New volunteer application received", time: "5m ago", unread: true },
    { id: 2, text: "New donation recorded (₹5,000)", time: "1h ago", unread: true },
    { id: 3, text: "Blog post published successfully", time: "2h ago", unread: true },
  ]);

  // Effect to apply dark mode globally to the <body> element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  // Admin user data from localStorage
  const adminUserStr = localStorage.getItem("adminUser");
  const adminUser = adminUserStr ? JSON.parse(adminUserStr) : { name: "Admin" };

  return (
    <>
      <style>{`
        .admin-topbar { 
          height: 75px; 
          background: var(--bs-body-bg, #fff); 
          border-bottom: 1px solid #E9EDF3; 
          box-shadow: 0 3px 15px rgba(3, 20, 54, .04); 
          position: sticky; 
          top: 0; 
          z-index: 100; 
        }

        .topbar-menu { 
          width: 42px; 
          height: 42px; 
          border: 0; 
          border-radius: 10px; 
          background: #F5F7FA; 
          color: #031436; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          transition: .3s ease; 
        }
        .topbar-menu:hover { background: #031436; color: #fff; }

        .topbar-action { 
          width: 42px; 
          height: 42px; 
          border: 0; 
          border-radius: 50%; 
          background: transparent; 
          color: #031436; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          transition: .3s ease; 
          position: relative; 
        }
        .topbar-action:hover { background: #FFF1F0; color: #E53935; }
        .topbar-action::after { display: none !important; }

        .notification-badge { 
          position: absolute; 
          top: -2px; 
          right: -2px; 
          min-width: 19px; 
          height: 19px; 
          padding: 0 5px; 
          border-radius: 20px; 
          background: #E53935; 
          color: white; 
          border: 2px solid white; 
          font-size: 9px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }

        .notification-menu {
          width: 320px !important;
          max-height: 400px;
          overflow-y: auto;
          border: 0 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(3,20,54,.15) !important;
          padding: 0 !important;
        }

        .notification-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          white-space: normal;
          font-size: 13px;
        }
        .notification-item.unread {
          background-color: #FFF5F4;
        }

        .profile-btn { 
          border: 0 !important; 
          background: transparent !important; 
          color: #031436 !important; 
          display: flex !important; 
          align-items: center; 
          gap: 8px; 
          padding: 5px !important; 
        }
        .profile-btn::after { display: none !important; }
        .profile-icon { font-size: 32px; color: #031436; }
        .profile-btn:hover .profile-icon { color: #E53935; }
        .profile-arrow { font-size: 10px; color: #64748B; }

        /* Dark Mode Overrides for Global Body */
        body.dark-mode {
          background-color: #0f172a !important;
          color: #f8fafc !important;
        }
        body.dark-mode .admin-topbar {
          background-color: #1e293b !important;
          border-bottom-color: #334155;
        }
        body.dark-mode .topbar-action,
        body.dark-mode .profile-btn,
        body.dark-mode .topbar-menu {
          color: #f8fafc !important;
        }
        body.dark-mode .topbar-menu {
          background-color: #334155;
        }
        body.dark-mode .notification-menu {
          background-color: #1e293b !important;
          color: #f8fafc !important;
        }
        body.dark-mode .notification-item.unread {
          background-color: #334155 !important;
          color: #fff !important;
        }
      `}</style>

      <Navbar className="admin-topbar">
        <Container fluid className="px-4">
          <div className="d-flex align-items-center gap-3 w-100">
            {/* Title / Badge */}
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-danger" style={{ fontSize: "16px", letterSpacing: "0.5px" }}>
                Jagruti NGO
              </span>
              <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill">
                Admin Panel
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              {/* --- 1. DARK / LIGHT MODE TOGGLE --- */}
              <button
                className="topbar-action"
                onClick={() => setDarkMode((prev) => !prev)}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <FaSun className="text-warning" size={18} /> : <FaMoon size={18} />}
              </button>

              {/* --- 2. NOTIFICATIONS DROPDOWN --- */}
              <Dropdown align="end">
                <Dropdown.Toggle as="button" className="topbar-action">
                  <FaBell size={19} />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-menu shadow">
                  <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <span className="fw-bold fs-6">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="btn btn-link p-0 text-decoration-none small text-danger d-flex align-items-center gap-1"
                        style={{ fontSize: "12px" }}
                      >
                        <FaCheck /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="p-3 text-center text-muted small">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`notification-item ${
                            item.unread ? "unread" : ""
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <span className="fw-semibold">
                              {item.text}
                            </span>
                          </div>
                          <div className="text-muted small">{item.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* --- 3. PROFILE DROPDOWN --- */}
              <Dropdown align="end">
                <Dropdown.Toggle className="profile-btn">
                  <FaUserCircle className="profile-icon" />
                  <span className="d-none d-md-block fw-semibold">
                    {adminUser.name || "Admin"}
                  </span>
                  <FaChevronDown className="profile-arrow" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow border-0 rounded-3">
                  <Dropdown.Item as={Link} to="/profile" className="py-2">
                    My Profile
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    onClick={handleLogout}
                    className="py-2 text-danger fw-semibold d-flex align-items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Topbar;
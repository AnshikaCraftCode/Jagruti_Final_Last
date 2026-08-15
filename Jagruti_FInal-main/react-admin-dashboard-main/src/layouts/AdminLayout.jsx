import React, { useState } from "react";
import Sidebar from "../components/Sidebar";


function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: #F7F8FC;
        }

        .admin-layout {
          width: 100%;
          min-height: 100vh;
          background: #F7F8FC;
        }

        .admin-sidebar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${collapsed ? "80px" : "260px"};
          z-index: 1050;
          transition: width 0.3s ease;
          overflow: hidden;
        }

        .admin-main {
          width: calc(100% - ${collapsed ? "80px" : "260px"});
          margin-left: ${collapsed ? "80px" : "260px"};
          min-height: 100vh;
          transition: all 0.3s ease;
          background: #F7F8FC;
        }

        .admin-content {
          width: 100%;
          padding: 35px;
        }

        @media (max-width: 768px) {
          .admin-sidebar-wrapper {
            width: ${collapsed ? "70px" : "240px"};
          }

          .admin-main {
            width: calc(100% - ${collapsed ? "70px" : "240px"});
            margin-left: ${collapsed ? "70px" : "240px"};
          }

          .admin-content {
            padding: 25px 18px;
          }
        }

        @media (max-width: 576px) {
          .admin-sidebar-wrapper {
            width: 70px;
          }

          .admin-main {
            width: calc(100% - 70px);
            margin-left: 70px;
          }

          .admin-content {
            padding: 20px 12px;
          }
        }
      `}</style>

      <div className="admin-layout">

        {/* Sidebar */}
        <aside className="admin-sidebar-wrapper">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </aside>

        {/* Main Content */}
        <div className="admin-main">
{/* 
          <Topbar /> */}

          <main className="admin-content">
            {children}
          </main>

        </div>

      </div>
    </>
  );
}

export default AdminLayout;
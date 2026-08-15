import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Dashboard.css";

import {
  FaBookOpen,
  FaUsers,
  FaHandHoldingHeart,
  FaHandsHelping,
  FaNewspaper,
  FaImages,
  FaArrowRight,
  FaHeart,
  FaGraduationCap,
  FaFemale,
  FaLeaf,
} from "react-icons/fa";

import { MdGroups } from "react-icons/md";
import AdminLayout from "../layouts/AdminLayout";

function Dashboard() {
  // ================= Dashboard Cards =================
  const stats = [
    {
      title: "Programs",
      value: "24",
      icon: <FaBookOpen />,
      color: "navy",
    },
    {
      title: "Beneficiaries",
      value: "12,450+",
      icon: <FaUsers />,
      color: "red",
    },
    {
      title: "Donations",
      value: "₹8.65L",
      icon: <FaHandHoldingHeart />,
      color: "navy",
    },
    {
      title: "Volunteers",
      value: "320+",
      icon: <MdGroups />,
      color: "red",
    },
  ];

  // ================= Quick Actions =================
  const actions = [
    {
      title: "Add Program",
      subtitle: "Create NGO Program",
      icon: <FaHandsHelping />,
      link: "/program",
      color: "navy",
    },
    {
      title: "Create Blog",
      subtitle: "Publish Article",
      icon: <FaNewspaper />,
      link: "/blog",
      color: "red",
    },
    {
      title: "Upload Gallery",
      subtitle: "Add New Photos",
      icon: <FaImages />,
      link: "/gallery",
      color: "navy",
    },
    {
      title: "Manage Donation",
      subtitle: "View & Track Donations",
      icon: <FaHandHoldingHeart />,
      link: "/donation",
      color: "red",
    },
  ];

  // ================= Foundation Highlights =================
  const highlights = [
    {
      icon: <FaGraduationCap />,
      title: "Education Support",
      desc: "Providing quality education opportunities to children.",
    },
    {
      icon: <FaFemale />,
      title: "Women Empowerment",
      desc: "Supporting women through training and self-employment.",
    },
    {
      icon: <FaHeart />,
      title: "Healthcare",
      desc: "Medical camps and health awareness initiatives.",
    },
    {
      icon: <FaLeaf />,
      title: "Environment",
      desc: "Tree plantation and environmental awareness drives.",
    },
  ];

  return (
    <AdminLayout>
      <div className="dashboard-page container-fluid">
        {/* ================= HERO ================= */}
        <div className="dashboard-hero">
          <div>
            <span className="hero-tag">ADMIN DASHBOARD</span>
            <h1>
              Welcome Back,
              <br />
              Administrator 👋
            </h1>
            <p>
              Manage Jagruti Foundation programs, donations, blogs,
              gallery and community impact from one place.
            </p>
          </div>

          <div className="hero-badge">
            <FaHeart />
            <span>Together We Create Impact</span>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="section-title mt-5">
          <h3>Quick Actions</h3>
          <p>Manage your foundation content quickly.</p>
        </div>

        <div className="row g-4">
          {actions.map((item, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <Link
                to={item.link}
                className="action-card text-decoration-none"
              >
                <div className={`action-icon ${item.color}`}>
                  {item.icon}
                </div>
                <h5>{item.title}</h5>
                <p>{item.subtitle}</p>
                <div className="action-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ================= IMPACT ================= */}
        <div className="impact-card mt-5">
          <div className="impact-left">
            <span className="impact-icon">
              <FaHeart />
            </span>
            <h2>Together, We Create Impact</h2>
            <p>
              Every donation, volunteer and initiative contributes
              towards creating a stronger, healthier and more
              empowered community.
            </p>
          </div>

          <div className="impact-right">
            <div className="impact-box">
              <h3>24</h3>
              <span>Programs</span>
            </div>

            <div className="impact-box">
              <h3>320+</h3>
              <span>Volunteers</span>
            </div>

            <div className="impact-box">
              <h3>12,450+</h3>
              <span>Beneficiaries</span>
            </div>

            <div className="impact-box">
              <h3>₹8.65L</h3>
              <span>Donations</span>
            </div>
          </div>
        </div>

        {/* ================= HIGHLIGHTS ================= */}
        <div className="section-title mt-5">
          <h3>Foundation Highlights</h3>
          <p>Major initiatives of Jagruti Foundation.</p>
        </div>

        <div className="row g-4 mb-4">
          {highlights.map((item, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div className="highlight-card">
                <div className="highlight-icon">{item.icon}</div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
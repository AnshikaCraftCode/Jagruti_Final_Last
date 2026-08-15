import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import {
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaSave,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaDesktop
} from "react-icons/fa";
import "../assets/css/Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State Handlers
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@foundation.org",
    phone: "+91 98765 43210",
    address: "Satpur MIDC, Nashik, Maharashtra, India",
  });

  const [notifications, setNotifications] = useState({
    newUser: true,
    newVolunteer: true,
    donationAlerts: true,
    programUpdates: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    theme: "Red & Navy",
    sidebarStyle: "Fixed Sidebar",
  });

  const menuItems = [
    { id: "profile", name: "Profile Settings", icon: <FaUser /> },
    { id: "notifications", name: "Notifications", icon: <FaBell /> },
    { id: "security", name: "Security", icon: <FaLock /> },
    { id: "appearance", name: "Appearance", icon: <FaPalette /> },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="settings-page">
      <Container fluid>
        {/* Header Hero */}
        <div className="settings-hero">
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="hero-label">ADMINISTRATION / SETTINGS</div>
              <h1>Account & System Settings</h1>
              <p>
                Manage your administrative account details, security preferences, and dashboard options.
              </p>
            </Col>
          </Row>
        </div>

        <Card className="settings-card">
          <Row className="g-0">
            {/* Sidebar Menu */}
            <Col md={3} lg={3}>
              <div className="settings-sidebar">
                <div className="settings-sidebar-inner">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`settings-menu ${
                        activeTab === item.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Col>

            {/* Content Panel */}
            <Col md={9} lg={9}>
              <div className="settings-content">
                {showSuccess && (
                  <Alert variant="success" className="d-flex align-items-center gap-2 mb-3 py-2 px-3 fs-6">
                    <FaCheckCircle /> Settings updated successfully!
                  </Alert>
                )}

                {/* PROFILE SETTINGS */}
                {activeTab === "profile" && (
                  <Form onSubmit={handleSave}>
                    <h4 className="settings-heading">Profile Settings</h4>
                    <p className="settings-subheading">Update your personal information and contact info.</p>

                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">First Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="settings-input"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="settings-input"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            className="settings-input"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            className="settings-input"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="settings-label">Office Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="settings-input"
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-end mt-4 pt-2 border-top">
                      <Button type="submit" className="save-button">
                        <FaSave /> Save Profile Changes
                      </Button>
                    </div>
                  </Form>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                  <Form onSubmit={handleSave}>
                    <h4 className="settings-heading">Notification Preferences</h4>
                    <p className="settings-subheading">Configure what alerts you wish to receive.</p>

                    <Row className="g-3">
                      <Col md={6}>
                        <div className="setting-box d-flex align-items-center justify-content-between">
                          <div>
                            <div className="setting-box-title">New User Registration</div>
                            <div className="setting-box-desc">Alert when a new user signs up.</div>
                          </div>
                          <Form.Check
                            type="switch"
                            checked={notifications.newUser}
                            onChange={(e) => setNotifications({ ...notifications, newUser: e.target.checked })}
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="setting-box d-flex align-items-center justify-content-between">
                          <div>
                            <div className="setting-box-title">Volunteer Registrations</div>
                            <div className="setting-box-desc">Notify on new volunteer applications.</div>
                          </div>
                          <Form.Check
                            type="switch"
                            checked={notifications.newVolunteer}
                            onChange={(e) => setNotifications({ ...notifications, newVolunteer: e.target.checked })}
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="setting-box d-flex align-items-center justify-content-between">
                          <div>
                            <div className="setting-box-title">Donation Receipts</div>
                            <div className="setting-box-desc">Instant alerts on successful payments.</div>
                          </div>
                          <Form.Check
                            type="switch"
                            checked={notifications.donationAlerts}
                            onChange={(e) => setNotifications({ ...notifications, donationAlerts: e.target.checked })}
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="setting-box d-flex align-items-center justify-content-between">
                          <div>
                            <div className="setting-box-title">Program Updates</div>
                            <div className="setting-box-desc">Receive weekly program summaries.</div>
                          </div>
                          <Form.Check
                            type="switch"
                            checked={notifications.programUpdates}
                            onChange={(e) => setNotifications({ ...notifications, programUpdates: e.target.checked })}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="text-end mt-4 pt-2 border-top">
                      <Button type="submit" className="save-button">
                        <FaSave /> Save Preferences
                      </Button>
                    </div>
                  </Form>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <Form onSubmit={handleSave}>
                    <h4 className="settings-heading">Security & Password</h4>
                    <p className="settings-subheading">Update your password to ensure account security.</p>

                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="settings-label">Current Password</Form.Label>
                          <Form.Control
                            type="password"
                            className="settings-input"
                            value={security.currentPassword}
                            onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                            placeholder="Enter current password"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">New Password</Form.Label>
                          <Form.Control
                            type="password"
                            className="settings-input"
                            value={security.newPassword}
                            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="settings-label">Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            className="settings-input"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                            placeholder="Confirm password"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-end mt-4 pt-2 border-top">
                      <Button type="submit" className="save-button">
                        <FaLock /> Update Password
                      </Button>
                    </div>
                  </Form>
                )}

                {/* APPEARANCE */}
                {activeTab === "appearance" && (
                  <Form onSubmit={handleSave}>
                    <h4 className="settings-heading">Appearance & Layout</h4>
                    <p className="settings-subheading">Customize how the administration dashboard looks to you.</p>

                    <Row className="g-3 mb-3">
                      {/* Interface Mode */}
                      <Col md={12}>
                        <div className="setting-box">
                          <div className="setting-box-title">Interface Mode</div>
                          <div className="setting-box-desc">Choose between light, dark, or system visual modes.</div>
                          <Row className="g-2">
                            <Col sm={6}>
                              <div
                                className={`preview-card d-flex align-items-center gap-2 ${!appearance.darkMode ? "selected" : ""}`}
                                onClick={() => setAppearance({ ...appearance, darkMode: false })}
                              >
                                <FaSun className="text-warning" />
                                <div>
                                  <div className="fw-bold fs-6">Light Mode</div>
                                  <div className="text-muted small">Default clear theme</div>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div
                                className={`preview-card d-flex align-items-center gap-2 ${appearance.darkMode ? "selected" : ""}`}
                                onClick={() => setAppearance({ ...appearance, darkMode: true })}
                              >
                                <FaMoon className="text-primary" />
                                <div>
                                  <div className="fw-bold fs-6">Dark Mode</div>
                                  <div className="text-muted small">Eases eye strain</div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      {/* Theme Colors */}
                      <Col md={6}>
                        <div className="setting-box">
                          <Form.Label className="settings-label">Primary Theme Color</Form.Label>
                          <Form.Select
                            className="settings-input"
                            value={appearance.theme}
                            onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                          >
                            <option>Red & Navy</option>
                            <option>Green & Navy</option>
                            <option>Purple & Navy</option>
                          </Form.Select>
                        </div>
                      </Col>

                      {/* Sidebar Style */}
                      <Col md={6}>
                        <div className="setting-box">
                          <Form.Label className="settings-label">Sidebar Navigation Style</Form.Label>
                          <Form.Select
                            className="settings-input"
                            value={appearance.sidebarStyle}
                            onChange={(e) => setAppearance({ ...appearance, sidebarStyle: e.target.value })}
                          >
                            <option>Fixed Sidebar</option>
                            <option>Collapsible Sidebar</option>
                          </Form.Select>
                        </div>
                      </Col>
                    </Row>

                    <div className="text-end mt-4 pt-2 border-top">
                      <Button type="submit" className="save-button">
                        <FaSave /> Save Layout Settings
                      </Button>
                    </div>
                  </Form>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
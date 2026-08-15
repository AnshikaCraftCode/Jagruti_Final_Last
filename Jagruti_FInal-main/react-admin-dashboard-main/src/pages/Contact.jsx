import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  
  Table,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaSearch,
  FaEye,
  FaTrashAlt,
  FaPhoneAlt,
  FaInbox,
  FaUsers,
  FaClock,
  FaFilter,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout"; 
import "../assets/css/Contact.css";

const getInitials = (Name = "") => {
  if (!Name) return "?";
  return Name.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const categories = [
    "All",
    "Contact",
    "Volunteer",
  ];

  const getMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const resContact = await axios.get("http://localhost:8000/getContact", config);
      const contactList = resContact.data?.data || (Array.isArray(resContact.data) ? resContact.data : []);
      let allMsgs = Array.isArray(contactList) ? contactList : [];

      try {
        const resVol = await axios.get("http://localhost:8000/getVolunteer", config);
        const volList = resVol.data?.volunteers || resVol.data?.data || [];
        if (Array.isArray(volList)) {
          const volMsgs = volList.map((v) => ({
            _id: v._id,
            Name: v.Name || v.fullName || v.name,
            Email: v.Email || v.email,
            Phone: v.Phone || v.phone,
            City: v.City || v.city,
            Subject: v.Subject || v.interest || "Volunteer Application",
            Message: v.Message || v.message || "Wants to volunteer for Jagruti Foundation.",
            type: "Volunteer",
            createdAt: v.createdAt,
          }));
          allMsgs = [...allMsgs, ...volMsgs];
        }
      } catch (volErr) {
        console.log("No separate volunteer endpoint data:", volErr);
      }

      setMessages(allMsgs);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      (message.Name || "").toLowerCase().includes(searchText) ||
      (message.Email || "").toLowerCase().includes(searchText) ||
      (message.Subject || "").toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      (category === "Contact" && (message.type || "").toLowerCase() === "contact") ||
      (category === "Volunteer" && (message.type || "").toLowerCase() === "volunteer");

    return matchesSearch && matchesCategory;
  });

  const deleteMessage = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const targetMsg = messages.find((m) => m._id === deleteId);

      if (targetMsg?.type === "Volunteer") {
        await axios.delete(`http://localhost:8000/deleteVolunteer/${deleteId}`, config);
      } else {
        await axios.delete(`http://localhost:8000/deleteContact/${deleteId}`, config);
      }

      setMessages((prev) => prev.filter((item) => item._id !== deleteId));
      setDeleteId(null);
      setSelectedMessage(null);
      alert("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Unable to delete message.");
    }
  };

 const openMessage = async (message) => {
  try {
    const token = localStorage.getItem("adminToken");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

    if (message.type !== "Volunteer") {
      await axios.put(
        `http://localhost:8000/markAsRead/${message._id}`,
        {},
        config
      );
    }

    getMessages();

    setSelectedMessage({
      ...message,
      status: "Read",
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <AdminLayout>
      <div className="contact-page">
        {/* HERO HEADER */}
        <div className="contact-hero">
          <div className="hero-content">
            <div className="hero-icon">
              <FaEnvelope />
            </div>
            <div>
              <span className="hero-label">COMMUNICATION CENTER</span>
              <h1>Contact Messages</h1>
              <p>
                Manage and review enquiries received from your website visitors.
              </p>
            </div>
          </div>

          <div className="hero-status">
            <FaCheckCircle />
            <div>
              <strong>Inbox Active</strong>
              <span>Receiving messages</span>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <Row className="contact-stats">
          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon blue">
                  <FaInbox />
                </div>
                <div className="stat-info">
                  <span>Total Messages</span>
                  <h2>{messages.length}</h2>
                </div>
                <div className="stat-decoration" />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon red">
                  <FaEnvelope />
                </div>
                <div className="stat-info">
                  <span>New Enquiries</span>
                  <h2>{messages.filter(msg => msg.status === "New").length}</h2>
                </div>
                <div className="stat-decoration red-decoration" />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon green">
                  <FaClock />
                </div>
                <div className="stat-info">
                  <span>Today's Messages</span>
                  <h2>
                    {
                      messages.filter((msg) => {
                        return (
                          new Date(msg.createdAt).toDateString() ===
                          new Date().toDateString()
                        );
                      }).length
                    }
                  </h2>
                </div>
                <div className="stat-decoration green-decoration" />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} xl={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon purple">
                  <FaUsers />
                </div>
                <div className="stat-info">
                  <span>People Reached</span>
                  <h2>{new Set(messages.map((msg) => msg.Email)).size}</h2>
                </div>
                <div className="stat-decoration purple-decoration" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* MAIN INBOX CARD */}
        <Card className="inbox-card">
          {/* TOP BAR */}
          <div className="inbox-header">
            <div className="inbox-heading">
              <div className="inbox-title-icon">
                <FaInbox />
              </div>
              <div>
                <h3>Message Inbox</h3>
                <p>{filteredMessages.length} enquiries available</p>
              </div>
            </div>

            <div className="inbox-search">
              <FaSearch />
              <Form.Control
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} type="button">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* FILTERS */}
          <div className="filter-bar">
            <div className="filter-label">
              <FaFilter />
              Filter:
            </div>
            <div className="filter-buttons">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active-filter" : ""}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="table-responsive contact-table-container">
            {filteredMessages.length > 0 ? (
              <Table hover className="contact-table align-middle border-0">
                <thead>
                  <tr>
                    <th style={{width: "28%"}}>SENDER</th>
                    <th style={{width: "57%"}}>SUBJECT & PREVIEW</th>
                    <th className="text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((message) => (
                    <tr key={message._id}>
                      {/* Sender Details */}
                      <td>
                        <div className="sender-cell">
                          <div className="sender-avatar">
                            {getInitials(message.Name)}
                          </div>
                          <div className="sender-info">
                            <span className="sender-name">
                              {message.Name || "Unknown"}
                            </span>
                            <span className="sender-email">
                              {message.Email || "No Email"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Subject and Message Preview */}
                      <td>
                        <div className="subject-cell">
                          <span className="message-subject">
                            {message.Subject || "No Subject"}
                          </span>
                          <span className="message-preview">
                            {message.Message || message.message || "No content available."}
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="text-end action-column">
                        <div className="action-buttons-group">
                          <Button
                            className="view-message"
                            onClick={() => openMessage(message)}
                            title="View Message"
                          >
                            <FaEye />
                            <span>View</span>
                          </Button>
                          <Button
                            className="delete-message"
                            onClick={() => setDeleteId(message._id)}
                            title="Delete Message"
                          >
                            <FaTrashAlt />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="no-messages">
                <div className="no-message-icon">
                  <FaEnvelope />
                </div>
                <h4>No Messages Found</h4>
                <p>Try changing your search query or selected filter.</p>
              </div>
            )}
          </div>
        </Card>

        {/* VIEW MESSAGE MODAL */}
        <Modal
          show={!!selectedMessage}
          onHide={() => setSelectedMessage(null)}
          centered
          size="lg"
        >
          {selectedMessage && (
            <>
              <Modal.Header closeButton>
                <div>
                  <span className="modal-label">CONTACT ENQUIRY</span>
                  <Modal.Title>{selectedMessage.Subject}</Modal.Title>
                </div>
              </Modal.Header>

              <Modal.Body>
                <div className="modal-sender">
                  <div className="modal-avatar">
                    {getInitials(selectedMessage.Name)}
                  </div>
                  <div>
                    <h5>{selectedMessage.Name}</h5>
                    <span>{selectedMessage.Email}</span>
                  </div>
                </div>

                <div className="modal-details">
                  <span>
                    <FaEnvelope />
                    {selectedMessage.Email}
                  </span>
                  {selectedMessage.Phone && (
                    <span>
                      <FaPhoneAlt />
                      {selectedMessage.Phone}
                    </span>
                  )}
                </div>

                <div className="full-message">
                  <label>MESSAGE</label>
                  <p>
                    {selectedMessage.Message || selectedMessage.message || "No message content."}
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  className="close-modal"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                <Button
                  className="delete-modal"
                  onClick={() => setDeleteId(selectedMessage._id)}
                >
                  <FaTrashAlt />
                  Delete Message
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>

        {/* DELETE MODAL */}
        <Modal
          show={deleteId !== null}
          onHide={() => setDeleteId(null)}
          centered
          size="sm"
        >
          <Modal.Body className="delete-confirmation">
            <div className="delete-confirm-icon">
              <FaTrashAlt />
            </div>
            <h4>Delete Message?</h4>
            <p>This message will be permanently removed from your inbox.</p>
            <div className="delete-confirm-actions">
              <Button
                onClick={() => setDeleteId(null)}
                className="cancel-delete"
              >
                Cancel
              </Button>
              <Button onClick={deleteMessage} className="confirm-delete">
                Delete
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </AdminLayout>
  );
}

export default Contact;
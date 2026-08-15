import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaSearch,
  FaTimes,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";
import "../assets/css/Donation.css";

// Sample Donation Data
const donationsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    amount: "₹5,000",
    transactionId: "TXN20260729001",
    date: "15 July 2026",
    time: "10:42 AM",
    category: "Education",
    message:
      "Happy to contribute towards the education programme and support the children.",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@gmail.com",
    phone: "+91 91234 56789",
    amount: "₹10,000",
    transactionId: "TXN20260728002",
    date: "20 August 2026",
    time: "04:15 PM",
    category: "Education",
    message:
      "I am glad to support the wonderful work being done by your foundation.",
  },
  {
    id: 3,
    name: "Amit Joshi",
    email: "amit@gmail.com",
    phone: "+91 99887 76655",
    amount: "₹2,500",
    transactionId: "TXN20260727003",
    date: "10 June 2026",
    time: "11:20 AM",
    category: "Education",
    message:
      "Keep doing great work for the community. Best wishes to the entire team.",
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    email: "sneha@gmail.com",
    phone: "+91 98761 23456",
    amount: "₹7,500",
    transactionId: "TXN20260726004",
    date: "25 July 2026",
    time: "09:35 AM",
    category: "Women Empowerment",
    message:
      "I would like to contribute towards your community development programmes.",
  },
  {
    id: 5,
    name: "Karan Verma",
    email: "karan@gmail.com",
    phone: "+91 98112 23344",
    amount: "₹3,000",
    transactionId: "TXN20260725005",
    date: "05 August 2026",
    time: "02:10 PM",
    category: "Healthcare",
    message: "Supporting the medical awareness camp.",
  },
  {
    id: 6,
    name: "Ananya Roy",
    email: "ananya@gmail.com",
    phone: "+91 97766 55443",
    amount: "₹1,200",
    transactionId: "TXN20260724006",
    date: "12 June 2026",
    time: "06:50 PM",
    category: "Environment",
    message: "Planting trees for a better future.",
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Donations() {
  const [donations] = useState(donationsData);
  const [search, setSearch] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);

  const filteredDonations = donations.filter((donation) => {
    const searchText = search.toLowerCase();
    return (
      donation.name.toLowerCase().includes(searchText) ||
      donation.email.toLowerCase().includes(searchText) ||
      donation.transactionId.toLowerCase().includes(searchText) ||
      donation.category.toLowerCase().includes(searchText)
    );
  });

  return (
   <>
   <AdminLayout>
    <div className="donations-container">
      {/* =========================================
          HERO BANNER SECTION (MATCHED TO IMAGE)
      ========================================= */}
      <div className="hero-banner">
        <div className="hero-banner-content">
          <span className="hero-breadcrumb">ADMINISTRATION / DONATIONS</span>
          <h1 className="hero-title">Manage Foundation Donations</h1>
          <p className="hero-subtitle">
            Organize, edit, and monitor all your received contributions from one unified table view.
          </p>
        </div>
        <button className="btn-add-new">
          <FaPlus /> Add New Donation
        </button>
      </div>

      {/* =========================================
          SEARCH BAR
      ========================================= */}
      <div className="table-search-bar">
        <div className="search-input-wrapper">
          <FaSearch />
          <Form.Control
            type="text"
            placeholder="Search donor, email, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")}>
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* =========================================
          DONATIONS TABLE
      ========================================= */}
      <div className="custom-table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>SR.</th>
              <th>DONOR DETAILS</th>
              <th>AMOUNT & TXN ID</th>
              <th>CATEGORY</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation, index) => (
                <tr key={donation.id}>
                  {/* SR NO */}
                  <td className="sr-col">{index + 1}</td>

                  {/* DONOR INFO */}
                  <td className="details-col">
                    <div className="donor-cell">
                      <div className="avatar-circle">
                        {getInitials(donation.name)}
                      </div>
                      <div className="donor-meta">
                        <span className="donor-title">{donation.name}</span>
                        <span className="donor-sub">{donation.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* AMOUNT AND TRANSACTION ID */}
                  <td className="amount-col">
                    <div className="amount-meta">
                      <span className="amount-text">{donation.amount}</span>
                      <span className="txn-sub">{donation.transactionId}</span>
                    </div>
                  </td>

                  {/* CATEGORY PILL BADGE */}
                  <td className="category-col">
                    <span
                      className={`category-pill ${donation.category
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {donation.category}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="date-col">
                    <div className="date-cell">
                      <FaCalendarAlt className="date-icon" />
                      <span>{donation.date}</span>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="actions-col">
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => setSelectedDonation(donation)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button className="btn-action btn-edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="btn-action btn-delete" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-records-cell">
                  No donation records match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================================
          VIEW DETAILS MODAL
      ========================================= */}
      <Modal
        show={!!selectedDonation}
        onHide={() => setSelectedDonation(null)}
        centered
        size="lg"
      >
        {selectedDonation && (
          <>
            <Modal.Header closeButton>
              <div>
                <span className="modal-label">DONATION DETAILS</span>
                <Modal.Title>Donation Information</Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="modal-donor">
                <div className="modal-donor-avatar">
                  {getInitials(selectedDonation.name)}
                </div>
                <div>
                  <h4>{selectedDonation.name}</h4>
                  <span>{selectedDonation.email}</span>
                </div>
              </div>

              <div className="donation-details-grid">
                <div className="detail-box">
                  <span>DONATION AMOUNT</span>
                  <strong>{selectedDonation.amount}</strong>
                </div>

                <div className="detail-box">
                  <span>TRANSACTION ID</span>
                  <strong>{selectedDonation.transactionId}</strong>
                </div>

                <div className="detail-box">
                  <span>PHONE NUMBER</span>
                  <strong>{selectedDonation.phone}</strong>
                </div>

                <div className="detail-box">
                  <span>DONATION DATE</span>
                  <strong>{selectedDonation.date}</strong>
                </div>
              </div>

              <div className="modal-payment">
                <FaCheckCircle />
                <div>
                  <strong>Payment Completed</strong>
                  <span>Received via Online Gateway ({selectedDonation.time})</span>
                </div>
              </div>

              <div className="donor-message">
                <label>DONOR MESSAGE</label>
                <p>{selectedDonation.message}</p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setSelectedDonation(null)}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
    </AdminLayout>
    </>
  );
}

export default Donations;
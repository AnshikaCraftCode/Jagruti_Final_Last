import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLaptopCode,
  FaUserGraduate,
  FaBriefcase,
  FaHandHoldingHeart,
} from "react-icons/fa";
import logo from "../assets/Images/logo.jpeg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        /* ================= FOOTER ================= */
        .footer-section {
          position: relative;
          overflow: hidden;
          background: #071f4d;
          color: #fff;
          padding: 85px 0 25px;
          font-family: 'Poppins', sans-serif;
        }

        /* ================= WAVE ================= */
        .footer-wave {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          z-index: 1;
        }

        .footer-wave svg {
          display: block;
          width: 100%;
          height: 82px;
        }

        .footer-content {
          position: relative;
          z-index: 2;
        }

        /* ================= HEADINGS ================= */
        .footer-section h5 {
          position: relative;
          display: inline-block;
          margin: 0 0 24px;
          padding-bottom: 10px;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.3px;
        }

        .footer-section h5::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 3px;
          background: #d82120;
          border-radius: 2px;
        }

        /* ================= LINKS ================= */
        .footer-link {
          padding: 7px 0;
          color: #c4d5ed;
          font-size: 14.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .footer-link:hover {
          color: #ffffff;
          transform: translateX(6px);
        }

        /* ================= CONTACT ================= */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .contact-item > svg {
          color: #d82120;
          font-size: 18px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .contact-item strong {
          display: block;
          margin-bottom: 3px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }

        .contact-item p {
          margin: 0;
          color: #c4d5ed;
          font-size: 14px;
          line-height: 1.6;
        }

        /* ================= SOCIAL ICONS ================= */
        .social-icons {
          display: flex;
          gap: 14px;
          margin-top: 22px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          padding: 10px;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .facebook { background: #1877f2; }
        .instagram {
          background: linear-gradient(
            45deg,
            #feda75,
            #fa7e1e,
            #d62976,
            #962fbf,
            #4f5bd5
          );
        }
        .linkedin { background: #0a66c2; }
        .youtube { background: #ff0000; }

        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        /* ================= BOTTOM ================= */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          margin-top: 35px;
          padding-top: 20px;
          text-align: center;
          color: #9cb3d6;
          font-size: 13.5px;
        }

        /* ================= TABLET & MOBILE ================= */
        @media (max-width: 991px) {
          .footer-section { padding-top: 95px; }
          .footer-column { margin-bottom: 25px; }
        }

        @media (max-width: 575px) {
          .footer-section { padding-top: 85px; }
          .footer-about { text-align: center; }
          .footer-logo { justify-content: center; }
          .footer-column { text-align: center; }

          .footer-section h5::after {
            left: 50%;
            transform: translateX(-50%);
          }

          .footer-link {
            justify-content: center;
          }

          .footer-link:hover {
            transform: none;
          }

          .contact-item {
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
            text-align: left;
          }

          .social-icons { justify-content: center; }
        }
      `}</style>

      <footer className="footer-section">
        {/* CURVED WAVE */}
        <div className="footer-wave">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="
                M0,0
                L0,62
                C60,60 120,58 180,58
                C250,58 330,59 410,61
                C490,64 560,70 640,78
                C720,87 790,96 865,102
                C940,108 1015,108 1095,102
                C1175,96 1250,84 1320,72
                C1375,63 1410,58 1440,56
                L1440,0
                Z
              "
            />
          </svg>
        </div>

        <Container className="footer-content">
          <Row className="g-4">
            {/* LOGO & DESCRIPTION */}
            <Col lg={3} md={6} className="footer-column">
              <div className="footer-about">
                <div className="footer-logo d-flex align-items-center gap-3">
                  <img
                    src={logo}
                    alt="Jagruti Foundation Logo"
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      background: "#fff",
                      padding: "4px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: "21px", fontWeight: 700, margin: 0 }}>
                      Jagruti Foundation
                    </h4>
                    <p style={{ color: "#d82120", fontSize: "14px", fontWeight: 600, margin: "2px 0 0" }}>
                      सेवा ही संकल्प
                    </p>
                  </div>
                </div>

                <p style={{ color: "#c4d5ed", fontSize: "14px", lineHeight: 1.7, margin: "18px 0 0" }}>
                  Empowering lives through skill development, education, healthcare, and community care. Together, we build a brighter tomorrow for every individual.
                </p>

                <div className="social-icons">
                  <FaFacebookF className="social-icon facebook" title="Facebook" />
                  <FaInstagram className="social-icon instagram" title="Instagram" />
                  <FaLinkedinIn className="social-icon linkedin" title="LinkedIn" />
                  <FaYoutube className="social-icon youtube" title="YouTube" />
                </div>
              </div>
            </Col>

            {/* QUICK LINKS */}
            <Col lg={3} md={6} className="footer-column">
              <h5>Quick Links</h5>
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Programs", path: "/program" },
                { name: "Blog & News", path: "/blog" },
                { name: "Photo Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contact" },
                { name: "Donate Now", path: "/donate" },
              ].map((item) => (
                <div
                  className="footer-link"
                  key={item.name}
                  onClick={() => navigate(item.path)}
                >
                  <span style={{ color: "#d82120", marginRight: 10, fontWeight: 700, fontSize: "16px" }}>
                    ›
                  </span>
                  {item.name}
                </div>
              ))}
            </Col>

            {/* OUR FOCUS AREAS */}
            <Col lg={3} md={6} className="footer-column">
              <h5>Focus Programs</h5>
              {[
                { name: "Education & Learning", path: "/program" },
                { name: "Skill & Vocational Training", path: "/program" },
                { name: "Women Empowerment", path: "/program" },
                { name: "Healthcare & Awareness", path: "/program" },
                { name: "Environmental Conservation", path: "/program" },
                { name: "Community Welfare", path: "/program" },
              ].map((item) => (
                <div
                  className="footer-link"
                  key={item.name}
                  onClick={() => navigate(item.path)}
                >
                  <span style={{ color: "#d82120", marginRight: 10, fontWeight: 700, fontSize: "16px" }}>
                    ›
                  </span>
                  {item.name}
                </div>
              ))}
            </Col>

            {/* CONTACT INFO */}
            <Col lg={3} md={6} className="footer-column">
              <h5>Contact Us</h5>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <strong>Location Address</strong>
                  <p>
                    Anand Chhaya Apartment, Near Satpur Colony, Satpur, Nashik–422007, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <FaPhoneAlt />
                <div>
                  <strong>Phone Contact</strong>
                  <p>+91 98765 43210 / +91 01234 56789</p>
                </div>
              </div>

              <div className="contact-item">
                <FaEnvelope />
                <div>
                  <strong>Email Support</strong>
                  <p>info@jagrutifoundation.org</p>
                </div>
              </div>
            </Col>
          </Row>

          {/* COPYRIGHT */}
          <div className="footer-bottom">
            © {new Date().getFullYear()} Jagruti Foundation. All Rights Reserved. Empowering Communities with Care & Compassion.
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
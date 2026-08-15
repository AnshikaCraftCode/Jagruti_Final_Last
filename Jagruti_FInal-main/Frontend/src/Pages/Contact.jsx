import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import {
  BsTelephoneFill,
  BsEnvelopeFill,
  BsGeoAltFill,
  BsClockFill,
  BsSendFill,
  BsPeopleFill,
  BsArrowRight,
  BsCursorFill,
  BsChatDotsFill,
  BsCheckCircleFill,
} from "react-icons/bs";

import heroImg from "../assets/Images/contact-hero.jpeg";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openVolunteer || location.hash === "#volunteer") {
      setShowForm(true);
    }
  }, [location]);

  //Form 
  const [Name,SetName] = useState("");
  const [Email,SetEmail] = useState("");
  const [Phone,SetPhone] = useState("");
  const [Subject,SetSubject] = useState("");
  const [Message,SetMessage] = useState("");
  const [loading , setloading] = useState(false);

  //volunteer
const [volName, setVolName] = useState("");
const [volEmail, setVolEmail] = useState("");
const [volPhone, setVolPhone] = useState("");
const [volCity, setVolCity] = useState("");
const [volInterest, setVolInterest] = useState("");
const [volMessage, setVolMessage] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setloading(true);

    const payload = {
      Name,
      Email,
      Phone,
      Subject,
      Message,
      type: "Contact",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/addContact",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        alert("Message sent successfully!");
        SetName("");
        SetEmail("");
        SetPhone("");
        SetSubject("");
        SetMessage("");
      } else {
        alert("Something went wrong! Please try again later.");
      }
    }
    catch (error) {
      console.log(error);
      alert("An error occurred while sending the message.");
    }
    finally {
      setloading(false);
    }
  }

  const handleVolunteerSubmit = async () => {
  setloading(true);

  const newData = {
    Name: volName,
    Email: volEmail,
    Phone: volPhone,
    Subject: volInterest,
    Message: volMessage,
    City: volCity,
    type: "Volunteer",
  };

  try {
    const response = await axios.post(
      "http://localhost:8000/addContact",
      newData
    );

    if (response.status === 200 || response.status === 201) {
      alert("Volunteer Registered Successfully!");

      setVolName("");
      setVolEmail("");
      setVolPhone("");
      setVolCity("");
      setVolInterest("");
      setVolMessage("");

      setShowForm(false);
    }
  } catch (error) {
    console.log(error);
    alert("Unable to register volunteer.");
  } finally {
    setloading(false);
  }
};

  const contactInfo = [
    {
      icon: <BsGeoAltFill />,
      title: "Our Location",
      text: (
        <>
          Near Satpur Colony, Satpur,
          <br />
          Nashik - 422007, Maharashtra, India
        </>
      ),
    },
    {
      icon: <BsTelephoneFill />,
      title: "Phone Number",
      text: (
        <>
          +91 0123456789
          <br />
          +91 9876543210
        </>
      ),
    },
    {
      icon: <BsEnvelopeFill />,
      title: "Email Address",
      text: (
        <>
          jagrutifoundation@gmail.com
          <br />
          info@jagrutifoundation.org
        </>
      ),
    },
    {
      icon: <BsClockFill />,
      title: "Office Hours",
      text: (
        <>
          Monday - Saturday
          <br />
          10:00 AM - 6:00 PM
        </>
      ),
    },
  ];

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{
          margin:0;
          background:#F5F6FB;
          color:#152451;
          font-family:"Poppins","Segoe UI",Arial,sans-serif;
          overflow-x:hidden
        }

        /* ================= HERO ================= */

        .contact-hero{
          min-height:100vh;
          padding:120px 0 50px;
          position:relative;
          display:flex;
          align-items:center;
          overflow:hidden;
          background:#071638
        }

        .hero-bg{
          position:absolute;
          inset:0;
          background:center/cover no-repeat;
          transform:scale(1.03);
          animation:heroZoom 12s ease-in-out infinite alternate
        }

        .hero-bg:after{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(90deg,
              rgba(3,20,54,.96) 0%,
              rgba(3,20,54,.86) 38%,
              rgba(100, 121, 163, 0.48) 70%,
              rgba(60, 80, 120, 0.2) 100%);
        }

        @keyframes heroZoom{
          from{transform:scale(1.03)}
          to{transform:scale(1.08)}
        }

        .hero-content{
          position:relative;
          z-index:2;
          max-width:720px;
          color:#fff
        }

        .hero-badge{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:9px 17px;
          margin-bottom:20px;
          border:1px solid rgba(255,255,255,.25);
          border-radius:50px;
          background:rgba(255,255,255,.1);
          backdrop-filter:blur(12px);
          color:#fff;
          font-size:.82rem;
          font-weight:600
        }

        .hero-badge span{
          width:8px;
          height:8px;
          border-radius:50%;
          background:#ED1111;
          box-shadow:0 0 0 5px rgba(237,17,17,.18)
        }

        .hero-content h1{
          margin:0;
          font-size:clamp(2.8rem,6vw,5.5rem);
          line-height:1.02;
          font-weight:800;
          letter-spacing:-2px;
          color:#fff
        }

        .hero-content h1 span{
          color:#FF4B4B
        }

        .hero-description{
          max-width:620px;
          margin:24px 0 30px;
          color:#E2E8F0;
          font-size:1.02rem;
          line-height:1.8
        }

        .hero-actions{
          display:flex;
          gap:14px;
          flex-wrap:wrap;
          margin-bottom:35px
        }

        .hero-primary,
        .hero-secondary{
          padding:12px 25px!important;
          border-radius:50px!important;
          font-weight:700!important;
          transition:.3s!important
        }

        .hero-primary{
          background:#ED1111!important;
          border-color:#ED1111!important;
          box-shadow:0 10px 25px rgba(237,17,17,.25)
        }

        .hero-primary:hover{
          background:#c90808!important;
          transform:translateY(-4px)
        }

        .hero-secondary{
          color:#fff!important;
          background:rgba(255,255,255,.1)!important;
          border:1px solid rgba(255,255,255,.4)!important;
          backdrop-filter:blur(10px)
        }

        .hero-secondary:hover{
          background:#fff!important;
          color:#252075!important;
          transform:translateY(-4px)
        }

        /* HERO CONTACT MINI CARDS */

        .hero-info{
          display:flex;
          flex-wrap:wrap;
          gap:12px
        }

        .hero-info-card{
          display:flex;
          align-items:center;
          gap:11px;
          padding:11px 15px;
          border:1px solid rgba(255,255,255,.16);
          border-radius:15px;
          background:rgba(255,255,255,.09);
          backdrop-filter:blur(14px);
          transition:.3s
        }

        .hero-info-card:hover{
          background:rgba(255,255,255,.16);
          transform:translateY(-4px)
        }

        .hero-info-icon{
          width:38px;
          height:38px;
          flex-shrink:0;
          display:grid;
          place-items:center;
          border-radius:11px;
          background:#ED1111;
          color:#fff
        }

        .hero-info-card strong{
          display:block;
          color:#fff;
          font-size:.85rem
        }

        .hero-info-card small{
          color:#D7DCE8;
          font-size:.75rem
        }

        /* FLOATING HERO CARD */

        .hero-floating-card{
          position:absolute;
          z-index:3;
          right:7%;
          bottom:10%;
          width:250px;
          padding:18px;
          border:1px solid rgba(255,255,255,.25);
          border-radius:22px;
          background:rgba(255,255,255,.12);
          backdrop-filter:blur(18px);
          box-shadow:0 20px 50px rgba(0,0,0,.25);
          color:#fff;
          animation:floatCard 4s ease-in-out infinite
        }

        @keyframes floatCard{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }

        .floating-icon{
          width:45px;
          height:45px;
          display:grid;
          place-items:center;
          margin-bottom:12px;
          border-radius:14px;
          background:#ED1111;
          font-size:1.2rem
        }

        .hero-floating-card h6{
          margin:0 0 5px;
          color:#fff;
          font-weight:800
        }

        .hero-floating-card p{
          margin:0;
          color:#E2E8F0;
          font-size:.78rem;
          line-height:1.5
        }

        /* ================= COMMON ================= */

        .contact-info-card,
        .contact-form-box,
        .find-box,
        .contact-map{
          transition:.35s
        }

        .contact-info-card:hover{
          transform:translateY(-5px);
          box-shadow:0 14px 28px rgba(37,32,117,.12)!important
        }

        .contact-form-box:hover,
        .find-box:hover{
          box-shadow:0 12px 30px rgba(37,32,117,.09)!important
        }

        .contact-btn,
        .contact-red-btn,
        .join-btn{
          transition:.3s!important
        }

        .contact-btn:hover,
        .join-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 22px rgba(37,32,117,.25)!important
        }

        .contact-red-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 25px rgba(237,17,17,.3)!important
        }

        /* ================= SOCIAL ================= */

        .contact-social{
          width:40px;
          height:40px;
          border-radius:13px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-size:1.15rem;
          cursor:pointer;
          transition:.3s;
          box-shadow:0 5px 10px rgba(0,0,0,.12)
        }

        .contact-social:hover{
          transform:translateY(-5px) scale(1.08)
        }

        .facebook{background:#1877F2;color:#fff}
        .instagram{background:linear-gradient(145deg,#F58529,#DD2A7B,#8134AF);color:#fff}
        .youtube{background:#E60000;color:#fff}
        .linkedin{background:#0A66C2;color:#fff}

        /* ================= FORM ================= */

        .contact-input{
          transition:.3s!important
        }

        .contact-input:focus{
          border-color:#252075!important;
          box-shadow:0 0 0 .18rem rgba(37,32,117,.1)!important
        }

        /* ================= MAP ================= */

        .contact-map:hover{
          transform:translateY(-4px);
          box-shadow:0 14px 30px rgba(0,0,0,.14)!important
        }

        /* ================= CTA ================= */

        .cta-box{
          position:relative;
          overflow:hidden;
          background:linear-gradient(120deg,#0B1F52,#252075,#393589);
          transition:.35s
        }

        .cta-box:after{
          content:"";
          position:absolute;
          width:220px;
          height:220px;
          border-radius:50%;
          background:rgba(237,17,17,.12);
          right:-70px;
          top:-100px
        }

        .cta-box:hover{
          transform:translateY(-3px)
        }

        /* ================= RESPONSIVE ================= */

        @media(max-width:991px){
          .contact-hero{
            min-height:auto;
            padding:140px 0 70px
          }

          .hero-content{
            max-width:850px;
            margin:auto
          }

          .hero-floating-card{
            position:relative;
            right:auto;
            bottom:auto;
            width:100%;
            max-width:350px;
            margin:45px auto 0
          }
        }

        @media(max-width:767px){
          .contact-hero{
            padding:115px 0 50px;
            text-align:center
          }

          .hero-content{
            padding:0 7%
          }

          .hero-content h1{
            font-size:clamp(2.5rem,12vw,4rem);
            letter-spacing:-1px
          }

          .hero-description{
            font-size:.92rem;
            margin:20px auto 25px
          }

          .hero-actions{
            justify-content:center
          }

          .hero-info{
            justify-content:center
          }

          .hero-info-card{
            text-align:left
          }

          .hero-floating-card{
            text-align:left
          }

          .contact-info-card{
            padding:5%!important
          }

          .contact-form-box{
            padding:7%!important
          }

          .cta-box{
            text-align:center;
            padding:8% 6%!important
          }

          .cta-content{
            flex-direction:column;
            text-align:center
          }

          .join-btn{
            width:100%
          }
        }

        @media(max-width:575px){
          .contact-hero{
            padding-top:105px
          }

          .hero-content h1{
            font-size:2.5rem
          }

          .hero-actions{
            flex-direction:column
          }

          .hero-primary,
          .hero-secondary{
            width:100%
          }

          .hero-info{
            flex-direction:column
          }

          .hero-info-card{
            width:100%;
            justify-content:flex-start
          }

          .contact-form-box{
            padding:8% 6%!important
          }

          .find-box{
            padding:7%!important
          }

          .contact-map{
            min-height:220px!important
          }
        }
      `}</style>

      {/* ================= MODERN HERO ================= */}

      <section
        className="contact-hero"
        id="contact-hero"
      >
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroImg})` }}
        />

        <Container className="position-relative">
          <div className="hero-content">

           

            <h1>
              Let's Connect &
              <br />
              <span>Create Change.</span>
            </h1>

            <p className="hero-description">
              Have a question, suggestion, or want to collaborate
              with us? We would love to hear from you. Reach out
              and become a part of our journey towards creating
              stronger and more empowered communities.
            </p>

           

            <div className="hero-info">

              <div className="hero-info-card">
                <div className="hero-info-icon">
                  <BsTelephoneFill />
                </div>

                <div>
                  <strong>Call Us</strong>
                  <small>+91 0123456789</small>
                </div>
              </div>

              <div className="hero-info-card">
                <div className="hero-info-icon">
                  <BsEnvelopeFill />
                </div>

                <div>
                  <strong>Email Us</strong>
                  <small>jagrutifoundation@gmail.com</small>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* ================= CONTACT INFORMATION ================= */}

      <section
        style={{
          background: "#F5F5FC",
          padding: "4% 0",
        }}
      >
        <Container>
          <Row className="gy-4">

            <Col lg={5}>
              <h2
                style={{
                  color: "#252075",
                  fontWeight: "800",
                  fontSize: "clamp(1.8rem,3vw,2.5rem)",
                }}
              >
                Our{" "}
                <span style={{ color: "#ED1111" }}>
                  Contact
                </span>{" "}
                Information
              </h2>

              <div
                style={{
                  width: "55px",
                  height: "3px",
                  background: "#ED1111",
                  margin: "3% 0 5%",
                }}
              />

              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="contact-info-card"
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    padding: "3.5%",
                    marginBottom: "3%",
                    display: "flex",
                    alignItems: "center",
                    gap: "5%",
                    boxShadow: "0 5px 15px rgba(0,0,0,.05)",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      flexShrink: 0,
                      borderRadius: "15px",
                      background:
                        index % 2 === 0
                          ? "rgba(37,32,117,.08)"
                          : "rgba(237,17,17,.08)",
                      color:
                        index % 2 === 0
                          ? "#252075"
                          : "#ED1111",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h6
                      style={{
                        color: "#252075",
                        fontWeight: "800",
                        marginBottom: "2%",
                      }}
                    >
                      {item.title}
                    </h6>

                    <div
                      style={{
                        color: "#777",
                        fontSize: ".85rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7%",
                  marginTop: "5%",
                  flexWrap: "wrap",
                }}
              >
                <strong
                  style={{
                    color: "#252075",
                    fontSize: "1.15rem",
                  }}
                >
                  Follow Us
                </strong>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span className="contact-social facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </span>

                  <span className="contact-social instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </span>

                  <span className="contact-social youtube">
                    <FontAwesomeIcon icon={faYoutube} />
                  </span>

                  <span className="contact-social linkedin">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </span>
                </div>
              </div>
            </Col>

            {/* ================= MESSAGE FORM ================= */}

            <Col lg={7} id="send-message">
              <div
                className="contact-form-box"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "5%",
                  boxShadow: "0 5px 20px rgba(0,0,0,.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3%",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg,#252075,#393589)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <BsChatDotsFill size={21} />
                  </div>

                  <h2
                    style={{
                      color: "#252075",
                      fontWeight: "800",
                      fontSize: "clamp(1.6rem,3vw,2.3rem)",
                      margin: 0,
                    }}
                  >
                    Send Us a{" "}
                    <span style={{ color: "#ED1111" }}>
                      Message
                    </span>
                  </h2>
                </div>

                <div
                  style={{
                    width: "55px",
                    height: "3px",
                    background: "#ED1111",
                    margin: "3% 0 5%",
                  }}
                />

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">

                    <Col md={6}>
                      <FloatingLabel
                        controlId="contactName"
                        label="Your Name"
                      >
                        <Form.Control
                        value={Name}
                        onChange={(e) => SetName(e.target.value)}
                          className="contact-input"
                          type="text"
                          placeholder="Your Name"
                           required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={6}>
                      <FloatingLabel
                        controlId="contactEmail"
                        label="Your Email"
                      >
                        <Form.Control
                        value={Email}
                        onChange={(e) => SetEmail(e.target.value)}
                          className="contact-input"
                          type="email"
                          placeholder="Your Email"
                           required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={6}>
                      <FloatingLabel
                        controlId="contactPhone"
                        label="Phone Number"
                      >
                        <Form.Control
                        value={Phone}
                        onChange={(e) => SetPhone(e.target.value)}
                          className="contact-input"
                          type="tel"
                          placeholder="Phone Number"
                           required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col md={6}>
                      <FloatingLabel
                        controlId="contactSubject"
                        label="Subject"
                      >
                        <Form.Control
                        value={Subject}
                        onChange={(e) => SetSubject(e.target.value)}
                          className="contact-input"
                          type="text"
                          placeholder="Subject"
                          required
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={12}>
                      <FloatingLabel
                        controlId="contactMessage"
                        label="Your Message"
                      >
                        <Form.Control
                        value={Message}
                        onChange={(e) => SetMessage(e.target.value)}
                          className="contact-input"
                          as="textarea"
                          placeholder="Your Message"
                          style={{
                            height: "140px",
                            resize: "none",
                          }}
                           required
                        />
                      </FloatingLabel>
                    </Col>

                  </Row>

                  <Form.Check
                    type="checkbox"
                    label="I agree to the Privacy Policy and Terms."
                    className="mt-3 mb-3"
                    style={{
                      color: "#777",
                      fontSize: ".85rem",
                    }}
                     required
                  />

                 <Button
                  className="contact-red-btn"
                    type="submit"
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(135deg,#ED1111,#FF4B4B)",
                      border: "none",
                      padding: "2.2%",
                      borderRadius: "9px",
                      fontWeight: "700",
                    }}
              
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <BsSendFill className="ms-2" />
                  </Button>
                </Form>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ================= FIND US ================= */}

      <section
        style={{
          background: "#F5F5FC",
          padding: "0 0 2%",
        }}
      >
        <Container>
          <div
            className="find-box"
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "4%",
              boxShadow: "0 5px 20px rgba(0,0,0,.05)",
            }}
          >
            <Row className="align-items-center gy-4">

              <Col md={4}>
                <h2
                  style={{
                    color: "#252075",
                    fontWeight: "800",
                  }}
                >
                  Find Us{" "}
                  <span style={{ color: "#ED1111" }}>
                    Here
                  </span>
                </h2>

                <div
                  style={{
                    width: "55px",
                    height: "3px",
                    background: "#ED1111",
                    margin: "4% 0",
                  }}
                />

                <p
                  style={{
                    color: "#777",
                    lineHeight: "1.6",
                  }}
                >
                  Near Satpur Colony, Satpur,
                  <br />
                  Nashik - 422007,
                  <br />
                  Maharashtra, India
                </p>

                <Button
                  className="contact-btn"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/search/?api=1&query=Satpur,Nashik,Maharashtra",
                      "_blank"
                    )
                  }
                  style={{
                    background: "#252075",
                    border: "none",
                    padding: "3% 7%",
                    borderRadius: "8px",
                    fontWeight: "700",
                  }}
                >
                  Get Directions
                  <BsCursorFill className="ms-2" />
                </Button>
              </Col>

              <Col md={8}>
                <div
                  className="contact-map"
                  style={{
                    width: "100%",
                    height: "30vh",
                    minHeight: "250px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    title="Jagruti Foundation Map"
                    src="https://www.google.com/maps?q=Satpur,Nashik,Maharashtra&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </Col>

            </Row>
          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}

      <section
        style={{
          background: "#F5F5FC",
          padding: "1% 0 4%",
        }}
      >
        <Container>
          <div
            className="cta-box"
            style={{
              color: "#fff",
              borderRadius: "16px",
              padding: "3% 4%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "4%",
            }}
          >
            <div
              className="cta-content"
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: "4%",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,.7)",
                  background: "rgba(255,255,255,.1)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <BsPeopleFill size={32} />
              </div>

              <div>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    margin: 0,
                  }}
                >
                  Want to Work With Us?
                </h3>

                <p
                  style={{
                    color: "#fff",
                    opacity: ".85",
                    margin: "1% 0 0",
                  }}
                >
                  Join our volunteer community and be a part
                  of meaningful initiatives that create a
                  positive impact.
                </p>
              </div>
            </div>

            <Button
              className="join-btn"
              onClick={() => setShowForm(true)}
              style={{
                position: "relative",
                zIndex: 1,
                background: "#fff",
                color: "#252075",
                border: "none",
                padding: "1.5% 3%",
                borderRadius: "50px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              Join Us
              <BsArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ================= VOLUNTEER MODAL ================= */}

      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        centered
        size="lg"
        scrollable
        contentClassName="border-0 rounded-4 shadow-lg overflow-hidden"
      >
        <Modal.Header
          closeButton
          className="border-0 text-white px-4 py-3"
          style={{
            background:
              "linear-gradient(135deg,#0B2C6B,#164E9E)",
          }}
        >
          <div>
            <Modal.Title className="fw-bold fs-4">
              Join Us as a Volunteer
            </Modal.Title>

            <small className="opacity-75">
              Be a part of our mission and make a difference.
            </small>
          </div>
        </Modal.Header>

        <Modal.Body
          className="p-4"
          style={{
            backgroundColor: "#F8FAFC",
          }}
        >
          <Form>
            <Row className="g-4">

              <Col xs={12} md={6}>
                <FloatingLabel
                  controlId="fullName"
                  label="Full Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className="rounded-3 shadow-sm border-0"
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

              <Col xs={12} md={6}>
                <FloatingLabel
                  controlId="email"
                  label="Email Address"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    className="rounded-3 shadow-sm border-0"
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

              <Col xs={12} md={6}>
                <FloatingLabel
                  controlId="phone"
                  label="Phone Number"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Phone Number"
                    className="rounded-3 shadow-sm border-0"
                    value={volPhone}
                    onChange={(e) => setVolPhone(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

              <Col xs={12} md={6}>
                <FloatingLabel
                  controlId="city"
                  label="City"
                >
                  <Form.Control
                    type="text"
                    placeholder="City"
                    className="rounded-3 shadow-sm border-0"
                    value={volCity}
                    onChange={(e) => setVolCity(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

              <Col xs={12}>
                <FloatingLabel
                  controlId="interest"
                  label="Area of Interest"
                >
                  <Form.Select className="rounded-3 shadow-sm border-0"
                  value={volInterest}
                  onChange={(e) => setVolInterest(e.target.value)}>
                    <option>Select an area</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Women Empowerment</option>
                    <option>Environment</option>
                    <option>Community Service</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col xs={12}>
                <FloatingLabel
                  controlId="volunteerMessage"
                  label="Why do you want to volunteer?"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Tell us how you would like to contribute..."
                    style={{
                      height: "120px",
                      resize: "none",
                    }}
                    className="rounded-3 shadow-sm border-0"
                    value={volMessage}
                    onChange={(e) => setVolMessage(e.target.value)}
                  />
                </FloatingLabel>
              </Col>

            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer
          className="border-0 px-4 py-3"
          style={{
            backgroundColor: "#F8FAFC",
          }}
        >
          <Button
            variant="light"
            onClick={() => setShowForm(false)}
            className="px-4 rounded-pill fw-semibold border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVolunteerSubmit}
            disabled={loading}
            className="px-4 rounded-pill fw-semibold border-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg,#E53935,#FF6B5F)",
            }}
          >
            {loading ? "Submitting..." : "Join as Volunteer"}
            <BsArrowRight className="ms-2" />
          </Button>
        </Modal.Footer>
      </Modal>

  
    </>
  );
};

export default Contact;
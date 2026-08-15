import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Dropdown,
  useAccordionButton
} from "react-bootstrap";
import { FaGlobe } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Link , useNavigate} from "react-router-dom";
import "../assets/CSS/MainNavbar.css";
import logo from "../assets/Images/logo.jpeg";

function CustomNavbar() {
  const languages = [
  "English",
  "हिंदी",
  "मराठी",
  "தமிழ்",
  "ગુજરાતી"
];
const navigate= useNavigate();
  return (
    <Navbar expand="xl" className="custom-navbar">
      <Container className="px-0">

        {/* Logo + Title */}

        <Navbar.Brand className="brand-section ">

          <img
            src={logo}
            alt="Jagruti Foundation"
            className="brand-logo"
          />

          <div className="brand-text d-none d-sm-block">

            <h5>Jagruti Foundation</h5>

            <p>
              Empowering lives through skill,
              care and compassion.
            </p>

          </div>

        </Navbar.Brand>
        {/* Mobile */}
        <div className="d-xl-none">
          <div className="right-control">

          <div className="right-section">

            <Button className="donate-btn" onClick={()=> navigate("/donate")} >
              <FaRegHeart className="heart-icon" />
              Donate
            </Button>

           <Dropdown align="end">
  <Dropdown.Toggle
    variant="link"
    className="language-toggle p-0 border-0 shadow-none"
  >
    <FaGlobe className="globe-icon" />
  </Dropdown.Toggle>

  <Dropdown.Menu className="language-menu">
  {languages.map((lang) => (
    <Dropdown.Item key={lang}>
      {lang}
    </Dropdown.Item>
  ))}
</Dropdown.Menu>
</Dropdown>

          </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">

      <Nav className="mx-auto nav-links">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>

              <Nav.Link as={Link} to="/program">
                Programs
              </Nav.Link>

              <Nav.Link as={Link} to="/blog">
                Blog & News
              </Nav.Link>

              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                Contact Us
              </Nav.Link>
            </Nav>


        </Navbar.Collapse>
        <div className="d-none d-xl-flex">
          <div className="right-section">

            <Button className="donate-btn" onClick={()=> navigate("/donate")} >
              <FaRegHeart className="heart-icon" />
              Donate
            </Button>

            <Dropdown align="end">
  <Dropdown.Toggle
    variant="link"
    className="language-toggle p-0 border-0 shadow-none"
  >
    <FaGlobe className="globe-icon" />
  </Dropdown.Toggle>

<Dropdown.Menu className="language-menu">
  {languages.map((lang) => (
    <Dropdown.Item key={lang}>
      {lang}
    </Dropdown.Item>
  ))}
</Dropdown.Menu>
</Dropdown>

          </div>
          </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
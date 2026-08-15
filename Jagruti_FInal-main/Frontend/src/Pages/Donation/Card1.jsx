import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/CSS/DonationCSS/Card1.css"

import {
  FaGraduationCap,
  FaBriefcaseMedical,
  FaPeopleGroup,
} from "react-icons/fa6";

const DonationMatters = () => {
  return (
    <section className="donation-section">
      <Container>

        <h2 className="section-heading">
          Why Your Donation Matters
        </h2>

        <div className="heading-line"></div>

        <Row className="justify-content-center g-4">

          <Col lg={4} md={6}>
            <div className="donation-card">

              <div className="icon-circle blue">
                <FaGraduationCap />
              </div>

              <h4>Education</h4>

              <p>
                Support school kits, scholarships and skill
                development programs for children and youth.
              </p>

            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="donation-card healthcare">

              <div className="icon-circle red">
                <FaBriefcaseMedical />
              </div>

              <h4>Healthcare</h4>

              <p>
                Provide medical care, health camps and emergency
                assistance to the underprivileged.
              </p>

            </div>
          </Col>

          <Col lg={4} md={6}>
            <div className="donation-card">

              <div className="icon-circle blue">
                <FaPeopleGroup />
              </div>

              <h4>Community Development</h4>

              <p>
                Empower women, care for the elderly, protect the
                environment and build stronger communities.
              </p>

            </div>
          </Col>

        </Row>

      </Container>
    </section>
  );
};

export default DonationMatters;
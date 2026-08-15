import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../assets/CSS/DonationCSS/Card2.css'

import {
  FaSchool,
  FaBowlFood,
  FaHouseMedical,
  FaUserGraduate,
} from "react-icons/fa6";

const DonationImpact = () => {
  return (
    <section className="impact-section">
      <Container>

        <h2 className="impact-title">
          What Your Donation Can Do
        </h2>

        <div className="impact-line"></div>

        <Row className="justify-content-center g-4">

          <Col lg={3} md={6}>
            <div className="impact-card">

              <div className="impact-icon blue">
                <FaSchool />
              </div>

              <h3>₹500</h3>

              <p>
                Provide school supplies
                <br />
                for one child
              </p>

            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="impact-card pink">

              <div className="impact-icon red">
                <FaBowlFood />
              </div>

              <h3>₹1000</h3>

              <p>
                Provide nutritious meals
                <br />
                for a family
              </p>

            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="impact-card">

              <div className="impact-icon blue">
                <FaHouseMedical />
              </div>

              <h3>₹2500</h3>

              <p>
                Support healthcare
                <br />
                for an elderly person
              </p>

            </div>
          </Col>

          <Col lg={3} md={6}>
            <div className="impact-card pink">

              <div className="impact-icon red">
                <FaUserGraduate />
              </div>

              <h3>₹5000</h3>

              <p>
                Sponsor vocational
                <br />
                training for youth
              </p>

            </div>
          </Col>

        </Row>

      </Container>
    </section>
  );
};

export default DonationImpact;
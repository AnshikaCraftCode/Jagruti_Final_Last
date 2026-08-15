import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import '../../css/Cards3.css';
import {
  FaShieldAlt,
  FaHandHoldingHeart,
  FaCertificate,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const TransparencySection = () => {
  return (
    <section className="transparency-section">

      <Container>

        <div className="transparency-box">

          <h2>
            Our Commitment to Transparency
          </h2>

          <div className="title-line"></div>

          <Row className="g-0 text-center">

            <Col lg={3} md={6} className="transparency-item">

              <div className="transparency-icon">
                <FaShieldAlt />
              </div>

              <div>

                <h3>100%</h3>

                <p>Secure Donations</p>

              </div>

            </Col>

            <Col lg={3} md={6} className="transparency-item">

              <div className="transparency-icon">
                <FaHandHoldingHeart />
              </div>

              <div>

                <h3>80%</h3>

                <p>Funds directly support programs</p>

              </div>

            </Col>

            <Col lg={3} md={6} className="transparency-item">

              <div className="transparency-icon">
                <FaCertificate />
              </div>

              <div>

                <h3>Registered</h3>

                <p>80G & 12A Certified NGO</p>

              </div>

            </Col>

            <Col lg={3} md={6} className="transparency-item">

              <div className="transparency-icon">
                <FaFileInvoiceDollar />
              </div>

              <div>

                <h3>Tax Benefit</h3>

                <p>Available for all eligible donations</p>

              </div>

            </Col>

          </Row>

        </div>

      </Container>

    </section>
  );
};

export default TransparencySection;
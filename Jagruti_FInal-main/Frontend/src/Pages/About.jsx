import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaBullseye, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import heroImage from "../assets/Images/about-hero.jpeg";
import "../assets/CSS/About.css";

const cards = [
  ["Our Mission", <FaBullseye />, "red", "To empower underprivileged communities through education, healthcare, skill development and sustainable initiatives that create lasting social impact."],
  ["Our Vision", <FaLightbulb />, "blue", "To build an inclusive society where every individual has equal opportunities to learn, grow and live with dignity."],
  ["Our Values", <FaHandsHelping />, "green", "We believe in compassion, integrity, empowerment, inclusivity and sustainability. These values guide our work and help us create meaningful change."]
];

const journey = [
  ["2016", "Foundation", "bi-flag-fill", "Jagruti Foundation was established with the vision to empower communities."],
  ["2018", "Expanding Reach", "bi-book-fill", "Started educational and skill development programs for youth."],
  ["2020", "Growing Impact", "bi-heart-pulse-fill", "Introduced healthcare and women empowerment initiatives."],
  ["2022", "Sustainability", "bi-tree-fill", "Promoted environmental awareness and eco-friendly initiatives."],
  ["2025+", "Building Futures", "bi-stars", "Continuing our journey towards brighter futures and lasting change."]
];

const achievements = [
  ["Community Excellence", "bi-award-fill", "gold", "Honoured for our continuous contribution towards social welfare."],
  ["Environmental Initiatives", "bi-tree-fill", "green", "Plantation drives and awareness campaigns for sustainability."],
  ["Healthcare Programs", "bi-heart-pulse-fill", "red", "Free medical camps and health awareness activities for rural communities."],
  ["Women Empowerment", "bi-people-fill", "blue", "Skill development and self-employment opportunities for women."]
];

const About = () => {
  const journeyRef = useRef(null);

  const scrollJourney = () =>
    journeyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  return (
    <div className="about-page">
      

      {/* ================= HERO ================= */}

      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />

        <Container className="hero-container">
          <div className="hero-card">

            <span className="hero-tag">
              Jagruti Foundation
            </span>

            <h1>
              Creating Hope,
              <br />
              Transforming Lives
            </h1>

            <p className="hero-subtitle">
              Since <strong>2016</strong>, we have been working towards
              building stronger communities through education, healthcare,
              women empowerment, environmental sustainability and social
              development.
            </p>

            <p>
              Our mission is to inspire positive change by providing equal
              opportunities, supporting vulnerable communities and creating
              sustainable solutions that improve lives.
            </p>

            <div className="hero-buttons">

              <Button
                className="primary-btn"
                onClick={scrollJourney}
              >
                Our Journey
              </Button>

              <NavLink
                to="/contact"
                className="secondary-btn"
              >
                Contact Us
              </NavLink>

            </div>

          </div>
        </Container>
      </section>

      {/* ================= MISSION ================= */}

      <section>
        <Container>
          <Row className="g-4">
            {cards.map((x, i) => (
              <Col
                lg={4}
                md={6}
                xs={12}
                key={i}
              >
                <div className="mission-card">
                  <div className={`mission-icon ${x[2]}`}>
                    {x[1]}
                  </div>

                  <h3>{x[0]}</h3>

                  <p>{x[3]}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= JOURNEY ================= */}

      <section
        className="journey-section"
        ref={journeyRef}
      >
        <Container>

          <div className="section-title">
            <h2>Our Journey</h2>

            <div className="title-line" />

            <p>
              Every milestone represents our commitment to creating a positive
              impact in society and building stronger communities.
            </p>
          </div>

          <div className="timeline">
            {journey.map((x, i) => (
              <div
                className="timeline-item"
                key={i}
              >
                <div className="timeline-icon">
                  <i className={`bi ${x[2]}`} />
                </div>

                <span className="timeline-year">
                  {x[0]}
                </span>

                <h5>{x[1]}</h5>

                <p>{x[3]}</p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* ================= STORY ================= */}

      <section>
        <Container>

          <div className="section-title">
            <h2>Our Story</h2>

            <div className="title-line" />

            <p>
              Every milestone in our journey reflects our dedication to serving
              communities with compassion, integrity and hope.
            </p>
          </div>

          <Row className="g-4">

            <Col lg={7}>
              <div className="story-content">

                <span className="story-tag">
                  Since 2016
                </span>

                <h3>
                  Building Hope Through{" "}
                  <span>Compassion & Service</span>
                </h3>

                <p>
                  Jagruti Foundation was established with the vision of
                  creating a society where every individual has equal
                  opportunities to grow, learn and live with dignity.
                </p>

                <p>
                  Over the years, our dedicated volunteers, supporters and
                  community members have worked together to transform thousands
                  of lives through education, healthcare, women empowerment and
                  sustainable development initiatives.
                </p>

                <p>
                  Every initiative we undertake is driven by compassion and a
                  strong belief that even the smallest act of kindness can
                  create lasting social change.
                </p>

                <div className="story-quote">
                  <p>
                    Every act of kindness creates a ripple of hope, inspiring
                    us to continue building stronger communities together.
                  </p>
                </div>

              </div>
            </Col>

            <Col lg={5}>
              <div className="achievement-card">

                <div className="achievement-head">

                  <div className="achievement-icon">
                    <i className="bi bi-trophy-fill" />
                  </div>

                  <div>
                    <h4>Our Achievements</h4>
                    <span>
                      Milestones that inspire us to do more
                    </span>
                  </div>

                </div>

                {achievements.map((x, i) => (
                  <div
                    className="achievement-item"
                    key={i}
                  >
                    <div className={`achievement-circle ${x[2]}`}>
                      <i className={`bi ${x[1]}`} />
                    </div>

                    <div className="achievement-content">
                      <h5>{x[0]}</h5>
                      <p>{x[3]}</p>
                    </div>
                  </div>
                ))}

              </div>
            </Col>

          </Row>

        </Container>
      </section>

    </div>
  );
};

export default About;
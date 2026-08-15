import React from 'react';
import "../assets/CSS/Home.css";

// Images
import hero from "../assets/Images/Home-hero.jpeg";
import about from "../assets/Images/Blog-hero.jpeg";
import program1 from "../assets/Images/program1.jpeg";
import program2 from "../assets/Images/program2.jpeg";
import program3 from "../assets/Images/program3.jpeg";
import program4 from "../assets/Images/program4.jpeg";
import childrenImage from "../assets/Images/hero_impact.jpeg";
import update1 from "../assets/Images/program1.jpeg";
import update2 from "../assets/Images/program2.jpeg";
import update3 from "../assets/Images/program3.jpeg";

// Icons
import { PiBookBookmarkFill } from "react-icons/pi";
import { RiWomenFill } from "react-icons/ri";
import { BsLeafFill } from "react-icons/bs";
import { MdHealthAndSafety } from "react-icons/md";
import { 
  FaUsers, 
  FaHandHoldingHeart, 
  FaBullseye, 
  FaCalendarAlt, 
  FaFemale, 
  FaGraduationCap 
} from "react-icons/fa";

// UI Components
import { Container, Card, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

// Data Arrays
const programs = [
  {
    title: "Education",
    image: program1,
    icon: <PiBookBookmarkFill />,
    description: "Empowering children through quality education, learning opportunities, and brighter futures."
  },
  {
    title: "Women Empowerment",
    image: program2,
    icon: <RiWomenFill />,
    description: "Empowering women through education, skill development, and equal opportunities."
  },
  {
    title: "Environmental",
    image: program3,
    icon: <BsLeafFill />,
    description: "Promoting environmental sustainability through plantation and conservation drives."
  },
  {
    title: "Health",
    image: program4,
    icon: <MdHealthAndSafety />,
    description: "Improving community well-being through healthcare camps and awareness drives."
  }
];

const updates = [
  { id: 1, image: update1, date: "June 23, 2026", title: "Jagruti Foundation organized a successful educational camp for village students." },
  { id: 2, image: update2, date: "February 15, 2026", title: "Tree plantation drive conducted near Trimbakeshwar with active volunteers." },
  { id: 3, image: update3, date: "January 27, 2026", title: "Community awareness program completed successfully with volunteers." },
  { id: 4, image: update1, date: "December 10, 2025", title: "Blood Donation Camp organized with participation from over 150 donors." },
  { id: 5, image: update2, date: "November 02, 2025", title: "Women's empowerment workshop conducted for rural communities." }
];

const impactStats = [
  { icon: <FaCalendarAlt />, title: "Activities in", stat: "26", subtitle: "states & union territories" },
  { icon: <FaUsers />, title: "Children Reached", stat: "10K+", subtitle: "across all active regions" },
  { icon: <FaFemale />, title: "Girls & Women Reached", stat: "7K+", subtitle: "empowered through initiatives" },
  { icon: <FaGraduationCap />, title: "Youth Reached", stat: "8K+", subtitle: "provided with skills & guidance" }
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO SECTION */}
      <section 
        data-aos="fade-up" 
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${hero})` }}
      >
        <Container className="h-100 d-flex align-items-center">
          <div className="row w-100">
            <div className="hero-content col-lg-8 col-md-10">
              <h1 className="hero-title fw-bold">
                Empowering Lives <br />
                Through Skill, <br />
                Care & <span className="highlight-text">Compassion</span>
              </h1>

              <p className="hero-text my-4">
                Jagruti Foundation in Nashik is one of the leading NGOs, working towards education, empowerment, and social welfare. We believe every individual deserves an opportunity to learn, grow, and build a brighter future.
              </p>

              <div className="hero-buttons d-flex flex-wrap gap-3">
                <button className="primary-btn"onClick={() => navigate("/programs")}>Discover Our Programs →</button>
                <button className="secondary-btn"onClick={() => navigate("/contact")}>Contact Us →</button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section py-5" data-aos="fade-up">
        <Container>
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <img src={about} alt="About Jagruti Foundation" className="img-fluid about-image shadow-sm" />
            </div>

            <div className="col-lg-6 ps-lg-4">
              <div className="about-card d-flex align-items-start mb-4">
                <div className="icon-badge primary-badge"><FaUsers /></div>
                <div className="ms-3">
                  <h3 className="fw-bold section-title-dark">Who We Are?</h3>
                  <p className="text-muted mb-0">Jagruti Foundation empowers communities through education, healthcare, skill development, and compassionate social initiatives.</p>
                </div>
              </div>

              <div className="about-card d-flex align-items-start mb-4">
                <div className="icon-badge accent-badge"><FaHandHoldingHeart /></div>
                <div className="ms-3">
                  <h3 className="fw-bold section-title-dark">What We Do?</h3>
                  <p className="text-muted mb-0">We design and implement programs that support children's education, women's empowerment, healthcare, and social development.</p>
                </div>
              </div>

              <div className="about-card d-flex align-items-start">
                <div className="icon-badge primary-badge"><FaBullseye /></div>
                <div className="ms-3">
                  <h3 className="fw-bold section-title-dark">Why We Do It?</h3>
                  <p className="text-muted mb-0">We believe every individual deserves equal opportunities, dignity, and the chance to build a better future.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROGRAM SECTION */}
      <section className="programs-section py-5" data-aos="fade-up">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title-dark display-6">Programs</h2>
            <div className="divider"></div>
            <p className="program-subtitle mt-3">
              Through our diverse programs, Jagruti Foundation empowers communities by promoting education, healthcare, women empowerment, environmental sustainability, and social welfare to create lasting positive change.
            </p>
          </div>

          <div className="row g-4">
            {programs.map((item, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                <div className="program-card">
                  <img src={item.image} alt={item.title} />
                  <div className="program-content">
                    <div className="program-icon mb-2">{item.icon}</div>
                    <h4 className="fw-bold">{item.title}</h4>
                    <p>{item.description}</p>
                    <button className="circle-btn" aria-label={`View ${item.title}`} onClick={() => navigate('/programs')}>→</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* IMPACT SECTION */}
      <section className="impact-section py-5" data-aos="fade-up">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title-dark display-5">Our Impact</h2>
            <div className="divider"></div>
          </div>

          <div className="row text-center gy-4">
            {impactStats.map((stat, idx) => (
              <div key={idx} className={`col-lg-3 col-sm-6 ${idx !== impactStats.length - 1 ? 'border-end-md' : ''}`}>
                <div className="impact-card">
                  <div className="icon-badge primary-badge mx-auto">{stat.icon}</div>
                  <h5 className="mt-3 text-secondary">{stat.title}</h5>
                  <h1 className="fw-bold display-4 text-danger my-1">{stat.stat}</h1>
                  <p className="text-muted small">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>

        <Container fluid className="px-0 mt-5">
          <img src={childrenImage} alt="Impact banner" className="img-fluid w-100 impact-banner-img" />
        </Container>
      </section>

      {/* LATEST UPDATES */}
      <section className="updates-section py-5" data-aos="fade-up">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold updates-title">Latest Updates</h2>
            <div className="divider"></div>
          </div>

          <Swiper
            modules={[Autoplay]}
            navigation
            loop={true}
            centeredSlides={true}
            watchSlidesProgress={true}
            slidesPerView={1}
            spaceBetween={20}
            speed={800}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              576: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              992: { slidesPerView: 3, spaceBetween: 30 }
            }}
          >
            {updates.map((item) => (
              <SwiperSlide key={item.id}>
                {({ isActive }) => (
                  <Card className={`update-card border-0 ${isActive ? 'active-slide' : ''}`}>
                    <div className="card-img-container">
                      <Card.Img src={item.image} alt={item.title} />
                      <span className="date-badge">{item.date}</span>
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                      <Card.Text className="update-text">{item.title}</Card.Text>
                      <Button variant="link" className="view-more-btn p-0 text-start" onClick={() => navigate('/Blog')}>
                        View More <span className="arrow">→</span>
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
    </>
  );
};

export default Home;
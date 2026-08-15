import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import {
  FaHeart, FaCamera, FaImages, FaUsers, FaCalendarAlt,
  FaLeaf, FaGraduationCap, FaFemale, FaSeedling, FaShareAlt,
  FaArrowRight
} from "react-icons/fa";
import { BsGrid3X3GapFill, BsHeartPulseFill } from "react-icons/bs";

// ================= HERO IMAGES =================
import hero1 from "../assets/Images/update1.jpeg";
import hero2 from "../assets/Images/update2.jpeg";
import hero3 from "../assets/Images/update3.jpeg";

const Gallery = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState("All Photos");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

   const scrollToGallery = () => {
  galleryRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const handleImageClick = (item) => {
  setSelectedImage(item);
  setShowModal(true);
};
  // Fetch Gallery Data
  const getGallery = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/gallery/get"
      );

      console.log("API Response:", res.data);

      setImages(res.data?.data || []);
    } catch (error) {
      console.log("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  useEffect(() => {
    images.forEach((item) => {
      console.log("Category:", item.category);
    });
  }, [images]);

  // useEffect(() => {
  //   getGallery();
  // }, []);

  // ================= CATEGORIES =================
  const categories = [
    ["All Photos", <BsGrid3X3GapFill />],
    ["Education", <FaGraduationCap />],
    ["Health", <BsHeartPulseFill />],
    ["Women Empowerment", <FaFemale />],
    ["Environment", <FaLeaf />]
  ];

  // ================= GALLERY DATA =================
  const filtered =
    active === "All Photos"
      ? images
      : images.filter((item) => item.category === active);
  const displayedImages = showAll ? filtered : filtered.slice(0, 8);

  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}

        body{
          margin:0;
          padding:0;
          background:#F7F8FC;
          color:#10245A;
          font-family:"Poppins","Segoe UI",Arial,sans-serif;
          overflow-x:hidden;
        }

        /* ================= HERO ================= */

        .gallery-hero{
          min-height:720px;
          padding:150px 0 80px;
          position:relative;
          overflow:hidden;
          display:flex;
          align-items:center;
          background:
            linear-gradient(115deg,#031436f7,#0B2C6BEF,#0B2C6B88),
            url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85")
            center/cover no-repeat;
        }

        .gallery-hero:before{
          content:"";
          position:absolute;
          width:500px;
          height:500px;
          right:-180px;
          top:-200px;
          border-radius:50%;
          background:#E5393533;
          filter:blur(5px);
        }

        .gallery-hero:after{
          content:"";
          position:absolute;
          width:350px;
          height:350px;
          left:-150px;
          bottom:-180px;
          border-radius:50%;
          background:#4285D433;
        }

        .hero-content{
          position:relative;
          z-index:2;
          padding:clamp(25px,4vw,50px);
          border-radius:30px;
          background:#ffffff12;
          border:1px solid #ffffff30;
          backdrop-filter:blur(15px);
          box-shadow:0 25px 60px #0004;
        }

        .hero-label{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 16px;
          margin-bottom:20px;
          border-radius:50px;
          background:#E53935;
          color:#fff;
          font-size:13px;
          font-weight:700;
          letter-spacing:.5px;
          text-transform:uppercase;
        }

        .hero-content h1{
          margin:0 0 20px;
          color:#fff;
          font-size:clamp(2.4rem,5vw,4.7rem);
          line-height:1.08;
          font-weight:800;
          letter-spacing:-1.5px;
        }

        .hero-content h1 span{
          color:#FF5555;
        }

        .hero-content p{
          max-width:570px;
          margin-bottom:28px;
          color:#E8EDF7;
          font-size:16px;
          line-height:1.8;
        }

        .hero-btn{
          padding:13px 25px!important;
          border:0!important;
          border-radius:50px!important;
          background:#E53935!important;
          font-weight:700!important;
          transition:.3s!important;
          box-shadow:0 10px 25px #E5393544;
        }

        .hero-btn:hover{
          background:#C62828!important;
          transform:translateY(-4px);
          box-shadow:0 15px 30px #E5393566;
        }

        /* ================= HERO COLLAGE ================= */

        .collage{
          height:480px;
          position:relative;
          z-index:2;
        }

        .pic{
          position:absolute;
          overflow:hidden;
          border:7px solid #fff;
          border-radius:28px;
          background:#fff;
          box-shadow:0 25px 50px #0005;
          transition:.5s;
        }

        .pic img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:.6s;
        }

        .pic:hover{
          transform:rotate(0deg) scale(1.04)!important;
          z-index:10;
        }

        .pic:hover img{
          transform:scale(1.08);
        }

        .p1{
          width:42%;
          height:210px;
          top:20px;
          left:0;
          transform:rotate(-7deg);
        }

        .p2{
          width:62%;
          height:390px;
          top:55px;
          left:20%;
          z-index:3;
          transform:rotate(3deg);
        }

        .p3{
          width:38%;
          height:200px;
          right:0;
          bottom:15px;
          transform:rotate(8deg);
        }

        .camera{
          position:absolute;
          z-index:8;
          left:48%;
          bottom:5px;
          width:72px;
          height:72px;
          display:grid;
          place-items:center;
          border:5px solid #fff;
          border-radius:50%;
          background:#E53935;
          color:#fff;
          font-size:26px;
          box-shadow:0 10px 25px #0005;
          transition:.3s;
        }

        .camera:hover{
          transform:scale(1.12) rotate(10deg);
        }

        /* ================= GALLERY SECTION ================= */

        .gallery-section{
          padding:70px 0;
          background:#F7F8FC;
        }

        .section-label{
          display:block;
          margin-bottom:8px;
          color:#E53935;
          font-size:13px;
          font-weight:800;
          letter-spacing:2px;
          text-transform:uppercase;
          text-align:center;
        }

        .heading{
          margin:0 0 35px;
          color:#0B2C6B;
          text-align:center;
          font-size:clamp(2rem,4vw,3rem);
          font-weight:800;
        }

        .heading span{
          color:#E53935;
        }

        /* ================= FILTERS ================= */

        .filters{
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:35px;
        }

        .filter{
          display:flex;
          align-items:center;
          gap:7px;
          padding:11px 18px;
          border:1px solid #DDE2EC;
          border-radius:50px;
          background:#fff;
          color:#0B2C6B;
          font-size:13px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
          box-shadow:0 5px 15px #0B2C6B0A;
        }

        .filter:hover{
          color:#E53935;
          border-color:#E53935;
          transform:translateY(-3px);
        }

        .filter.active{
          border-color:#E53935;
          background:#E53935;
          color:#fff;
          box-shadow:0 8px 20px #E5393544;
        }

        /* ================= IMAGE GRID ================= */

        .grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:18px;
        }

        .card-img{
          height:260px;
          position:relative;
          overflow:hidden;
          border-radius:20px;
          cursor:pointer;
          background:#ddd;
          box-shadow:0 10px 25px #071B4115;
          .card-img:hover{
          transform:translateY(-6px);
        }
        }

        .card-img.wide{
          grid-column:span 2;
        }

        .card-img img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:.6s;
        }

        .card-img:after{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(
            transparent 35%,
            #03143622 55%,
            #031436dd 100%
          );
          opacity:.7;
          transition:.4s;
        }

        .card-img:hover img{
          transform:scale(1.1);
        }

        .card-img:hover:after{
          opacity:1;
        }

        .info{
          position:absolute;
          z-index:2;
          left:0;
          right:0;
          bottom:0;
          padding:20px;
          color:#fff;
          transform:translateY(8px);
          transition:.4s;
        }

        .card-img:hover .info{
          transform:translateY(0);
        }

        .tag{
          display:inline-block;
          padding:5px 11px;
          border-radius:30px;
          background:#E53935;
          color:#fff;
          font-size:10px;
          font-weight:700;
        }

        .info div{
          margin-top:10px;
          font-size:13px;
          font-weight:600;
        }

        .info small{
          display:block;
          margin-top:5px;
          color:#E5EAF3;
          font-size:11px;
        }

        .view-more{
          padding:11px 25px!important;
          border:2px solid #0B2C6B!important;
          border-radius:50px!important;
          color:#0B2C6B!important;
          font-weight:700!important;
          transition:.3s!important;
        }

        .view-more:hover{
          background:#0B2C6B!important;
          color:#fff!important;
          transform:translateY(-3px);
        }

        /* ================= CTA ================= */

        .cta{
          position:relative;
          overflow:hidden;
          margin:20px 0 70px;
          padding:45px;
          border-radius:30px;
          background:linear-gradient(135deg,#031436,#0B2C6B);
          color:#fff;
          box-shadow:0 20px 50px #03143633;
        }

        .cta:after{
          content:"";
          position:absolute;
          width:300px;
          height:300px;
          right:-120px;
          top:-150px;
          border-radius:50%;
          background:#E5393533;
        }

        .cta-content{
          position:relative;
          z-index:2;
        }

        .cta h3{
          margin-bottom:12px;
          font-size:clamp(1.6rem,3vw,2.3rem);
          font-weight:800;
        }

        .cta p{
          max-width:500px;
          color:#C9D2E5;
          line-height:1.7;
        }

        .cta-btn{
          padding:12px 25px!important;
          border:0!important;
          border-radius:50px!important;
          background:#E53935!important;
          font-weight:700!important;
          transition:.3s!important;
        }

        .cta-btn:hover{
          background:#fff!important;
          color:#E53935!important;
          transform:translateY(-3px);
        }

        .cta-item{
          position:relative;
          z-index:2;
          padding:15px 10px;
          text-align:center;
          border-left:1px solid #ffffff25;
          transition:.3s;
        }

        .cta-item:hover{
          transform:translateY(-5px);
        }

        .cta-icon{
          width:55px;
          height:55px;
          margin:auto;
          display:grid;
          place-items:center;
          border-radius:50%;
          background:#fff;
          color:#E53935;
          font-size:20px;
          transition:.3s;
        }

        .cta-item:hover .cta-icon{
          background:#E53935;
          color:#fff;
          transform:rotate(8deg);
        }

        .cta-item h6{
          margin-top:12px;
          font-weight:700;
        }

        .cta-item p{
          margin:5px 0 0;
          font-size:11px;
          color:#AEB9CE;
        }

        /* ================= RESPONSIVE ================= */

        @media(max-width:991px){

          .gallery-hero{
            min-height:auto;
            padding:140px 0 70px;
          }

          .hero-content{
            margin-bottom:50px;
          }

          .collage{
            max-width:650px;
            margin:auto;
          }

          .grid{
            grid-template-columns:repeat(2,1fr);
          }

          .card-img.wide{
            grid-column:span 2;
          }

          .cta-item{
            border:0;
            margin-top:25px;
          }
        }

        @media(max-width:575px){

          .gallery-hero{
            padding:120px 0 50px;
            text-align:center;
          }

          .hero-content{
            padding:25px 20px;
            border-radius:22px;
          }

          .hero-content h1{
            font-size:2.35rem;
          }

          .hero-content p{
            font-size:14px;
          }

          .hero-btn{
            width:100%;
          }

          .collage{
            height:300px;
            margin-top:15px;
          }

          .p1{
            width:42%;
            height:125px;
          }

          .p2{
            width:62%;
            height:235px;
            left:19%;
          }

          .p3{
            width:38%;
            height:120px;
          }

          .camera{
            width:58px;
            height:58px;
            font-size:20px;
            bottom:0;
          }

          .gallery-section{
            padding:50px 0;
          }

          .filters{
            justify-content:flex-start;
            flex-wrap:nowrap;
            overflow-x:auto;
            padding:5px 5px 15px;
          }

          .filter{
            flex-shrink:0;
            white-space:nowrap;
          }

          .grid{
            grid-template-columns:1fr;
          }

          .card-img,
          .card-img.wide{
            grid-column:span 1;
            height:240px;
          }

          .cta{
            margin:10px 0 40px;
            padding:30px 20px;
            text-align:center;
            border-radius:22px;
          }

          .cta-btn{
            width:100%;
            margin-bottom:25px;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}

      <section className="gallery-hero">
        <Container>
          <Row className="align-items-center">

            <Col lg={6}>
              <div className="hero-content">

                <span className="hero-label">
                  <FaCamera /> Our Gallery
                </span>

                <h1>
                  Snapshots of Change,
                  <br />
                  Stories that <span>Inspire</span>
                </h1>

                <p>
                  Every moment captured reflects our journey of impact,
                  compassion and community. Explore the smiles, efforts
                  and milestones that keep us moving forward.
                </p>

                <Button
                  className="hero-btn"
                  onClick={scrollToGallery}
                >
                  <FaImages className="me-2" />
                  View All Photos
                  <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <div className="collage">

                {/* HERO IMAGE 1 */}
                <div className="pic p1">
                  <img src={hero1} alt="Jagruti Foundation activity" />
                </div>

                {/* HERO MAIN IMAGE */}
                <div className="pic p2">
                  <img src={hero2} alt="Jagruti Foundation event" />
                </div>

                {/* HERO IMAGE 3 */}
                <div className="pic p3">
                  <img src={hero3} alt="Jagruti Foundation community" />
                </div>

                <div className="camera">
                  <FaCamera />
                </div>

              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ================= GALLERY ================= */}

      <section
        className="gallery-section"
        ref={galleryRef}
      >
        <Container>

          <span className="section-label">
            Moments That Matter
          </span>

          <h2 className="heading">
            Explore Our <span>Gallery</span>
          </h2>

          {/* FILTERS */}

          <div className="filters">
            {categories.map(([name, icon]) => (
              <button
                key={name}
                className={`filter ${active === name ? "active" : ""}`}
                onClick={() => {
                  setActive(name);
                  setShowAll(false);
                }}
              >
                {icon}
                <span>{name}</span>
              </button>
            ))}
          </div>

          {/* IMAGE GRID */}

          <div className="grid">
            {displayedImages.map((item, index) => (<div
              className={`card-img ${index % 3 === 1 ? "wide" : ""}`}
              key={item._id}
              onClick={() => handleImageClick(item)}
            >
              <img
                src={`http://localhost:8000/uploads/${item.image}`}
                alt={item.category}
              />

              <div className="info">
                <span className="tag">
                  {item.category}
                </span>

                <div>
                  <FaCalendarAlt className="me-1" />
                  {item.date}
                </div>

                <small>
                  <FaSeedling className="me-1" />
                  {item.place}
                </small>
              </div>
            </div>
            ))}
          </div>

          {filtered.length > 8 && (
            <div className="text-center mt-5">
              <Button
                className="view-more"
                variant="outline-dark"
                onClick={() => setShowAll(!showAll)}
              >
                <FaImages className="me-2" />
                {showAll ? "Show Less" : "View More"}
              </Button>
            </div>
          )}

        </Container>
      </section>


      {/* ================= CTA ================= */}

      <Container>

        <section className="cta">

          <div className="cta-content">

            <Row className="align-items-center">

              <Col lg={5}>

                <h3>
                  Be a Part of Our Journey
                </h3>

                <p>
                  Your support helps us create more moments
                  of change and bring smiles to many more faces.
                </p>

                <Button
                  className="cta-btn"
                  onClick={() => navigate("/donate")}
                >
                  <FaHeart className="me-2" />
                  Donate Now
                  <FaArrowRight className="ms-2" />
                </Button>

              </Col>

              <Col lg={7}>

                <Row>

                  {[
                    [<FaHeart />, "Support a Cause", () => navigate("/donate")],
                    [<FaUsers />, "Volunteer", () => navigate("/contact", { state: { openVolunteer: true } })],
                    [<FaCalendarAlt />, "Attend Events", () => navigate("/program")],
                    [<FaShareAlt />, "Spread Awareness", () => navigate("/about")]
                  ].map(([icon, title, action]) => (

                    <Col xs={6} md={3} key={title}>

                      <div
                        className="cta-item"
                        onClick={action}
                        style={{ cursor: "pointer" }}
                      >

                        <div className="cta-icon">
                          {icon}
                        </div>

                        <h6>
                          {title}
                        </h6>

                        <p>
                          Join us and make a difference
                        </p>

                      </div>

                    </Col>

                  ))}

                </Row>

              </Col>

            </Row>

          </div>

        </section>

      </Container>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
      >
        <Modal.Body className="p-0 position-relative">

          <img
            src={
              selectedImage
                ? `http://localhost:8000/uploads/${selectedImage.image}`
                : ""
            }
            alt=""
            style={{
              width: "100%",
              maxHeight: "85vh",
              objectFit: "contain",
            }}
          />

          {selectedImage && (
            <div
              style={{
                padding: "20px",
                background: "#fff",
              }}
            >
              <h5>{selectedImage.category}</h5>

              <p>
                <FaCalendarAlt className="me-2" />
                {selectedImage.date}
              </p>

              <p>
                <FaSeedling className="me-2" />
                {selectedImage.place}
              </p>
            </div>
          )}

        </Modal.Body>
      </Modal>

    </>
  );
};

export default Gallery;
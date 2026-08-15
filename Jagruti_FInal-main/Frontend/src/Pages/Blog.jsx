import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Form,
  InputGroup, Modal, FloatingLabel, Badge
} from "react-bootstrap";

import {
  BsSearch, BsArrowRight, BsBook, BsPeopleFill, BsPerson, BsFolder,
  BsHeartFill, BsCalendar3, BsChevronRight,
  BsMortarboardFill, BsTreeFill, BsHeartPulseFill,
  BsStars, BsPersonHeart, BsSendFill
} from "react-icons/bs";

import blog1 from "../assets/Images/update1.jpeg";
import blog2 from "../assets/Images/update2.jpeg";
import blog3 from "../assets/Images/update3.jpeg";
import blog4 from "../assets/Images/update4.jpeg";
import blog5 from "../assets/Images/update5.jpeg";
import blog6 from "../assets/Images/update6.jpeg";
import heroImage from "../assets/Images/blog-hero.jpeg";

const posts = [
  [
    blog1,
    "May 20, 2025",
    "Empowering Rural Children Through Quality Education",
    "Our education programs continue to bring positive change in rural communities by providing access to learning resources and opportunities.",
    "Our education programs continue to bring positive change in rural communities by providing access to learning resources and opportunities.",
    "Education"
  ],
  [
    blog2,
    "May 15, 2025",
    "Women Empowerment: Building Stronger Communities",
    "We organized a skill development workshop for women, helping them become financially independent and confident.",
    "We organized a skill development workshop for women, helping them become financially independent and confident.",
    "Women Empowerment"
  ],
  [
    blog3,
    "May 10, 2025",
    "Planting Hope for a Greener Future",
    "Our environmental initiatives are creating a lasting impact by promoting sustainability and tree plantation drives.",
    "Our environmental initiatives are creating a lasting impact by promoting sustainability and tree plantation drives.",
    "Environment"
  ],
  [
    blog4,
    "May 05, 2025",
    "Health Camp Brings Smiles to Many Families",
    "We conducted a free health check-up camp for families in need, providing medical support and awareness for a healthier life.",
    "We conducted a free health check-up camp for families in need, providing medical support and awareness for a healthier life.",
    "Health"
  ],
  [
    blog5,
    "May 02, 2025",
    "Together We Make a Difference",
    "Our youth volunteers are driving meaningful change in the community through dedication, service and compassion.",
    "Our youth volunteers are driving meaningful change in the community through dedication, service and compassion.",
    "Community"
  ],
  [
    blog6,
    "May 01, 2025",
    "Meet Sunita, a Bright Student",
    "A story of determination, hope and transformation that reminds us of the power of education and support.",
    "A story of determination, hope and transformation that reminds us of the power of education and support.",
    "Success Stories"
  ]
];

const categories = [
  ["Education", "12", <BsMortarboardFill />],
  ["Women Empowerment", "08", <BsPeopleFill />],
  ["Health", "10", <BsHeartPulseFill />],
  ["Environment", "07", <BsTreeFill />],
  ["Community", "09", <BsPeopleFill />],
  ["Success Stories", "06", <BsStars />]
];

const stats = [
  [<BsBook />, "150+", "Stories Published"],
  [<BsPeopleFill />, "50K+", "Lives Impacted"],
  [<BsHeartFill />, "100+", "Volunteers"]
];

const Blog = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [liveBlogs, setLiveBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Volunteer Form State
  const [volName, setVolName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [volCity, setVolCity] = useState("");
  const [volInterest, setVolInterest] = useState("");
  const [volMessage, setVolMessage] = useState("");
  const [submittingVol, setSubmittingVol] = useState(false);

  const fetchLiveBlogs = async () => {
    try {
      const response = await fetch("http://localhost:8000/blogs");
      const data = await response.json();
      if (response.ok && data.success && Array.isArray(data.data)) {
        const mapped = data.data.map((item) => {
          let imgUrl = posts[0][0];
          if (item.image) {
            imgUrl = item.image.startsWith("http")
              ? item.image
              : `http://localhost:8000${item.image}`;
          }
          const formattedDate = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent";
          const desc =
            item.shortDescription ||
            (item.content ? item.content.substring(0, 120) + "..." : "");

          return [
            imgUrl,
            formattedDate,
            item.title || "Untitled Blog",
            desc,
            item.content || desc,
            item.category || "Education",
            item._id,
          ];
        });
        setLiveBlogs(mapped);
      }
    } catch (err) {
      console.log("Using static default blog posts:", err.message);
    }
  };

  useEffect(() => {
    fetchLiveBlogs();
  }, []);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowBlog(true);
  };

  const handleCloseBlog = () => {
    setShowBlog(false);
  };

  const handleVolunteerSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!volName || !volEmail || !volPhone || !volCity) {
      alert("Please fill in all required fields (Name, Email, Phone, City).");
      return;
    }
    setSubmittingVol(true);
    try {
      const volPayload = {
        fullName: volName,
        Name: volName,
        email: volEmail,
        Email: volEmail,
        phone: volPhone,
        Phone: volPhone,
        city: volCity,
        City: volCity,
        interest: volInterest || "General",
        Subject: volInterest || "General",
        message: volMessage || "Registered as Volunteer",
        Message: volMessage || "Registered as Volunteer",
      };

      const res = await fetch("http://localhost:8000/addVolunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volPayload),
      });

      const data = await res.json();

      try {
        await fetch("http://localhost:8000/addContact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...volPayload,
            type: "Volunteer",
          }),
        });
      } catch (cErr) {
        console.log("Contact sync notice:", cErr);
      }

      if (res.ok && data.success) {
        alert("🎉 Volunteer Registration Submitted Successfully!");
        setVolName("");
        setVolEmail("");
        setVolPhone("");
        setVolCity("");
        setVolInterest("");
        setVolMessage("");
        setShowForm(false);
      } else {
        alert(data.message || "Failed to submit volunteer application.");
      }
    } catch (err) {
      console.error("Volunteer submit error:", err);
      alert("Unable to submit volunteer form. Please check backend connection.");
    } finally {
      setSubmittingVol(false);
    }
  };

  const activePosts = liveBlogs.length > 0 ? liveBlogs : posts;

  const filteredPosts = activePosts.filter((p) => {
    const title = (p[2] || "").toLowerCase();
    const desc = (p[3] || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || title.includes(query) || desc.includes(query);

    const postCat = p[5] || "General";
    const matchesCat =
      selectedCategory === "All" ||
      postCat.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCat;
  });

  const popularPosts = activePosts.slice(0, 3);

  const dynamicCategories = categories.map((cat) => {
    const catName = cat[0];
    const count = activePosts.filter(
      (p) => (p[5] || "General").toLowerCase() === catName.toLowerCase()
    ).length;
    return [
      catName,
      count > 0 ? String(count).padStart(2, "0") : cat[1],
      cat[2],
    ];
  });

  return (
    <>
      <style>{`
        *{box-sizing:border-box}

        body{
          margin:0;
          background:#f7f8fc;
          color:#152451;
          font-family:"Poppins","Segoe UI",Arial,sans-serif;
          line-height:1.6;
          overflow-x:hidden
        }

        /* ================= HERO ================= */

        .blog-hero{
          background:linear-gradient(135deg,#07133f,#172b72);
          padding:150px 0 6%;
          color:#fff;
          overflow:hidden
        }

        .blog-label{
          color:#ff5360;
          font-size:clamp(13px,1.3vw,18px);
          font-weight:700;
          letter-spacing:2px
        }

        .blog-title{
          font:700 clamp(36px,5vw,60px)/1.1 Georgia,serif;
          margin:15px 0
        }

        .blog-title span{color:#ff5360}

        .blog-desc{
          color:#d5daea;
          line-height:1.7;
          max-width:570px
        }

       

        

        
        .vol-btn,
        .all-btn,
        .submit-btn{
          background:linear-gradient(135deg,#ed3540,#ff5b64)!important;
          border:0!important;
          border-radius:0 8px 8px 0;
          color:#fff!important;
          font-weight:700!important;
          transition:.3s;
          box-shadow:0 7px 15px rgba(237,53,64,.25)
        }

        
        .vol-btn:hover,
        .all-btn:hover,
        .submit-btn:hover{
          transform:translateY(-4px);
          background:linear-gradient(135deg,#d92330,#ed3540)!important;
          box-shadow:0 12px 25px rgba(237,53,64,.4)
        }

        
        .vol-btn:active,
        .all-btn:active,
        .submit-btn:active{
          transform:translateY(-1px)
        }

        /* ================= STATS ================= */

        .blog-stats{
          display:flex;
          gap:30px;
          flex-wrap:wrap;
          margin-top:30px
        }

        .blog-stat{
          display:flex;
          align-items:center;
          gap:10px
        }

        .stat-icon{
          width:46px;
          height:46px;
          border-radius:50%;
          display:grid;
          place-items:center;
          color:#fff;
          background:linear-gradient(145deg,#6079e5,#243b8f);
          box-shadow:
            4px 5px 10px rgba(0,0,0,.25),
            inset 2px 2px 4px rgba(255,255,255,.35);
          transition:.3s
        }

        .blog-stat:hover .stat-icon{
          transform:translateY(-4px) rotate(8deg);
          box-shadow:0 10px 20px rgba(0,0,0,.3)
        }

        .blog-stat small{color:#cbd0df}

        /* ================= HERO IMAGE ================= */

        .hero-image-wrap{
          position:relative;
          width:100%;
          height:450px;
          margin:auto
        }

        .hero-image-wrap:before{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,#ff5360,#d92330);
          border-radius:30px 100px 30px 100px;
          transform:rotate(3deg);
          box-shadow:0 20px 45px rgba(0,0,0,.3)
        }

        .hero-img{
          position:relative;
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          padding:8px;
          background:#fff;
          border-radius:30px 100px 30px 100px;
          transition:.5s
        }

        .hero-image-wrap:hover .hero-img{
          transform:translateY(-5px);
          box-shadow:0 20px 40px rgba(0,0,0,.3)
        }

        /* ================= MAIN ================= */

        .blog-main{padding:5% 0}

        .section-title,
        .side-title,
        .vol-title{
          font:700 clamp(24px,3vw,30px) Georgia,serif;
          color:#101f4c
        }

        .section-title:after,
        .side-title:after{
          content:"";
          display:block;
          width:35px;
          height:3px;
          background:#ed3540;
          margin-top:8px
        }

        /* ================= VIEW BUTTON ================= */

        .view-btn{
          background:#fff!important;
          color:#172653!important;
          border:1px solid #cdd3e2!important;
          border-radius:10px!important;
          font-weight:700!important;
          transition:.3s;
          box-shadow:0 4px 10px rgba(21,37,75,.08)
        }

        .view-btn:hover{
          background:#172b85!important;
          border-color:#172b85!important;
          color:#fff!important;
          transform:translateY(-4px);
          box-shadow:0 10px 20px rgba(23,43,133,.25)
        }

        /* ================= BLOG CARDS ================= */

        .blog-card{
          border:0!important;
          border-radius:15px!important;
          overflow:hidden;
          height:100%;
          box-shadow:0 5px 20px rgba(21,37,75,.08);
          transition:.4s
        }

        .blog-card:hover{
          transform:translateY(-8px);
          box-shadow:0 18px 35px rgba(21,37,75,.17)
        }

        .blog-card img{
          width:100%;
          height:180px;
          object-fit:cover;
          transition:.5s
        }

        .blog-card:hover img{
          transform:scale(1.07)
        }

        .blog-card-body{
          display:flex;
          flex-direction:column
        }

        .blog-date{
          color:#7c8497;
          font-size:11px;
          margin-bottom:8px
        }

        .post-title{
          font-size:16px;
          font-weight:700;
          color:#172653;
          line-height:1.4
        }

        .post-text{
          font-size:12px;
          line-height:1.6;
          color:#687083
        }

        .read-link{
          color:#ed3540;
          text-decoration:none;
          font-size:12px;
          font-weight:700;
          margin-top:auto;
          transition:.3s
        }

        .read-link:hover{
          color:#b8202a;
          padding-left:5px
        }

        /* ================= SIDEBAR ================= */

        .blog-side{
          background:#fff;
          padding:22px;
          border-radius:15px;
          box-shadow:0 5px 20px rgba(21,37,75,.08);
          margin-bottom:20px
        }

        .category-item,
        .popular-post{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:11px 0;
          border-bottom:1px solid #eee;
          transition:.3s;
          cursor:pointer;
        }

        .category-item:hover,
        .category-item.active-category{
          transform:translateX(6px);
          color:#ed3540;
        }

        .category-left{
          display:flex;
          align-items:center;
          gap:10px;
          font-size:12px;
          font-weight:600
        }

        /* ================= 3D ICONS ================= */

        .category-icon{
          width:42px;
          height:42px;
          border-radius:13px;
          display:grid;
          place-items:center;
          color:#fff;
          font-size:18px;
          background:linear-gradient(145deg,#617be7,#1e378e);
          box-shadow:
            4px 5px 9px rgba(21,37,75,.25),
            inset 2px 2px 4px rgba(255,255,255,.35),
            inset -2px -2px 4px rgba(0,0,0,.2);
          transition:.35s
        }

        .category-item:hover .category-icon{
          transform:translateY(-4px) rotate(-7deg) scale(1.08);
          box-shadow:0 10px 18px rgba(21,37,75,.3)
        }

        .popular-post img{
          width:65px;
          height:65px;
          border-radius:10px;
          object-fit:cover;
          margin-right:12px
        }

        .popular-title{
          font-size:13px;
          font-weight:700;
          color:#172653;
          line-height:1.3;
          margin-bottom:3px
        }

        .popular-date{
          font-size:11px;
          color:#878f9f
        }

        .popular-section{
          display:flex;
          flex-direction:column;
          justify-content:space-between
        }

        .all-btn{
          width:100%;
          margin-top:15px;
          padding:10px!important;
          border-radius:8px!important
        }

        /* ================= VOLUNTEER CTA ================= */

        .volunteer{
          background:linear-gradient(135deg,#0e236b,#1a348f);
          color:#fff;
          border-radius:20px;
          padding:45px 35px;
          margin-top:50px;
          box-shadow:0 15px 35px rgba(14,35,107,.3)
        }

        .vol-title{color:#fff}

        .vol-icon{
          width:60px;
          height:60px;
          background:rgba(255,255,255,.12);
          border-radius:15px;
          display:grid;
          place-items:center;
          margin-bottom:15px
        }

        .vol-btn{
          padding:12px 24px!important;
          border-radius:10px!important
        }

        /* ================= MODAL ================= */

        .vol-modal .modal-content{
          border-radius:20px;
          overflow:hidden;
          border:0
        }

        .vol-modal .modal-header{
          background:linear-gradient(135deg,#0c1d56,#172e7a);
          color:#fff;
          padding:20px 25px
        }

        .vol-modal .btn-close{filter:brightness(0) invert(1)}

        .vol-modal .form-control,
        .vol-modal .form-select{
          border-radius:10px;
          border:1px solid #dce1eb
        }

        .vol-modal .form-control:focus,
        .vol-modal .form-select:focus{
          border-color:#ed3540;
          box-shadow:0 0 0 .25rem rgba(237,53,64,.15)
        }

        .submit-btn{
          padding:10px 25px!important;
          border-radius:8px!important
        }

        /* ================= BLOG DETAILS MODAL ================= */

        .blogModalImage{
          width:100%;
          height:320px;
          object-fit:cover;
          border-radius:15px;
          margin-bottom:20px
        }

        .blogMeta{
          display:flex;
          gap:20px;
          color:#6c757d;
          font-size:13px;
          margin-bottom:15px
        }

        .blogMeta span{
          display:flex;
          align-items:center;
          gap:6px
        }

        .blogHeading{
          font-weight:700;
          color:#101f4c;
          margin-bottom:15px
        }

        .blogText{
          color:#4a5568;
          font-size:14px;
          line-height:1.8
        }

        /* ================= PAGINATION ================= */

        .pages{
          display:flex;
          justify-content:center;
          align-items:center;
          gap:10px;
          margin-top:40px
        }

        .page{
          width:40px;
          height:40px;
          border-radius:10px!important;
          background:#fff!important;
          border:1px solid #dce1eb!important;
          color:#152451!important;
          font-weight:700!important;
          display:grid;
          place-items:center;
          transition:.3s
        }

        .page:hover,
        .page.active{
          background:#ed3540!important;
          border-color:#ed3540!important;
          color:#fff!important
        }

        /* ================= RESPONSIVE ================= */

        @media(max-width:991px){
          .blog-hero{
            padding:120px 0 10%;
            text-align:center
          }

          .blog-desc{margin:auto}

          .blog-search{margin:20px auto 0}

          .blog-stats{justify-content:center}

          .hero-image-wrap{
            width:85%;
            height:350px;
            margin-top:30px
          }

          .sidebar{margin-top:40px}

          .volunteer{
            text-align:center;
            padding:40px 25px
          }

          .vol-icon{margin:0 auto 15px}

          .vol-btn{margin-top:20px}
        }

        @media(max-width:575px){
          .blog-hero{padding:120px 0 50px}
          .blog-title{font-size:35px}
          .blog-stats{flex-direction:column;align-items:center;gap:15px}
          .hero-image-wrap{width:95%;height:300px}
          .hero-image-wrap:before,.hero-img{border-radius:25px 65px 25px 65px}
          .blog-card img{height:200px}
          .section-head{align-items:flex-start!important;gap:20px;flex-direction:column}
          .blog-side{padding:18px}
          .popular-section{min-height:420px}
          .volunteer{padding:30px 20px}
          .vol-title{font-size:25px}
          .blog-search button{padding-left:12px;padding-right:12px}
          .blog-search button svg{display:none}
        }
      `}</style>

      {/* ================= HERO ================= */}

      <section className="blog-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="blog-label">OUR BLOG</div>

              <h1 className="blog-title">
                Stories of Change,
                <br />
                Updates that <span>Inspire</span>
              </h1>

              <p className="blog-desc">
                Stay updated with the latest stories, achievements, news and
                insights from our journey of creating a better tomorrow.
              </p>

             

              <div className="blog-stats">
                {stats.map((s, i) => (
                  <div className="blog-stat" key={i}>
                    <div className="stat-icon">{s[0]}</div>
                    <div>
                      <b>{s[1]}</b>
                      <br />
                      <small>{s[2]}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={6}>
              <div className="hero-image-wrap">
                <img src={heroImage} className="hero-img" alt="Our work" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= BLOG CONTENT ================= */}

      <main className="blog-main">
        <Container>
          <Row>
            {/* BLOG POSTS */}
            <Col lg={8}>
              <div className="section-head d-flex justify-content-between align-items-end mb-4">
                <div>
                  <div className="blog-label">LATEST STORIES</div>
                  <h2 className="section-title">Our Latest Blog Posts</h2>
                </div>

                {selectedCategory !== "All" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="me-2"
                    onClick={() => setSelectedCategory("All")}
                  >
                    Clear Filter ({selectedCategory}) ✕
                  </Button>
                )}

                <Button className="view-btn" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
                  View All
                  <BsArrowRight className="ms-2" />
                </Button>
              </div>

              <Row className="g-4">
                {filteredPosts.length === 0 ? (
                  <Col xs={12} className="text-center py-5">
                    <h5>No blog posts found matching your search or category.</h5>
                    <Button
                      variant="link"
                      onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                    >
                      Reset filters
                    </Button>
                  </Col>
                ) : (
                  filteredPosts.map((p, i) => (
                    <Col md={6} xl={4} key={i}>
                      <Card className="blog-card">
                        <img src={p[0]} alt={p[2]} />

                        <Card.Body className="blog-card-body">
                          <div className="blog-date">
                            <BsCalendar3 className="me-1" />
                            {p[1]}
                          </div>

                          <h3 className="post-title">{p[2]}</h3>

                          <p className="post-text">{p[3]}</p>

                          <Button
                            variant="link"
                            className="read-link p-0"
                            onClick={() => handleReadMore(p)}
                          >
                            View More →
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>

              {/* PAGINATION */}
              <div className="pages">
                {[1, 2, 3].map((n) => (
                  <Button
                    className={`page ${n === 1 ? "active" : ""}`}
                    key={n}
                  >
                    {n}
                  </Button>
                ))}
                <span>...</span>
                <Button className="page">10</Button>
                <Button className="page">
                  <BsArrowRight />
                </Button>
              </div>
            </Col>

            {/* SIDEBAR */}
            <Col lg={4} className="sidebar">
              {/* CATEGORIES */}
              <div className="blog-side">
                <h3 className="side-title">Categories</h3>

                {dynamicCategories.map((c, i) => (
                  <div
                    className={`category-item ${selectedCategory === c[0] ? "active-category" : ""}`}
                    key={i}
                    onClick={() => setSelectedCategory(selectedCategory === c[0] ? "All" : c[0])}
                  >
                    <div className="category-left">
                      <span className="category-icon">{c[2]}</span>
                      {c[0]}
                    </div>

                    <span>
                      <span className="count">{c[1]}</span>
                      <BsChevronRight className="ms-1" />
                    </span>
                  </div>
                ))}
              </div>

              {/* POPULAR POSTS */}
              <div className="blog-side popular-section">
                <h3 className="side-title">Popular Posts</h3>

                {popularPosts.map((p, i) => (
                  <div className="popular-post" key={i} onClick={() => handleReadMore(p)}>
                    <img src={p[0]} alt={p[2]} />
                    <div>
                      <div className="popular-title">{p[2]}</div>
                      <div className="popular-date">{p[1]}</div>
                    </div>
                  </div>
                ))}

                <Button className="all-btn" onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}>
                  View All Posts
                  <BsArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
          </Row>

          {/* ================= VOLUNTEER CTA ================= */}
          <section className="volunteer">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="vol-icon">
                  <BsPersonHeart size={32} />
                </div>
                <h2 className="vol-title">
                  Be the Change. Join Our Volunteer Community.
                </h2>
                <p>
                  Your time, skills and compassion can help us create
                  meaningful change in the lives of children, women and
                  communities.
                </p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Button className="vol-btn" onClick={() => setShowForm(true)}>
                  Become a Volunteer
                  <BsArrowRight className="ms-2" />
                </Button>
              </Col>
            </Row>
          </section>
        </Container>

        {/* ================= VOLUNTEER MODAL ================= */}
        <Modal
          className="vol-modal"
          show={showForm}
          onHide={() => setShowForm(false)}
          centered
          size="lg"
          scrollable
        >
          <Modal.Header closeButton>
            <div>
              <Modal.Title>Join Us as a Volunteer</Modal.Title>
              <small className="opacity-75">
                Be a part of our mission and make a difference.
              </small>
            </div>
          </Modal.Header>

          <Modal.Body className="p-4">
            <Form onSubmit={handleVolunteerSubmit}>
              <Row className="g-4">
                <Col xs={12} md={6}>
                  <FloatingLabel controlId="fullName" label="Full Name">
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col xs={12} md={6}>
                  <FloatingLabel controlId="email" label="Email Address">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col xs={12} md={6}>
                  <FloatingLabel controlId="phone" label="Phone Number">
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col xs={12} md={6}>
                  <FloatingLabel controlId="city" label="City">
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={volCity}
                      onChange={(e) => setVolCity(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>

                <Col xs={12}>
                  <FloatingLabel controlId="interest" label="Area of Interest">
                    <Form.Select
                      value={volInterest}
                      onChange={(e) => setVolInterest(e.target.value)}
                    >
                      <option value="">Select an area</option>
                      <option>Education</option>
                      <option>Healthcare</option>
                      <option>Women Empowerment</option>
                      <option>Environment</option>
                      <option>Community Service</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col xs={12}>
                  <FloatingLabel controlId="message" label="Why do you want to volunteer?">
                    <Form.Control
                      as="textarea"
                      placeholder="Tell us how you would like to contribute..."
                      style={{ height: "120px" }}
                      value={volMessage}
                      onChange={(e) => setVolMessage(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              className="cancel-btn px-4 border"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              className="submit-btn"
              onClick={handleVolunteerSubmit}
              disabled={submittingVol}
            >
              {submittingVol ? "Submitting..." : "Join as Volunteer"}
              <BsSendFill className="ms-2" />
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ================= BLOG DETAILS MODAL ================= */}
        <Modal
          show={showBlog}
          onHide={handleCloseBlog}
          centered
          size="lg"
          scrollable
          className="blogDetailsModal"
        >
          {selectedBlog && (
            <>
              <Modal.Header closeButton className="blogModalHeader">
                <div>
                  <Badge bg="danger" className="mb-2">
                    {selectedBlog[5] || "Latest Update"}
                  </Badge>
                  <Modal.Title>{selectedBlog[2]}</Modal.Title>
                </div>
              </Modal.Header>

              <Modal.Body className="p-4">
                <img
                  src={selectedBlog[0]}
                  alt={selectedBlog[2]}
                  className="blogModalImage"
                />

                <div className="blogMeta">
                  <span>
                    <BsCalendar3 />
                    {selectedBlog[1]}
                  </span>
                  <span>
                    <BsPerson />
                    Jagruti Foundation
                  </span>
                  <span>
                    <BsFolder />
                    {selectedBlog[5] || "Social Work"}
                  </span>
                </div>

                <h3 className="blogHeading">{selectedBlog[2]}</h3>

                <p className="blogText" style={{ whiteSpace: "pre-line" }}>
                  {selectedBlog[4] || selectedBlog[3]}
                </p>
              </Modal.Body>
            </>
          )}
        </Modal>
      </main>
    </>
  );
};

export default Blog;
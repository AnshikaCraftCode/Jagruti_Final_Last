import React from 'react'
import Heroimg from '../../assets/Donationprogramsimg/heroimg.png'
import "../../assets/CSS/DonationCSS/Hero.css"
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroI from '../../assets/Donationprogramsimg/Heros.png';
import {
  FaHeart,
  FaUsers,
  FaBookOpen,
  FaGlobe,
} from "react-icons/fa";

const Hero = () => {
  return (
    <>
        <section className='Hero-section'>
          <img src={HeroI} className="hero-image" alt="" />
          <Container className='Hero-content'>
            <h1 className="text-lg-start mt-5">Your Donation
              <br/>
            <span>Creates Change</span>
            </h1>
            
          
          <div className='hero-par-wrapper'>
            <p className='Heropar'>Your support helps Jagruti Foundation provide education,
              healthcare, women empowerment, elderly care and community development to those who need it the most.
            </p>
            </div>
  
          <div className="hero-buttons">

    <Button>Donate Now</Button>

    <Button>Learn More</Button>

</div>
<div className='statscard'>
          
               <Row className="MiniCard mt-lg-3 justify-content-center justify-content-lg-start g-4 " >

    <Col xs="3" lg="auto" className="mc  ">
    <div className='stickercontainer'>
        <FaUsers className="sticker"/>
        </div>
                  <h3>200+</h3>
                  <p>Lives Impacted</p>
    </Col>

    <Col xs="3" lg="auto" className="mc ">
    <div className='stickercontainer'>
         <FaHeart className="sticker" />
         </div>
                  <h3>500+</h3>
                  <p>Donors</p>
    </Col>

    <Col xs="3" lg="auto" className="mc ">
    <div className='stickercontainer'>
        <FaBookOpen className="sticker" />
        </div>
                  <h3>25+</h3>
                  <p>Programs</p>
    </Col>

    <Col xs="3" lg="auto" className="mc ">
    <div className='stickercontainer'>
       <FaGlobe className="sticker" />
       </div>
                  <h3>8+</h3>
                  <p>Years of Service</p>
    </Col>

</Row>
</div>
              </Container>
</section>        
    </>
  )
}

export default Hero

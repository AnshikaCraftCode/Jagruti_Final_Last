import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import MainNavbar from "./Pages/MainNavbar";
import Footer from "./Pages/Footer";
import FinalPrograms from "./Pages/Programs/FinalPrograms";
import FinalDonation from "./Pages/Donation/FinalDonation";

import './App.css'

function App() {
  return (
    <>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/program" element={<FinalPrograms />} />
        <Route path="/programs" element={<FinalPrograms />} />
        <Route path="/donate" element={<FinalDonation />} />
        <Route path="/donation" element={<FinalDonation />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

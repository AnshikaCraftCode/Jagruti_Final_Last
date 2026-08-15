import React, { useState, useEffect } from "react";
import { FaBookOpen, FaHeartbeat, FaLeaf, FaVenus, FaHandHoldingHeart } from "react-icons/fa";
import "../../assets/CSS/ProgramsCSS/Programs.css";
import ProgramCard from "./ProgramCard";
import educationImage from "../../assets/Donationprogramsimg/education.jpeg";
import environmentImage from "../../assets/Donationprogramsimg/environment.jpeg";
import womenEmpowermentImage from "../../assets/Donationprogramsimg/women-empowerment.jpeg";
import healthImage from "../../assets/Donationprogramsimg/health.jpeg";

const defaultPrograms = [
  {
    title: "Education",
    icon: FaBookOpen,
    tone: "red",
    image: educationImage,
    description:
      "We believe education is the foundation of a brighter tomorrow. Our education programs focus on improving access to quality learning, supporting school infrastructure, and nurturing young minds.",
    highlights: [
      "Support for school education",
      "Scholarships for deserving students",
      "Skill development and learning support",
      "Promoting digital literacy and life skills",
    ],
  },
  {
    title: "Environmental Projects",
    icon: FaLeaf,
    tone: "navy",
    image: environmentImage,
    description:
      "We are committed to protecting our planet for future generations. Our environmental initiatives promote sustainability, conservation, and responsible living.",
    highlights: [
      "Tree plantation and green cover drives",
      "Water conservation and waste management",
      "Clean and green community awareness",
      "Promoting sustainable living practices",
    ],
  },
  {
    title: "Women Empowerment",
    icon: FaVenus,
    tone: "navy",
    image: womenEmpowermentImage,
    description:
      "We empower women to lead independent and dignified lives by providing opportunities, resources, and a supportive environment.",
    highlights: [
      "Vocational training and skill development",
      "Awareness on health, rights and hygiene",
      "Support for self-help groups and small businesses",
      "Building confidence and leadership",
    ],
  },
  {
    title: "Health Initiatives",
    icon: FaHeartbeat,
    tone: "red",
    image: healthImage,
    description:
      "We promote good health and well-being for all through awareness, medical support, and preventive healthcare services.",
    highlights: [
      "Health camps and medical check-ups",
      "Awareness on nutrition, hygiene and sanitation",
      "Support for maternal and child health",
      "Emergency assistance and care support",
    ],
  },
];

const getIconComponent = (iconType) => {
  switch ((iconType || "").toLowerCase()) {
    case "education":
      return FaBookOpen;
    case "women":
      return FaVenus;
    case "health":
      return FaHeartbeat;
    case "environment":
      return FaLeaf;
    default:
      return FaHandHoldingHeart;
  }
};

function Programs() {
  const [displayPrograms, setDisplayPrograms] = useState(defaultPrograms);

  useEffect(() => {
    const fetchLivePrograms = async () => {
      try {
        const response = await fetch("http://localhost:8000/programs");
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => ({
            title: item.title,
            icon: getIconComponent(item.iconType),
            tone: idx % 2 === 0 ? "red" : "navy",
            image: item.image?.startsWith("http")
              ? item.image
              : `http://localhost:8000${item.image}`,
            description: item.description,
            highlights: Array.isArray(item.points) && item.points.length > 0
              ? item.points
              : ["Community welfare", "Active volunteer support", "Direct impact"],
          }));
          setDisplayPrograms(mapped);
        }
      } catch (err) {
        console.log("Using default programs (backend offline or empty):", err.message);
      }
    };

    fetchLivePrograms();
  }, []);

  return (
    <section className="programs-section" id="programs" aria-labelledby="programs-title">
      <div className="section-heading">
        <h2 id="programs-title">Our Programs</h2>
        <span aria-hidden="true" />
      </div>

      <div className="programs-list">
        {displayPrograms.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}
      </div>
    </section>
  );
}

export default Programs;
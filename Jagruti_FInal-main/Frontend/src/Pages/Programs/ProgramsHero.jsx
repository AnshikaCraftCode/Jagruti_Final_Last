import "../../assets/CSS/ProgramsCSS/ProgramsHero.css";
import heroImg from "../../assets/Donationprogramsimg/Hero.png";


function ProgramsHero() {
  return (
    <section className="programs-hero" aria-labelledby="programs-page-title">


      <img src={heroImg} alt="" className="programs-hero__bg" />
      <div className="programs-hero__overlay" aria-hidden="true" />

      <div className="programs-hero__content">
        <h1 id="programs-page-title">
          Our <span>Programs</span>
        </h1>
        <div className="programs-hero__line" />
        <p>
          Our programs are designed to empower individuals, uplift communities,
          and create sustainable change. Together, we build a better future for all.
        </p>
      </div>
    </section>
  );
}

export default ProgramsHero;

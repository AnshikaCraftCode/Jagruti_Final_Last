import "../../css/Hero.css";
import heroImage from "../../images/hero.png";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <h1 id="hero-title">
          Our <span>Programs</span>
        </h1>

        <div className="hero__line" />

        <p>
          Our programs are designed to empower individuals, uplift communities,
          and create sustainable change. Together, we build a better future for all.
        </p>
      </div>

      <div className="hero__image">
        <img
          src={heroImage}
          alt="Children supported by Jagruti Foundation"
        />
      </div>
    </section>
  );
}

export default Hero;

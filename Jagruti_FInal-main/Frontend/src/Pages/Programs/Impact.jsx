import { FaHeart, FaLeaf, FaStar, FaUsers } from "react-icons/fa";
import "../../assets/CSS/ProgramsCSS/Impact.css"

const impactItems = [
  {
    title: "Communities Empowered",
    subtitle: "Stronger together",
    icon: FaUsers,
    tone: "red",
  },
  {
    title: "Sustainable Impact",
    subtitle: "For future generations",
    icon: FaLeaf,
    tone: "navy",
  },
  {
    title: "Lives Transformed",
    subtitle: "Through care & support",
    icon: FaHeart,
    tone: "red",
  },
  {
    title: "Hope for All",
    subtitle: "A brighter tomorrow",
    icon: FaStar,
    tone: "navy",
  },
];

function Impact() {
  return (
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="section-heading impact-section__heading">
        <h2 id="impact-title">Creating a Better Tomorrow</h2>
        <span aria-hidden="true" />
      </div>

      <div className="impact-grid">
        {impactItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="impact-item" key={item.title}>
              <span className={`impact-item__icon impact-item__icon--${item.tone}`}>
                <Icon aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Impact;
import { FaCheckCircle } from "react-icons/fa";

function ProgramCard({ program }) {
  const Icon = program.icon;

  return (
    <article className={`program-card program-card--${program.tone}`}>
      <div className="program-card__header">
        <span className="program-card__icon" aria-hidden="true">
          <Icon />
        </span>
        <div>
          <h3>{program.title}</h3>
          <span className="program-card__underline" />
        </div>
      </div>

      <div className="program-card__image">
        <img src={program.image} alt={program.title} loading="lazy" />
      </div>

      <div className="program-card__body">
        <p>{program.description}</p>

        <ul>
          {program.highlights.map((highlight) => (
            <li key={highlight}>
              <FaCheckCircle aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <Icon className="program-card__watermark" aria-hidden="true" />
    </article>
  );
}

export default ProgramCard;
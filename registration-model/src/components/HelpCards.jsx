import "./HelpCards.css";

export default function HelpCards() {
  const cards = ["Create", "Approve", "Disapprove"];
  return (
    <div className="cards-container">
      {cards.map((title) => (
        <div className="card" key={title}>
          <h3>{title}</h3>
          <p>Last updated: Just Now</p>
        </div>
      ))}
    </div>
  );
}

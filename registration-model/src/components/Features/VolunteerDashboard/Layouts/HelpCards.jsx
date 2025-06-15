export default function HelpCards() {
  const cards = ["Create", "Approve", "Disapprove"];

  return (
    <div className="d-flex gap-3 p-3 flex-wrap">
      {cards.map((title) => (
        <div
          className="card shadow-sm p-3"
          style={{
            backgroundColor: "#f4f2f2",
            borderRadius: "10px",
            width: "200px"
          }}
          key={title}
        >
          <h5 className="text-danger">{title}</h5>
          <p className="text-muted mb-0">Last updated: Just Now</p>
        </div>
      ))}
    </div>
  );
}
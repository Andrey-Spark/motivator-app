import React from "react";

export default function ChallengeCard({ challenge }) {
  if (!challenge) return null;
  return (
    <div style={{ border: "1px solid black", padding: "15px", margin: "10px" }}>
      <h3>{challenge.title}</h3>
      <p>Уровень: {challenge.level}</p>
      <p>{challenge.description}</p>
    </div>
  );
}
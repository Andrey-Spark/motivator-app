import React from "react";

export default function Buttons({ onClickChallenge }) {
  return (
    <div style={{ margin: "20px" }}>
      <button onClick={() => onClickChallenge("easy")}>Лёгкий челлендж</button>
      <button onClick={() => onClickChallenge("medium")}>Средний челлендж</button>
      <button onClick={() => onClickChallenge("hard")}>Сложный челлендж</button>
    </div>
  );
}
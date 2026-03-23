import React from "react";

export default function Leaderboard({ scores }) {
  return (
    <div style={{ margin: "20px" }}>
      <h2>Таблица лидеров</h2>
      <ol>
        {scores.map((player, index) => (
          <li key={index}>
            {player.name} — {player.points} очков
          </li>
        ))}
      </ol>
    </div>
  );
}
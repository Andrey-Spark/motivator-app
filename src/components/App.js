import React, { useState } from "react";
import Buttons from "./components/Buttons";
import ChallengeCard from "./components/ChallengeCard";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [scores, setScores] = useState([
    { name: "Андрей", points: 0 },
    { name: "Юлия", points: 0 },
  ]);

  const challenges = {
    easy: { title: "10 отжиманий", level: "Лёгкий", description: "Сделай 10 отжиманий." },
    medium: { title: "20 приседаний", level: "Средний", description: "Сделай 20 приседаний." },
    hard: { title: "5 км пробежки", level: "Сложный", description: "Пробежка на 5 км." },
  };

  const handleClickChallenge = (level) => {
    const challenge = challenges[level];
    setCurrentChallenge(challenge);

    // Добавим очки за выполнение
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[0].points += level === "easy" ? 10 : level === "medium" ? 20 : 30;
      return newScores.sort((a, b) => b.points - a.points);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>AI-Мотивация PRO</h1>
      <Buttons onClickChallenge={handleClickChallenge} />
      <ChallengeCard challenge={currentChallenge} />
      <Leaderboard scores={scores} />
    </div>
  );
}
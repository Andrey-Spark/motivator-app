import React, { useState, useEffect } from "react";
import "./App.css";

const SERVER = "https://neurospark-1.onrender.com";

export default function App() {
  const [username, setUsername] = useState("");      // имя пользователя
  const [leaders, setLeaders] = useState([]);        // таблица лидеров
  const [xp, setXp] = useState(0);                   // текущий XP пользователя
  const [level, setLevel] = useState(1);             // текущий уровень
  const [medals, setMedals] = useState([]);          // медали
  const [challenge, setChallenge] = useState("");    // текущий челлендж

  const SERVER = "http://127.0.0.1:8000";            // адрес FastAPI

  // --- Логин пользователя ---
  const handleLogin = async () => {
    if (!username) return alert("Введите имя!");
    await fetch(`${SERVER}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username }),
    });
    fetchXP();
    fetchLeaders();
  };

  // --- Получаем таблицу лидеров ---
  const fetchLeaders = async () => {
    try {
      const res = await fetch(`${SERVER}/leaders`);
      const data = await res.json();
      setLeaders(data);
    } catch (err) {
      console.log("Ошибка получения лидеров:", err);
    }
  };

  // --- Получаем текущий XP пользователя ---
  const fetchXP = () => {
    const user = leaders.find(u => u[0] === username);
    if (user) {
      setXp(user[1]);
      setLevel(Math.floor(user[1] / 50) + 1);  // например, каждый 50 XP = новый уровень
      updateMedals(user[1]);
    }
  };

  // --- Добавляем XP за челлендж ---
  const completeChallenge = async () => {
  if (!username) return alert("Сначала залогиньтесь!");

  await fetch(`${SERVER}/add_xp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: username }),
  });

  await fetchLeaders();   // ждем обновление
  fetchXP();              // сразу обновляем XP

  alert("Челлендж выполнен! +10 XP");
};

  // --- Медали за достижения ---
const updateMedals = (xp) => {
  const list = [];

  if (xp >= 10) list.push({ label: "🥉 Новичок", type: "bronze" });
  if (xp >= 50) list.push({ label: "🥈 Опытный", type: "silver" });
  if (xp >= 100) list.push({ label: "🥇 Мастер", type: "gold" });

  setMedals(list);
};
  // --- Эффект: обновление XP при смене лидеров ---
  useEffect(() => {
    fetchXP();
  }, [leaders]);

  // --- Список челленджей (адаптивные, без OpenAI) ---
  const challenges = [
    "Сделать 10 приседаний",
    "Прочитать 5 страниц книги",
    "Сделать 10 отжиманий",
    "Написать короткую заметку"
  ];

  const generateChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setChallenge(challenges[randomIndex]);
  };

 return (
  <div className="App">
    <h1>🔥 Motivator Game</h1>

    {/* Логин */}
    <div className="card">
      <input
        type="text"
        placeholder="Введите имя"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>

    {/* Профиль */}
    <div className="card">
      <h2>{username || "Гость"}</h2>
      <p>XP: {xp}</p>
      <p>Уровень: {level}</p>

      <div>
        {medals.map((m, i) => (
          <span key={i} className={`medal ${m.type}`}>
            {m.label}
          </span>
        ))}
      </div>
    </div>

    {/* Челлендж */}
    <div className="card">
      <button onClick={generateChallenge}>🎯 Новый челлендж</button>

      {challenge && (
        <>
          <p>{challenge}</p>
          <button onClick={completeChallenge}>✅ Выполнено</button>
        </>
      )}
    </div>

    {/* Лидеры */}
    <div className="card">
      <h2>🏆 Лидеры</h2>
      <ol className="leaderboard">
        {leaders.map((user, index) => (
          <li key={index}>
            {user[0]} — {user[1]} XP
          </li>
        ))}
      </ol>
       </div>
    </div>
);
}
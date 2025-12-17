import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [restaurants, setRestaurants] = useState([
    { name: "Pizza Palace", rating: 4.6 },
    { name: "Spicy Treat", rating: 4.5 },
    { name: "Burger Hub", rating: 4.3 },
  ]);

  // Simulate real-time rating updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRestaurants((prev) => {
        return prev.map((r) => ({
          ...r,
          rating: (r.rating + Math.random() * 0.2 - 0.1).toFixed(1),
        })).sort((a, b) => b.rating - a.rating);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-page">
      <h1 className="heading">🏆 Top Restaurants</h1>
      <div className="leaderboard-grid">
        {restaurants.map((res, idx) => (
          <div key={idx} className="leaderboard-card">
            <h2>{res.name}</h2>
            <p>⭐ {res.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

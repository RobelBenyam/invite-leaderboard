import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          "https://chewata-invite-board-api.vercel.app/playcount"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        // Ensure the data is sorted by referralCount in descending order
        const sortedData = data.sort((a, b) => b.score || 0 - a.score || 0);
        // Limit the data to the top 300 users
        setLeaderboardData(sortedData.slice(0, 300));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchLeaderboardData();
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-container">
          <PulseLoader color="#36d7b7" size={20} />
        </div>
      ) : (
        <div className="leaderboard-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div>
              <h1 className="leaderboard-title">Score Leaderboard</h1>
              <div className="leaderboard-content">
                <div className="leaderboard-cards">
                  {leaderboardData.slice(0, 3).map((user, index) => (
                    <div
                      key={index}
                      className={`leaderboard-card rank-${index + 1}`}
                    >
                      <div className="ranking">{index + 1}</div>
                      <div className="name">{user.name || "👤"}</div>
                      <div className="invite-count">
                        Score : {user.score || 0}
                      </div>
                    </div>
                  ))}
                </div>
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>

                      <th scope="col">Name</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.slice(3).map((user, index) => (
                      <tr key={index + 3}>
                        <td>{index + 4}</td>

                        <td>{user.name || "👤"}</td>
                        <td>{user.score || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

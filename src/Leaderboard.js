import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          "https://chewata.alwaysdata.net/leaderboard"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
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
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <div className="leaderboard-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Name</th>
                  <th scope="col">Invite Count</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" className={`ranking rank-${index + 1}`}>
                      {index + 1}
                    </th>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.invite_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch the leaderboard data from the backend (placeholder for now)
    Copy;
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          "https://chewata.alwaysdata.net/api/top-invites"
        );
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Invite Leaderboard</h1>
      <div className="table-responsive">
        <table className="leaderboard-table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Invite Count</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.inviteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard"; // Your Leaderboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/leaderboard/:userId" element={<Leaderboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:userId" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Leaderboard from "./Leaderboard";

// function App() {
//   return (
//     <div className="App">
//       <Leaderboard />
//     </div>
//   );
// }

// export default App;

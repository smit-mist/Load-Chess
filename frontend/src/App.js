import Analysis from "./pages/Analysis";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTV from "./pages/ChessTV";
import BroadCast from "./pages/BroadCast";
import DisplayTournament from "./pages/DisplayTournament";

function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar
          pages={["Home", "Analysis", "TV", "News", "Broadcast"]}
          link={["/", "/analysis", "/tv", "/news", "/broadcast"]}
          color="primary"
        />

        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/tv" element={<ChessTV />} />
          <Route path="/news" element={<h1>This is News</h1>} />
          <Route path="/broadcast" element={<BroadCast />} />
          <Route path="/tournament/:slug/:id" element={<DisplayTournament />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

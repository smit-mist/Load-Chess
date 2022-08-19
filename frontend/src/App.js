import Analysis from "./pages/Analysis";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTV from "./pages/ChessTV";
import BroadCast from "./pages/BroadCast";

function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar
          pages={["Home", "Analysis", "TV", "News", "Brodcast"]}
          link={["/", "/analysis", "/tv","/news", "/brodcast"]}
          color="primary"
        />

        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/tv" element={<ChessTV />} />
          <Route path="/news" element={<h1>This is News</h1>} />
          <Route path="/broadcast" element={<BroadCast/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

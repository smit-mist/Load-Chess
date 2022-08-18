import Analysis from "./Analysis";
import PlayRandomMoveEngine from "./Test";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <ResponsiveAppBar />

        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/tv" element={<h1>This is Live TV</h1>} />
          <Route path="/news" element={<h1>This is News</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

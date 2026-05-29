import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Socket from "./pages/Socket";
import Poll from "./pages/Poll";

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/socket">WebSocket</Link>
        <Link to="/poll">Long Polling</Link>
      </nav>
      <Routes>
        <Route path="/socket" element={<Socket />} />
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Socket from "./pages/Socket";
import Poll from "./pages/Poll";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Link className="title" to="/">
        <h1>Chat App</h1>
      </Link>
      <Nav />
      <Routes>
        <Route path="/socket" element={<Socket />} />
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

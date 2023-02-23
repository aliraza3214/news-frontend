import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Setting from "./component/Setting";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>

    </div>
  );
}
export default App;

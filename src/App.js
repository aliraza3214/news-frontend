import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import "./App.scss";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </div>
  );
}
export default App;

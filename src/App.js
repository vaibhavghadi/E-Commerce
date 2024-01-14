import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/User";
import Private from "./components/Private";
import Add from "./components/Add";
import Update from "./components/Update";
import Profile from "./components/Profile";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Private />}>
            <Route path="/update/:id" element={<Update />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/" element={<Products />}></Route>
          </Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

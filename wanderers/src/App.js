import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleHotel from "./Pages/SingleHotel/SingleHotel";
import Home from "./Pages/Home/Home";
import List from "./Pages/List/List";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
function App() {
  const [googleUser, setgoogleUser] = useState(null);
  useEffect(() => {
    const fetchGoogleUser = () => {
      fetch("http://localhost:8000/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has been failed");
        })
        .then((resObject) => {
          setgoogleUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchGoogleUser();
  }, []);
  console.log(googleUser, "GoogleUser");
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home googleUser={googleUser} />} />
          <Route path="/hotels" element={<List />} />
          <Route
            path="/hotels/:id"
            element={<SingleHotel googleUser={googleUser} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

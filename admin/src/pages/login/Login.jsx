import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import './login.scss'
// import login_video from "../../assets/home2.mp4"
// import GoogleButton from 'react-google-button'
import { AuthContext } from '../../context/AuthContext'
const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if(res.data.isAdmin){
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      navigate("/")
      }else{
      dispatch({ type: "LOGIN_FAILURE", payload: {message:'You are not allowed!'} });

      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  // console.log(user);
  return (
    <div className="login">
      {/* <video src={login_video} autoPlay loop muted></video> */}
      <div className="loginContainer">
        <div className="inputsContainer">
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Username"
            className="loginInputs"
          /> <br />
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
            className="loginInputs"
          /><br />
          <button className="login_btn" onClick={handleLogin}>
            Login
          </button>
          {error && <span className="login_error">{error.message}</span>}
        </div>
       

      </div>

    </div>
  );
};

export default Login;

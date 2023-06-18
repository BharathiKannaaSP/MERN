import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import './login.css'
import login_video from "../../assets/home2.mp4"
import GoogleButton from 'react-google-button'
import { loginFailure, loginStart, loginSuccess } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  // const { user, loading, error } = useContext(AuthContext);
  const dispatch = useDispatch()
const error = useSelector(state =>state.auth.error)
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
    const handleGoogleLogin = () => {
      window.open(
        'http://localhost:8000/api/auth/google/callback',
        "_self"
      );
    };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch(loginSuccess(res.data.details));
      console.log(res.data.details,"USER");
      navigate("/")
    } catch (err) {
      dispatch(loginFailure(err.response.data));
    }
  };
  // console.log(user);
  return (
    <div className="login">
      <video src={login_video} autoPlay loop muted></video>
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

            <GoogleButton
            style={{margin:'20px'}}
              onClick={handleGoogleLogin}
            />
          {error && <span className="login_error">{error.message}</span>}
        </div>
        <span className="newUser">New User? <span onClick={() => navigate('/register')}>Create an Account</span></span>

      </div>

    </div>
  );
};

export default Login;

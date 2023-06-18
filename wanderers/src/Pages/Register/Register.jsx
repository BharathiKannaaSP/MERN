import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import '../Register/Register.css'
import register_video from "../../assets/home2.mp4"
import { loginFailure, registerStart, registerSuccess } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  // const { user, loading, error, dispatch } = useContext(AuthContext);
  const dispatch = useDispatch()
  const error = useSelector(state => state.auth.error)
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleregister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch(registerSuccess(res.data.details));
      console.log(res.data.details, "REGISTER USER");

      navigate("/login")
      toast("Registered Successfully!")
    } catch (err) {
      dispatch(loginFailure(err.response.data));
    }
  };
  return (
    <div className="register">
      {/* <video src={register_video} autoPlay loop muted></video> */}
      <div className="registerContainer">
        <div className="inputsContainer">
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Username"
            className="registerInputs"
          /> <br />
          <input
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Email"
            className="registerInputs"
          /> <br />
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
            className="registerInputs"
          /><br />
          <button className="register_btn" onClick={handleregister}>
            SIGNUP
          </button>
          <div className="register_error">
            {error &&
              <span>{error.message}</span>}
          </div>
          <p style={{ color: 'white' }}>Already an User? <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span></p>

        </div>

      </div>

    </div>
  );
};

export default Register;

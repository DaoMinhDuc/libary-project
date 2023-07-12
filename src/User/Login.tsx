import {Link, useNavigate} from "react-router-dom";
import { useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "./userSlice";

import './Login.css'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const redirectToHomePage = () => {
    if (username && password) {
      dispatch(login({ username, password }));
      navigate(`/`);
    } else {
      alert('Vui lòng nhập username hoặc password');
    }
  };

  return (
    <>
  <div className="Login-form">
  <h3>Đăng nhập tài khoản của bạn</h3>
    <input className="input-field" placeholder="Tài Khoản" onChange={(e) => setUsername(e.target.value)}/>
  
    <input className="input-field" placeholder="Mật Khẩu" onChange={(e) => setPassword(e.target.value)} />
    <br/>
    <button className="button-login" onClick={redirectToHomePage}>Đăng nhập</button>
    <p>Chưa có tài khoản <Link  to="/sign-up">đăng kí</Link></p>
  </div>

  </>
)}

export default Login
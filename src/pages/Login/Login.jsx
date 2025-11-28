import React, { useState } from "react";
import "./Login.css";
import logo_header from "../../assets/img/logo_header.png";
import { login, signup } from "../../fireBase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user_auth = async (event) => {
    event.preventDefault();
    console.log("email:", email, "password:", password); 
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/browse");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login">
      <img
        src={logo_header}
        alt="logo-header"
        className="w-[100px] ml-[60px] pt-[20px] cursor-pointer"
      />
      <div className="login-form w-[100%] max-w-[380px] rounded-[4px] p-[20px] m-auto">
        <h1 className="text-[24px] mb-[20px] font-medium">{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              className="w-[100%] bg-[#333] text-[#fff] m-[18px_0] border-0 outline-0 rounded-[5px] p-[15px_14px] text-[14px] font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            className="w-[100%] bg-[#333] text-[#fff] m-[18px_0] border-0 outline-0 rounded-[5px] p-[15px_14px] text-[14px] font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="w-[100%] bg-[#333] text-[#fff] m-[18px_0] border-0 outline-0 rounded-[5px] p-[15px_14px] text-[14px] font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button
            className="w-[100%] border-0 outline-0 p-[12px] bg-[#e50914] text-[#fff] rounded-[4px] text-[14px] font-medium mt-[12px] cursor-pointer"
            type="submit"
          >
            {signState}
          </button>
          <div className="help-box flex items-center justify-between mt-[12px] text-[#b3b3b3] text-[12px]">
            <div className="remember flex items-center gap-[4px]">
              <input
                className="w-[14px] h-[14px]"
                type="checkbox"
                name="rememberMe"
              />
              <label className="ml-[4px]">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="mt-[12px] text-[#737373] text-[12px]">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => setSignState("Sign Up")}
                className="ml-[4px] text-[#fff] font-medium cursor-pointer"
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => setSignState("Sign In")}
                className="ml-[4px] text-[#fff] font-medium cursor-pointer"
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

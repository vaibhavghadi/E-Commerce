import React, { useState } from "react";
import "../styles/User.css";
import login1 from "../images/login.png";
import { useNavigate } from "react-router-dom";

export default function User() {
  let [login, setLogin] = useState({ email: "", pass: "" });
  let [sign, setSign] = useState({
    name: "",
    email: "",
    pass: "",
    page: false,
  });

  let navigate = useNavigate();

  const signin = async () => {
    const result = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify({
        email: login.email,
        pass: login.pass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    if (data.result.length > 0) {
      const name = data.result[0].name;
      alert("login");
      navigate("/");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: login.email, name: name })
      );
      localStorage.setItem("token", data.auth);
    } else {
      alert("user not registerd");
    }
  };

  const signup = async () => {
    const result = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify({
        email: sign.email,
        pass: sign.pass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    if (data.result.length > 0) {
      alert("user is already registred");
      setSign({ name: "", email: "", pass: "" });
    } else {
      const result1 = await fetch("http://localhost:3000/register", {
        method: "post",
        body: JSON.stringify({
          name: sign.name,
          email: sign.email,
          pass: sign.pass,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await result1.json();
      console.log(data);

      if (data.value) {
        alert("you are succesfully signed in !!!");
        navigate("/user");
        setSign({ name: "", email: "", pass: "" });
      }
    }
  };

  return (
    <>
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src={login1} alt="" />
            <div className="text">
              <span className="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="text"
                      id="lname"
                      placeholder="Enter your email"
                      required
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="text"
                      id="lpass"
                      placeholder="Enter your password"
                      required
                      onChange={(e) =>
                        setLogin({ ...login, pass: e.target.value })
                      }
                    />
                  </div>
                  <div className="text">
                    <a href="/user">Forgot password?</a>
                  </div>
                  <div className="button input-box">
                    <input type="button" value="Sumbit" onClick={signin} />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account?{" "}
                    <label htmlFor="flip">Sigup now</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={sign.name}
                      onChange={(e) =>
                        setSign({ ...sign, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                      value={sign.email}
                      onChange={(e) =>
                        setSign({ ...sign, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={sign.pass}
                      onChange={(e) =>
                        setSign({ ...sign, pass: e.target.value })
                      }
                    />
                  </div>
                  <div className="button input-box">
                    <input type="button" value="Sumbit" onClick={signup} />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account?{" "}
                    <label htmlFor="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

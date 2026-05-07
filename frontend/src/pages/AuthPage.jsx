import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";

const AuthPage = () => {
  const [isActive, setIsActive] =
    useState(false);

  const navigate = useNavigate();

  const {
    login,
    register,
    loading,
  } = useAuth();

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });

  const [
    registerData,
    setRegisterData,
  ] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const result = await login(
      loginData
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const result = await register(
      registerData
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div
        className={`container ${
          isActive
            ? "right-panel-active"
            : ""
        }`}
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={
                registerData.password
              }
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password:
                    e.target.value,
                })
              }
            />

            <button>
              {loading
                ? "Loading..."
                : "Sign Up"}
            </button>

            <button 
              type="button" 
              className="mobile-toggle"
              onClick={() => setIsActive(false)}
            >
              Already have an account? Sign In
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={
                loginData.password
              }
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password:
                    e.target.value,
                })
              }
            />

            <button>
              {loading
                ? "Loading..."
                : "Sign In"}
            </button>

            <button 
              type="button" 
              className="mobile-toggle"
              onClick={() => setIsActive(true)}
            >
              Don't have an account? Sign Up
            </button>

            {error && (
              <p className="error-text">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>
                Welcome Back!
              </h1>

              <p>
                Please login with your
                personal info
              </p>

              <button
                className="ghost"
                onClick={() =>
                  setIsActive(false)
                }
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>
                Hello, Friend!
              </h1>

              <p>
                Enter your details and
                start your journey
              </p>

              <button
                className="ghost"
                onClick={() =>
                  setIsActive(true)
                }
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

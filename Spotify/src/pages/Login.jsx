import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Capture response
      const res = await login(form);

      // ✅ Store user BEFORE navigation
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("User saved:", res.data.user);

      // ✅ ALWAYS use lowercase routes
      navigate("/music");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Login</h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      {/* Navigate to register */}
      <button
        onClick={() => navigate("/register")}
        style={{
          background: "#ff416c",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          position: "fixed",
          bottom: "30px",
          right: "30px",
        }}
      >
        New User
      </button>
    </>
  );
}

export default Login;

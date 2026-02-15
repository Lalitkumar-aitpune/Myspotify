import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      console.log("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Register</h2>

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

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
          <input 
              name="adminKey" 
              placeholder="Admin Key (optional)" 
              onChange={handleChange}
          />

          <button>Register</button>
        </form>
      </div>
      <button
        onClick={() => navigate("/login")}
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
        Already have an account
      </button>
    </>
  );
}

export default Register;

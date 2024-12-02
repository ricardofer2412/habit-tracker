import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { email: string; password: string }) => user.email === email
    );

    if (user && user.password === password) {
      localStorage.setItem("token", "dummy-token"); // Mock token for local use
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./Login.css";
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/api/user/register" 
    
    const FormData = {
      email : email,
      password : password,
      fullName : fullName
    }

    try{
      const res = await axios.post(url,{...FormData},{withCredentials:true})
      console.log("data sent",FormData)
    }
    catch(err){
      console.log("error hai",err)
    }

    // Simple check (you can replace this with backend API later)
    if (email === "admin@example.com" && password === "123456") {
      setMessage("✅ Login Successful!");
    } else {
      setMessage("❌ Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;

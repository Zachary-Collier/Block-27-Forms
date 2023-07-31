import React, { useState } from "react";
import "../SignUpFormPrettyStyles.css";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [goodToGoSignUp, setGoodToGoSignUp] = useState(null);

  async function handleSubmit(e) {
    event.preventDefault();
    if (username.length === 5) {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: `${username}`,
              password: `${password}`,
            }),
          }
        );
        const result = await response.json();
        setToken(result.token);

        if (result.success) setGoodToGoSignUp(result.message);
        console.log(result);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setGoodToGoSignUp(
        "Your username has to be exactly 5 characters long to submit."
      );
    }
  }

  return (
    <div className="form section">
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="button">Submit</button>
      </form>
      {username && (
        <p>
          {username.length < 5
            ? `Username must be exactly 5 characters long. You have 
              ${5 - username.length} 
            characters remaining`
            : username.length > 5
            ? `Username is too long, remove ${username.length - 5} characters.`
            : "Your username fits perfectly."}
        </p>
      )}
      {goodToGoSignUp && (
        <h3>
          {goodToGoSignUp} {username.length === 5 ? username : ""}
        </h3>
      )}
    </div>
  );
}

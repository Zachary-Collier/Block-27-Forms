import { useState } from "react";
import "../AuthenticationPrettyStyles.css"

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function handleClick() {
    try {
      if (error) setError(null);  
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUser(result.data.username);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="good section">
      <h2>Your Completed Authentication {user}!</h2>
      {error && (<p>{error} You need to submit the signup form prior to authenticating.</p>)}
      {successMessage && <p>{successMessage}</p>}
      <button className="button" onClick={handleClick}>Authenticate Token!</button>
      {user && <h3>You are good to go {user}!!</h3>}
    </div>
  );
}

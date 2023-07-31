import React, { useState } from "react";

import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css"; //when this line is added everything is now centered on the web page//

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </>
  );
}

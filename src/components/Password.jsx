import { useRef } from "react";

import "./Password.css";

const Password = ({ text, password, setPassword }) => {
  const inputRef = useRef();

  function handlePassword(e) {
    const type = inputRef.current.type === "password" ? "text" : "password";
    inputRef.current.type = type;

    e.target.classList.toggle("fa-eye");
    e.target.classList.toggle("fa-eye-slash");
  }

  return (
    <label className="password-container">
      <p>
        {text} <span className="mandatory">*</span>
      </p>
      <input
        type="password"
        placeholder={text}
        ref={inputRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <i className="fas fa-eye" onClick={handlePassword}></i>
    </label>
  );
};

export default Password;

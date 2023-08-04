import React from "react";
import AuthForm from "./AuthForm";

function Login({ handleAuth }) {

  function handleSubmit(e, password, email) {
    e.preventDefault();
    handleAuth(password, email)
  }

  return (
    <AuthForm title="Вход" textOfButton="Войти" handleSubmit={handleSubmit} />
  );
}

export default Login;

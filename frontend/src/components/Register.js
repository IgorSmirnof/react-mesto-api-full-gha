import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register({ handleReg }) {

  function handleSubmit(e, password, email) {
    e.preventDefault();
    handleReg(password, email);
  }

  return (
    <AuthForm
      title="Регистрация"
      textOfButton="Зарегистрироваться"
      handleSubmit={handleSubmit}
      pathOfButton="/sign-up"
    >
      <p className="entry-form__subtext">
        Уже зарегистрированы? &nbsp;
        <Link className="entry-form__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </AuthForm>
    // <h2 color="white">register link "/sign-up"</h2>
  );
}

export default Register;

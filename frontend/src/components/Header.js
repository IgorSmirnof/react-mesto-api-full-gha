import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo-blanco.svg";

export default function Header({ email, loggedIn, isSign }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {loggedIn ? (
        <div className="header__entry">
          <p>{email}</p>
          <Link className="header__link" to="/sign-in" onClick={isSign}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__button"
          to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
        >
          {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
        </Link>
      )}
    </header>
  );
}

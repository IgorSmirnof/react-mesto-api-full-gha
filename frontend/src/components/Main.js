import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile" aria-label="Информация о пользователе.">
        <div className="avatar" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Фото пользователя."
            className="avatar__img"
          />
        </div>

        <div className="profile__user">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-edit button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__button-add button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Фото мест.">
        <ul className="cards">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

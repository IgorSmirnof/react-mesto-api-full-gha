import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const handleCardClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like button ${isLiked && 'card__like_active'}`);
  

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleCardClick}
      />
      {isOwn && <button className='card__basura button' onClick={handleDeleteClick} />}
      {/* <button type="button" className="card__basura button" ></button> */}
      <div className="card__subtitle">
        <h2 className="card__place">{card.name}</h2>
        <div className="card__like-wrap">
          
          <button type="button" className={cardLikeButtonClassName}  onClick={handleLikeClick} ></button>
          <span className="card__like-qty">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;

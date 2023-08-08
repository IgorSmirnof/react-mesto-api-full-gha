import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
// import Popup from "./Popup";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // console.log(currentUser);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    onUpdateUser({
      name,
      about: description,
    });
    
  }
  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetDescription(e) {
    setDescription(e.target.value);
  }
  // isOpen, name, onClose, children, container

  // const title = "Редактировать профиль"
  // const buttonText = 'Сохранить'
  return (

    // <Popup
      
    //   isOpen={isOpen}
    //   name={name}
    //   onClose={onClose}
    //   // card={card}
    //   container='container'
    //   onSubmit={handleSubmit}
    // >
      
    //   <h2 className="popup__title">{title}</h2>
    //   <input
    //       id="input-name"
    //       className="popup__input popup__input_field_name"
    //       minLength="2"
    //       maxLength="40"
    //       required
    //       placeholder=" Введите имя"
    //       onChange={handleSetName}
    //       name="name"
    //       value={name ?? ""}
    //     />
    //     <span className="input-name-error input-error"></span>

    //     <input
    //       id="input-description"
    //       className="popup__input popup__input_field_description"
    //       minLength="2"
    //       maxLength="200"
    //       required
    //       placeholder=" Вид деятельности"
    //       onChange={handleSetDescription}
    //       name="about"
    //       value={description ?? ""}
    //     />
    //     <span className="input-description-error input-error"></span>
    //     <button className="popup__button-save button" type="submit">{buttonText}</button>
      
    // </Popup>

    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
        <input
          id="input-name"
          className="popup__input popup__input_field_name"
          minLength="2"
          maxLength="40"
          required
          placeholder=" Введите имя"
          onChange={handleSetName}
          name="name"
          value={name ?? ""}
        />
        <span className="input-name-error input-error"></span>

        <input
          id="input-description"
          className="popup__input popup__input_field_description"
          minLength="2"
          maxLength="200"
          required
          placeholder=" Вид деятельности"
          onChange={handleSetDescription}
          name="about"
        value={description ?? ""}
        />
        <span className="input-description-error input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import React, { useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    valueLink.current.value = "";
  }, [currentUser, isOpen]);

  const valueLink = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        valueLink.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="input-avatar"
        className="popup__input popup__input_avatar"
        minLength="2"
        required
        placeholder=" Введите ссылку на изображение"
        type="url"
        ref={valueLink}
        name="avatar"
      />
      <span className="input-avatar-error input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

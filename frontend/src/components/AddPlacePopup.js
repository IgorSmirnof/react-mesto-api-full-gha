import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: link,
    });
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="image_add"
      isOpen={isOpen}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="input-place"
        className="popup__input popup__input_field_place"
        minLength="2"
        maxLength="30"
        required
        placeholder=" Название"
        name="name"
        value={place ?? ""}
        onChange={(e) => setPlace(e.target.value)}
      />
      <span className="input-place-error input-error"></span>
      <input
        id="input-link"
        className="popup__input popup__input_field_link"
        type="url"
        required
        placeholder=" Ссылка на картинку"
        name="link"
        value={link ?? ""}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="input-link-error input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

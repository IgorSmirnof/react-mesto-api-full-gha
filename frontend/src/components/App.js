import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("email");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isSuccessRegister, setIsSuccesRegister] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => console.log(" еггог получения промиса", err));
  }, []); // <----<< [] -- при монтировании один раз!

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.data.email);
            // console.log(data.data.email)
          }
        })
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
    //eslint-disable-next-line
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(" еггог кард лайк", err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log("error delete card :" + err));
  }

  function handleUpdateUser(value) {
    api
      .setUserInfoApi(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(" данные пользователя", err));
  }

  function handleUpdateAvatar(value) {
    api
      .setUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("апдейт аватар", err));
  }

  function handleAddPlaceSubmit(value) {
    api
      .addNewCards(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("добавлениe карточки :", err));
  }

  function isSign() {
    localStorage.clear("jwt");
    setLoggedIn(false);
  }
  
  function onLogin(email, data) {
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("email", email);
    setLoggedIn(true);
  }

  function handleAuth(password, email) {
    auth
    .authorize(password, email)
    .then((data) => {
      if (data.token) {
        onLogin(email, data);
      }
    })
    .then(() => {
      navigate("/");
      setIsSuccesRegister(true);
    })
    .catch((err) => {
      setIsSuccesRegister(false);
      setIsTooltipOpen(true);
      console.log('Ошибка при входе:', err);
    });
  }

  function handleReg(password, email) {
    auth
    .register(password, email)
    .then(() => {
      navigate("/sign-in");
    })
    .then(() => {
      setIsSuccesRegister(true);
      setIsTooltipOpen(true);
    })
    .catch((err) => {
      setIsSuccesRegister(false);
      setIsTooltipOpen(true);
      console.log('Ошибка при регистрации:', err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body-root">
        <Header email={email} loggedIn={loggedIn} isSign={isSign} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleReg={handleReg}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleAuth={handleAuth}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="*"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setIsSuccesRegister={setIsSuccesRegister}
                isOpen={setIsTooltipOpen}
                handleAuth={handleAuth}
              />
            }
          />
        </Routes>
        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* <PopupWithForm
        title='Вы уверены?'
        name='close'
      >
      <div className="popup popup_delete">
        <form
          className="popup__container"
          autoComplete="off"
          name="form-delete"
        >
          <button type="button" className="popup__close button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__button-save button">Да</button>
        </form>
      </div>
      
      </PopupWithForm> */}

        {/* <ImagePopup card={selectedCard} onClose={closeAllPopups} /> */}
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name='picture'/> 

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isTooltipOpen}
          isSuccessRegister={isSuccessRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import { useEffect } from "react";
// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children, container }) => {
// внутри указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
// объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape)
// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
}, [isOpen, onClose])

// создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

// внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`. 
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup__${name}`}
      // добавляем обработчик оверлея
      onClick={handleOverlay}
    >
    {/* добавляем контейнер для контента попапа */}
      <div className={`popup__${container}`}>
        
        {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`, 
        хоть для `PopupWithForm` */}
        {children}
        <button
          className='popup__close button'
          type='button'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;


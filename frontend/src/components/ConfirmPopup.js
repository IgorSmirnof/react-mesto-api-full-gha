import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({
  isOpen,
  onClose,
  onDelete,
  card,
  textOfButton
}) {
  
  const isFormValid = true;
  
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }
  return (
    <PopupWithForm
      name="delete"
      isOpen={isOpen}
      onClose={onClose}
      title="Вы уверены?"
      text={textOfButton}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      buttonText='Сохранить'
    />
  )
}

export default ConfirmPopup;
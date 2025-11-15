import './ModalWithForm.css';

function ModalWithForm({ isOpen, onClose, title, buttonText, children }) {
  return (
    // Apply the modifier class 'modal_is-opened' when isOpen is true
    // This controls the modal's visibility via CSS
    // We are using interpolation to dynamically write out the class name. 
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

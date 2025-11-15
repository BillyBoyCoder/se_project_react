import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose }) {
  return (
    // Apply the modifier class 'modal_is-opened' when isOpen is true
    // This controls the modal's visibility via CSS
    // We are using interpolation to dynamically write out the class name.
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}> {/* Use stopPropagation to prevent closing when clicking inside modal */}
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Only render card content if card exists */}
        {card && (
          <>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__title">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;

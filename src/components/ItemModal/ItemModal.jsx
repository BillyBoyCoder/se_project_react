import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose, onDeleteItem, onEditItem }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  
  const handleDelete = () => {
    onDeleteItem(card);
  };

  if (!card) return null;

  // Check if current user is the owner of the item
  const isOwner = currentUser && card.owner === currentUser._id;

  return (
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
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__title">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isLoggedIn && isOwner && (
            <>
              <button
                className="modal__edit-btn"
                type="button"
                onClick={() => onEditItem && onEditItem(card)}
              >
                Edit item
              </button>
              <button
                className="modal__delete-btn"
                type="button"
                onClick={handleDelete}
              >
                Delete item
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

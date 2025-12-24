import '../ModalWithForm/ModalWithForm.css';
import './DeleteClothingItemModal.css';

function DeleteClothingItemModal({ isOpen, onClose, onConfirmDelete, itemToDelete }) {
  if (!itemToDelete) return null;
  const handleConfirmDelete = () => {
    onConfirmDelete(itemToDelete);
  };

  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content modal__content_type_delete-confirmation" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="delete-modal__content">
          <h2 className="delete-modal__title">
            Are you sure you want to delete this item?
          </h2>
          <p className="delete-modal__subtitle">
            This action is irreversible.
          </p>
          <button
            type="button"
            className="delete-modal__confirm-btn"
            onClick={handleConfirmDelete}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="delete-modal__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteClothingItemModal;

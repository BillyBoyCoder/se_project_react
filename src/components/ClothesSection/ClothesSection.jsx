import ItemCard from '../ItemCard/ItemCard';
import './ClothesSection.css';

function ClothesSection({ clothingItems = [], handleOpenItemModal, onAddClick, onCardLike, onDelete, isLoggedIn }) {
  return (
    <section className="clothes-section">
      {isLoggedIn && (
        <div className="clothes-section__header">
          <p className="clothes-section__title">Your items</p>
          <button type="button" className="clothes-section__add-btn" onClick={onAddClick}>+ Add new</button>
        </div>
      )}
      {isLoggedIn ? (
        <div className="clothes-section__cards">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                data={item}
                onClick={handleOpenItemModal}
                onCardLike={onCardLike}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      ) : (
        <div className="clothes-section__login-message">
          <p>Please log in to view clothing items</p>
        </div>
      )}
    </section>
  );
}

export default ClothesSection;

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
          <p>If you're connecting to my database, you should be able to use:</p>
          <p>username: bobcat@wetestcode.com password: WeT3$tC0de</p>
          <p>If you want to test the weather card image functionality, I set the default values to use</p>
          <p>Magadan, Russia are approximately 59.56° N latitude and 150.81° E longitude</p>
          <p>And remember to block location in your browser so that it uses the default longitude and latitude.</p>
        </div>
      )}
    </section>
  );
}

export default ClothesSection;

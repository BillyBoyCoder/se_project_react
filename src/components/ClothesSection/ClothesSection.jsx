import ItemCard from '../ItemCard/ItemCard';
import './ClothesSection.css';

function ClothesSection({ clothingItems = [], handleOpenItemModal, onAddClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button type="button" className="clothes-section__add-btn" onClick={onAddClick}>+ Add new</button>
      </div>
      <div className="clothes-section__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onClick={handleOpenItemModal}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ClothesSection;

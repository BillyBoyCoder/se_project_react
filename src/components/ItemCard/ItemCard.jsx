import "./ItemCard.css";

function ItemCard(props) {
  // Handler that calls onClick with the card data when clicked
  const handleCardClick = () => {
    props.onClick(props.data);
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      <img src={props.data.link} alt={props.data.name} className="card__image" />
      <h2 className="card__title">{props.data.name}</h2>
    </div>
  );
}

export default ItemCard;

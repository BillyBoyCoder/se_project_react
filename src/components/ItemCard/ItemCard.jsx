import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function ItemCard(props) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = props.data.likes?.some((id) => id === currentUser?._id);

  // Check if current user is the owner of the item
  const isOwner = currentUser && (props.data.owner?._id === currentUser._id || props.data.owner === currentUser._id);

  // Handler that calls onClick with the card data when clicked
  const handleCardClick = () => {
    props.onClick(props.data);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (props.onCardLike) {
      props.onCardLike(props.data._id, isLiked);
    }
  };

  return (
    <div className="item-card">
      <div className="card__header">
        <div className="card__name-container">
          <h2 className="card__title" onClick={handleCardClick}>{props.data.name}</h2>
          {isLoggedIn && (
            <button
              className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
              onClick={handleLike}
              type="button"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <svg className="card__like-icon" width="16" height="16" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 13.8462L7.11538 13.0308C3.4 9.63077 1 7.42308 1 4.73077C1 2.52308 2.69231 0.846154 4.88462 0.846154C6.14231 0.846154 7.34615 1.45385 8 2.40769C8.65385 1.45385 9.85769 0.846154 11.1154 0.846154C13.3077 0.846154 15 2.52308 15 4.73077C15 7.42308 12.6 9.63077 8.88462 13.0308L8 13.8462Z" />
              </svg>
            </button>
          )}
        </div>
        {props.data.owner?.name && (
          <p className={`card__owner ${isOwner ? 'card__owner_current-user' : 'card__owner_other-user'}`}>
            By {props.data.owner.name}
          </p>
        )}
      </div>
      <img src={props.data.imageUrl} alt={props.data.name} className="card__image" onClick={handleCardClick} />
    </div>
  );
}

export default ItemCard;

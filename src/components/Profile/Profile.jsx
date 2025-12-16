import { useContext } from 'react';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import CurrentUserContext from '../../utils/contexts/CurrentUserContext';
import './Profile.css';

function Profile({ clothingItems, handleOpenItemModal, onAddClick, onCardLike, onDelete, isLoggedIn, onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter items to only show current user's items
  const userItems = clothingItems.filter((item) => item.owner === currentUser?._id);

  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection 
        clothingItems={userItems}
        handleOpenItemModal={handleOpenItemModal}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
        onDelete={onDelete}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;

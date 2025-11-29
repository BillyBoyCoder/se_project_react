import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';

function Profile({ clothingItems, handleOpenItemModal, onAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection 
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        onAddClick={onAddClick}
      />
    </div>
  );
}

export default Profile;

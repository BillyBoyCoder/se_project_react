import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../../utils/contexts/CurrentUserContext';
import avatarTrue from '../../assets/images/avatarTrue.svg';
import './SideBar.css';

function SideBar({ onEditProfile, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Reset avatarError when the avatar URL changes
  useEffect(() => {
    setAvatarError(false);
  }, [currentUser?.avatar]);

  // Get user's first initial for placeholder avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAvatarModalOpen(false);
  };

  // Handle avatar image load error
  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <>
      <aside className="sidebar">
        {currentUser?.avatar && !avatarError ? (
          <img
            src={currentUser.avatar}
            alt={`${currentUser?.name}'s avatar`}
            className="sidebar__avatar"
            onClick={handleAvatarClick}
            onError={handleAvatarError}
          />
        ) : (
          <div className="sidebar__avatar-placeholder" onClick={handleAvatarClick}>
            {getInitial(currentUser?.name)}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || 'User'}</p>
        <button className="sidebar__link" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__link" onClick={onLogout}>
          Log out
        </button>
      </aside>

      {isAvatarModalOpen && (
        <div className="sidebar__avatar-modal" onClick={handleCloseModal}>
          <div className="sidebar__avatar-modal-content">
            {currentUser?.avatar && !avatarError ? (
              <img
                src={currentUser.avatar}
                alt={`${currentUser?.name}'s avatar`}
                className="sidebar__avatar-modal-image"
                onError={handleAvatarError}
              />
            ) : (
              <div className="sidebar__avatar-modal-placeholder">
                {getInitial(currentUser?.name)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;

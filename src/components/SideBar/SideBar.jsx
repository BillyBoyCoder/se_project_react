import avatarTrue from '../../assets/images/avatarTrue.svg';
import './SideBar.css';

function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <img
        src={avatarTrue}
        alt={`${username}'s avatar`}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{username}</p>
    </aside>
  );
}

export default SideBar;

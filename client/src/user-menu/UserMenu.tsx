import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { CloseImage, DarkModeImage, DashboardImage, MiaImage, PersonalInformationImage, UserAccessImage } from '../assets';
import { logoutInit } from './store';
import "./user-menu.scss";

interface UserMenuProps {
  onClose: () => void
}

function UserMenu(props: UserMenuProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutInit());
  }

  const handleDashboardClick = () => {
    props.onClose();
    history.push("/dashboard");
  }

  return (
    <div className="user-menu">
      <div className="user-menu__close">
        <img alt="" src={CloseImage} onClick={props.onClose} />
      </div>
      <div className="user-menu__profile">
        <img alt="" src={MiaImage} />
        <div className="user-menu__info">
          <div className="user-menu__name">Miomira Zivkovic</div>
          <div className="user-menu__privilege">Admin</div>
        </div>
      </div>
      <div>
        <div className="user-menu__option" onClick={handleDashboardClick}>
          <img className="user-menu__option-image" alt="" src={DashboardImage} />
          <div className="user-menu__option-name">Dashboard</div>
        </div>
        <div className="user-menu__option">
          <img className="user-menu__option-image" alt="" src={PersonalInformationImage} />
          <div className="user-menu__option-name">Personal information</div>
        </div>
        <div className="user-menu__option">
          <img className="user-menu__option-image" alt="" src={DarkModeImage} />
          <div className="user-menu__option-name">Dark mode</div>
        </div>
        <div className="user-menu__option">
          <img className="user-menu__option-image" alt="" src={UserAccessImage} />
          <div className="user-menu__option-name">User access</div>
        </div>
      </div>
      <div className="user-menu__logout" onClick={handleLogoutClick}>Log out</div>
    </div>
  );
}

export default UserMenu;
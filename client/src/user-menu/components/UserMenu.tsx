import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CloseImage, DarkModeImage, DashboardImage, MarkedImage, MiaImage, PersonalInformationImage, UserAccessImage } from '../../assets';
import { UserType } from '../../auth/store';
import { getPerson } from '../../employee/store/actions';
import { RootState } from '../../store/store';
import { logoutInit } from '../store';
import { accessMap } from '../store/access-map';
import "../styles/user-menu.scss";

interface UserMenuProps {
  onClose: () => void
}

function UserMenu(props: UserMenuProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedUserType, loggedUserId } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.person);

  useEffect(() => {
    dispatch(getPerson(loggedUserId))
  }, [dispatch, loggedUserId])

  const handleLogoutClick = () => {
    dispatch(logoutInit());
  }

  const handleDashboardClick = () => {
    props.onClose();
    history.push("/dashboard");
  }

  const handleUserAccessClick = () => {
    props.onClose();
    history.push("/user-access");
  }

  const handlePersonalInformationClick = () => {
    props.onClose();
    history.push(`/personal-information/${loggedUserId}`);
  }

  return (
    <div className="user-menu">
      <div className="user-menu__close">
        <img alt="" src={CloseImage} onClick={props.onClose} />
      </div>
      <div className="user-menu__profile">
        <div className="user-menu__image-container">
          <img className="user-menu__image" alt="" src={`http://localhost:5000/uploads/${user.imageSrc}`} />
        </div>
        <div className="user-menu__info">
          <div className="user-menu__data">
            <div className="user-menu__name">{user.fullName}</div>
            <div className="user-menu__privilege">{accessMap.get(loggedUserType)}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="user-menu__option" onClick={handleDashboardClick}>
          <img className="user-menu__option-image" alt="" src={DashboardImage} />
          <div className="user-menu__option-name">Dashboard</div>
        </div>
        <div className="user-menu__option" onClick={handlePersonalInformationClick}>
          <img className="user-menu__option-image" alt="" src={PersonalInformationImage} />
          <div className="user-menu__option-name">Personal information</div>
        </div>
        <div className="user-menu__option">
          <img className="user-menu__option-image" alt="" src={DarkModeImage} />
          <div className="user-menu__option-name">Dark mode</div>
        </div>
        <div hidden={user.type == UserType.EMPLOYEE}>
          <div className="user-menu__option" onClick={handleUserAccessClick}>
            <img className="user-menu__option-image" alt="" src={UserAccessImage} />
            <div className="user-menu__option-name">User access</div>
          </div>
        </div>
      </div>
      <div className="user-menu__logout" onClick={handleLogoutClick}>Log out</div>
    </div>
  );
}

export default UserMenu;
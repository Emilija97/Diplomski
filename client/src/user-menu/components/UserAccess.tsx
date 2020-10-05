import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CloseImage, DarkModeImage, DashboardImage, MiaImage, PersonalInformationImage, UserAccessImage } from '../../assets';
import { addUsersInit, clear, selectUsers, User } from '../../people/store';
import { ListItem, NiHeader } from '../../shared';
import { RootState } from '../../store/store';
import { logoutInit } from '../store';
import "../styles/user-access.scss";
import UserAccessCard from './UserAccessCard';

function UserAccess() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loggedUserId } = useSelector((state: RootState) => state.auth);
  const users: User[] = useSelector(
    (state: RootState) => selectUsers(state)
  );

  useEffect(() => {
    dispatch(addUsersInit());
  }, [dispatch]);

  useEffect(() => {
    return function cleanup() {
      dispatch(clear());
    }
  }, [dispatch]);

  return (
    <div className="user-access">
      <NiHeader backArrow={true} logo={false} title="User Access" menu={true} />

      <div className="user-access__users">
        {users.length === 0 ?
          (<div className="user-access__no-users-message">There are no users in this category.</div>) :
          users.map(user => {
            if (user.id !== loggedUserId)
              return (
                <UserAccessCard
                  key={user.id}
                  personId={user.id}
                  className="reports__user"
                  image={user.imageSrc}
                  fullName={user.fullName}
                  position={user.position}
                  type={user.type}
                />
              );
          })}
      </div>
    </div>
  );
}

export default UserAccess;
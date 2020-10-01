import { Tab, Tabs } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AddEmployeeImage } from "../assets";
import { UserType } from "../auth/store/auth-state";
import { clearReports } from "../reports/store/actions";
import { ListItem, NiHeader, NiIconButton, SearchField } from "../shared";
import "../shared/styles/ni-tabs.scss";
import { RootState } from "../store/store";
import "./people.scss";
import { addUsersInit, archiveUsersInit, clear, deleteUsersInit, incrementPage, loadUsersByNameInit, resetPage, selectUserByStatus, setSelectedTab, User, UserStatus } from "./store";
import UserOptionsHeader from "./UserOptionsHeader";

function People() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);

  const { page, selectedTab, limit } = useSelector((state: RootState) => state.people);
  const { loggedUserType } = useSelector((state: RootState) => state.auth);

  const users: User[] = useSelector(
    (state: RootState) => selectUserByStatus(state, selectedTab)
  );

  useEffect(() => {
    dispatch(addUsersInit());
  }, [dispatch, page]);

  useEffect(() => {
    return function cleanup() {
      dispatch(clear());
    }
  }, [dispatch]);

  const handleTabChange = (event: any, tabValue: any) => {
    dispatch(setSelectedTab(tabValue));
    setSelectedUsersIds([]);
  };

  const handleBackArrowClick = () => {
    setSelectedUsersIds([]);
  }

  const handleUserPress = (userId: string) => {
    if (loggedUserType === UserType.EMPLOYEE) return;

    selectedUsersIds.includes(userId) ?
      setSelectedUsersIds(selectedUsersIds.filter(id => id !== userId)) :
      setSelectedUsersIds([...selectedUsersIds, userId]);
  };

  const handleDeleteUserClick = () => {
    dispatch(deleteUsersInit(selectedUsersIds));
    setSelectedUsersIds([]);
  };

  const handleArchiveUserClick = () => {
    dispatch(archiveUsersInit(selectedUsersIds));
    setSelectedUsersIds([]);
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    if (event.target.value === "") {
      page === 1 ? dispatch(addUsersInit()) : dispatch(resetPage());
    }
    else dispatch(loadUsersByNameInit(event.target.value));

    setSelectedUsersIds([]);
  }

  const handleSeeMoreClick = () => {
    dispatch(incrementPage());
  }

  const handleAddUserClick = () => {
    history.push("/create-edit-person");
  }

  const handleCardClick = (id: string) => {
    history.push(`/user-profile/${id}`);
  }

  const renderHeader = () => {
    return selectedUsersIds.length > 0 ?
      (<UserOptionsHeader
        onBackArrowClick={handleBackArrowClick}
        onDeleteClick={handleDeleteUserClick}
        onArchiveClick={handleArchiveUserClick} />) :
      (<NiHeader backArrow={true} logo={true} menu={true} title="NIGNITE" url="/dashboard" />);
  };

  return (
    <div className="people">
      {renderHeader()}

      <div className="people__body">
        <div className="people__search-add-container">
          <SearchField onChange={handleSearchValueChange}></SearchField>
          <NiIconButton
            hidden={loggedUserType === UserType.EMPLOYEE}
            srcIcon={AddEmployeeImage}
            onClick={handleAddUserClick}
            className="people__add" />
        </div>

        <Tabs
          onChange={handleTabChange}
          className="ni-tabs people__tabs"
          value={selectedTab}
          variant="scrollable"
        >
          <Tab value={0} label="All" />
          <Tab value={UserStatus.EMPLOYEE} label="Working" />
          <Tab value={UserStatus.CANDIDATES} label="Hiring" />
          <Tab value={UserStatus.CONTRACTORS} label="Contractors" />
          <Tab value={UserStatus.ARCHIVED} label="Archived" />
        </Tabs>

        <div className="people__users">
          {users.length === 0 ?
            (<div className="people__no-users-message">There are no users in this category.</div>) :
            users.map(user => {
              return (
                <ListItem
                  key={user.id}
                  className="people__user"
                  image={user.imageSrc}
                  title={user.fullName}
                  subtext={user.position}
                  selected={selectedUsersIds.filter(id => id === user.id).length !== 0}
                  onPress={() => handleUserPress(user.id)}
                  onClick={() => handleCardClick(user.id)} />
              );
            })}
        </div>
        <div className="people__link">
          <div hidden={users.length < limit} onClick={handleSeeMoreClick}>See more</div>
        </div>
      </div>
    </div>
  );
}

export default People;
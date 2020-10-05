import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { UserType } from "../../auth/store";
import "../../shared/styles/ni-button.scss";
import { RootState } from "../../store/store";
import BasicInfo from "../basic-info/BasicInfo";
import HistoryPage from "../history/HistoryPage";
import PerformancePage from "../performance/PerformancePage";
import { getPerson } from "../store/actions";
import "./user-profile.scss";
import UserCover from "./UserCover";

enum EmployeeView {
  BASIC_INFO = 0,
  PERFORMANCE = 1,
  HISTORY = 2
}

function UserProfile() {
  const [selectedTab, setSelectedTab] = useState(1);
  const person = useSelector((state: RootState) => state.person);
  const { loggedUserType } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id !== undefined)
      dispatch(getPerson(id as string));
  }, [dispatch, id]);

  const onTabChange = (event: any, tabValue: any) => {
    setSelectedTab(tabValue);
  };

  const renderSelectedTab = () => {
    if (selectedTab === EmployeeView.BASIC_INFO) return <BasicInfo />;
    else if (selectedTab === EmployeeView.PERFORMANCE)
      return <PerformancePage />;
    else return <HistoryPage />;
  };

  const previewTabs = () => {
    if (loggedUserType === UserType.EMPLOYEE)
      return (
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          className="ni-tabs people__tabs"
          variant="fullWidth"
        >
          <Tab label="Basic Info" />
          <Tab label="Performance" />
        </Tabs>
      );
    else {
      return (
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          className="ni-tabs people__tabs"
          variant="fullWidth"
        >
          <Tab label="Basic Info" />
          <Tab label="Performance" />
          <Tab label="History" /></Tabs>);
    }
  }

  return (
    <div className="user-profile">
      <UserCover
        fullName={person.fullName}
        position={person.position}
        coverSrc={person.imageSrc}
        avatarSrc={person.imageSrc}
        userType={loggedUserType}
      />
      <div className="user-profile__tabs">
        {previewTabs()}
        {renderSelectedTab()}
      </div>
    </div>
  );
}

export default UserProfile;

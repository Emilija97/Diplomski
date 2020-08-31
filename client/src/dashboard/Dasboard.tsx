import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FoodImage, PeopleImage, RequestsImage, WorkActivityImage, WorkReportsImage } from '../assets';
import { UserType } from '../auth/store/auth-state';
import { NiHeader } from '../shared';
import { RootState } from '../store/store';
import "./dashboard.scss";
import DashboardCard from './DashboardCard';

export type DashboardItem = {
  title: string,
  imageSrc: string,
  url: string,
  privileges: UserType[]
}


function Dashboard() {
  const loggedUserType: UserType = useSelector((state: RootState) => state.auth.loggedUserType);

  const items: DashboardItem[] = [
    {
      title: "People",
      imageSrc: PeopleImage,
      url: "/people",
      privileges: [UserType.EMPLOYEE, UserType.ADMIN, UserType.HR]
    },
    {
      title: "Requests",
      imageSrc: RequestsImage,
      url: "/requests",
      privileges: [UserType.EMPLOYEE, UserType.HR, UserType.ADMIN]
    },
    {
      title: "Work reports",
      imageSrc: WorkReportsImage,
      url: "/work-reports",
      privileges: [UserType.ADMIN, UserType.HR]
    },
    {
      title: "Food",
      imageSrc: FoodImage,
      url: (loggedUserType === UserType.EMPLOYEE ? "./weekly-orders" : "./food"),
      privileges: [UserType.EMPLOYEE, UserType.HR, UserType.ADMIN]
    },
    {
      title: "Work activity",
      imageSrc: WorkActivityImage,
      url: "/work-acitivity",
      privileges: [UserType.ADMIN, UserType.HR, UserType.EMPLOYEE]
    }
  ]

  const [dashboardItems, setDashboardItems] = useState(items);


  useEffect(() => {
    setDashboardItems(items.filter(item => item.privileges.includes(loggedUserType)));
  }, [loggedUserType])

  return (
    <div className="dashboard">
      <NiHeader backArrow={false} logo={true} menu={true} title="NIGNITE" />
      <div className="dashboard__content">
        <div className="dashboard__title">
          Hello Mia, what do you want to do today?
        </div>

        <div className="dashboard__cards">
          {dashboardItems.map(item => <DashboardCard key={item.title} {...item} />)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
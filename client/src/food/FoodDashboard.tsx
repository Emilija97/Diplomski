import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FoodBackgroundImage, MakeAnOrderImage, ManageFoodImage, OrdersListImage } from '../assets';
import { selectLoggedUserName } from '../auth/store/selectors';
import { ListItem, NiHeader } from '../shared';
import { RootState } from '../store/store';
import "./food-dashboard.scss";

interface FoodDashboardItem {
  imageSrc: string,
  title: string,
  url: string
}

const foodDashboardItems: FoodDashboardItem[] = [
  {
    title: "Manage food",
    imageSrc: ManageFoodImage,
    url: "/caterings"
  },
  {
    title: "List of orders",
    imageSrc: OrdersListImage,
    url: "/orders"
  },
  {
    title: "Make an order",
    imageSrc: MakeAnOrderImage,
    url: "/weekly-orders"
  }
]

function FoodDashboard() {
  const history = useHistory();

  const handleCardClick = (event: HammerInput, url: string) => {
    history.push(url);
  }

  const loggedUserName = useSelector((state: RootState) => selectLoggedUserName(state));

  return (
    <div className="food-dashboard">
      <div className="food-dashboard__cover">
        <img alt="" src={FoodBackgroundImage} className="food-dashboard__background" />
        <NiHeader backArrow={true} logo={false} menu={true} title="" className="food-dashboard__ni-header" />
        <div className="food-dashboard__welcome-text">
          <div className="food-dashboard__h5">Hello {loggedUserName},</div>
          <div >let's make an order for you</div>
        </div>
      </div>
      <div className="food-dashboard__items">
        {foodDashboardItems.map(item =>
          <ListItem key={item.url}
            image={item.imageSrc}
            title={item.title}
            className="food-dashboard__item"
            onClick={(event) => handleCardClick(event, item.url)} />
        )}
      </div>
    </div>
  )
}

export default FoodDashboard;
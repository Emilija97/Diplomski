import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardItem } from './Dasboard';
import "./dashboard-card.scss";

function DashboardCard(props: DashboardItem) {
  return (
    <Link to={props.url} className="dashboard-card" >
      <img className="dashboard-card__image" alt="" src={props.imageSrc} />
      <div className="dashboard-card__title">{props.title}</div>
    </Link>
  );
}

export default DashboardCard;
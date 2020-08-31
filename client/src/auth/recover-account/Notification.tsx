import React from 'react';
import { CloseImage } from '../../assets';
import "./notification.scss";

interface INotification {
  title: string,
  message: string
}

function Notification(props: INotification) {
  return (
    <div className="notification">
      <div className="notification__close"><img alt="" src={CloseImage} /></div>
      <div className="notification__title">{props.title}</div>
      <div className="notification__message">{props.message}</div>
    </div>
  )
}

export default Notification;
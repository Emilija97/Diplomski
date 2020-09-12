import React from "react";
import { useHistory } from "react-router";
import { GoBackImage } from "../../assets";
import "./user-cover.scss";

interface IUserInfo {
  fullName: string;
  position: string;
  coverSrc: string;
  avatarSrc: string;
}

function UserCover(props: IUserInfo) {

  const history = useHistory();

  const onBackClick = () => {
    history.push('/people');
  };

  return (
    <div className="user-cover">
      <div className="user-cover__content">
        <img
          className="user-cover__background-image"
          alt=""
          src={props.coverSrc ? `http://localhost:5000/uploads/${props.coverSrc}` : ""}
        ></img>
        <button className="ni-button ni-button__text ni-button__text--transparent user-cover__back"
        >
          <img alt="" src={GoBackImage} onClick={onBackClick}></img>
        </button>

        <div className="user-cover__avatar">
          <img alt="" src={props.avatarSrc ? `http://localhost:5000/uploads/${props.avatarSrc}` : ""}></img>
          <div className="user-cover__user-info">
            <div className="user-cover__full-name">{props.fullName}</div>
            <div className="user-cover__position">{props.position}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCover;

import React, { MouseEvent } from "react";
import { ArchiveImage, BackArrowImage, DeleteImage } from "../assets";
import "./user-options-header.scss";

interface IUserOptionsHeader {
  onBackArrowClick: (event: MouseEvent) => void;
  onDeleteClick: (event: MouseEvent) => void;
  onArchiveClick: (event: MouseEvent) => void;
}

function UserOptionsHeader(props: IUserOptionsHeader) {
  return (
    <div className="user-options">
      <div className="user-options__back">
        <img alt="" src={BackArrowImage} onClick={props.onBackArrowClick}></img>
      </div>
      <div className="user-options__logo"></div>
      <div className="user-options__delete-archive">
        <img alt="" src={DeleteImage} onClick={props.onDeleteClick}></img>
        <img alt="" src={ArchiveImage} onClick={props.onArchiveClick}></img>
      </div>
    </div>
  );
}

export default UserOptionsHeader;

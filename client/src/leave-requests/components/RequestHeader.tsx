import React, { MouseEvent } from "react";
import { BackArrowImage, DeleteImage } from "../../assets";
import "../styles/request-header.scss";

interface Props {
    onBackArrowClick: (event: MouseEvent) => void;
    onDeleteClick: (event: MouseEvent) => void;
}

function RequestHeader(props: Props) {
    return (
        <div className="request-header">
            <div className="request-header__back">
                <img alt="" src={BackArrowImage} onClick={props.onBackArrowClick}></img>
            </div>
            <div className="request-header__logo"></div>
            <div className="request-header__delete">
                <img alt="" src={DeleteImage} onClick={props.onDeleteClick}></img>
            </div>
        </div>
    );
}

export default RequestHeader;
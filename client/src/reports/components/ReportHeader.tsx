import React, { MouseEvent } from "react";
import { BackArrowImage, DeleteImage } from "../../assets";
import "../styles/report-header.scss";

interface Props {
    onBackArrowClick: (event: MouseEvent) => void;
    onDeleteClick: (event: MouseEvent) => void;
}

function ReportHeader(props: Props) {
    return (
        <div className="report-header">
            <div className="report-header__back">
                <img alt="" src={BackArrowImage} onClick={props.onBackArrowClick}></img>
            </div>
            <div className="report-header__logo"></div>
            <div className="report-header__delete">
                <img alt="" src={DeleteImage} onClick={props.onDeleteClick}></img>
            </div>
        </div>
    );
}

export default ReportHeader;
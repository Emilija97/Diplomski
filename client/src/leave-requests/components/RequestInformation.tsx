import React, { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { BackArrowImage, DeleteImage } from "../../assets";
import { NiHeader } from "../../shared";
import { RootState } from "../../store/store";
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType, navigationMap, selectRequest } from "../store";
import "../styles/leave-request-card.scss";
import "../styles/request-information.scss";

function RequestInformation() {
    const { id } = useParams<{ id: string }>();
    const leaveRequest: LeaveRequest = useSelector((state: RootState) => selectRequest(state, id));

    const renderCardHeader = () => {
        return (
            <div className="request-card__header">
                <div className="request-card__image-container">
                    <img className="request-card__image" alt="" src={`http://localhost:5000/uploads/${leaveRequest.employeeImageSrc}`} />
                </div>
                <div className="request-card__user-info">
                    <div className="request-card__user-name">{leaveRequest.employeeFullName}</div>
                    <div className="request-card__user-position">{leaveRequest.employeePosition}</div>
                </div>
            </div>
        );
    }

    const renderCardContent = () => {
        return (
            <div className="request-card__content">
                {renderRequestTitle()}
                {renderRequestDate()}
                {renderMessage()}
            </div>
        );
    }

    const renderRequestTitle = () => {
        return (
            <div className="request-card__title">
                {leaveRequest.type === LeaveRequestType.SICK_LEAVE ? "Sick Leave" : "Request for Time off"}
            </div>
        );
    }

    const renderRequestDate = () => {
        return (
            <div className={"request-card__date " +
                (leaveRequest.status === LeaveRequestStatus.PENDING ? "request-card__date--pending" : "")}>
                {leaveRequest.durationInDays} days - {leaveRequest.startDate} - {leaveRequest.endDate}
            </div>
        );
    }

    const renderMessage = () => {
        if (leaveRequest.message === "" || leaveRequest.status !== LeaveRequestStatus.PENDING) return (<div></div>);

        return (
            <div>
                <div className="request-card__message-title">Personal message: </div>
                <div className="request-card__message">{leaveRequest.message}</div>
            </div>
        )
    }
    return (
        <div className="request-information">
            <NiHeader backArrow={true} logo={false} menu={true} title="Request Information" />
            <div className="request-card">
                {leaveRequest !== undefined ?
                    (<div>
                        {renderCardHeader()}
                        {renderCardContent()}
                    </div>)
                    : <div></div>}
            </div>
        </div>
    );
}

export default RequestInformation;
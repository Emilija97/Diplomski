import React from 'react';
import { useDispatch } from 'react-redux';
import { KebabMenuImage } from '../../assets';
import "../../shared/styles/ni-button.scss";
import { changeRequestStatusInit } from '../store/action';
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType } from '../store/request-state';
import "../styles/leave-request-card.scss";

function AdminViewLeaveRequestCard(props: LeaveRequest) {
  const dispatch = useDispatch();

  const renderCardHeader = () => {
    return (
      <div className="request-card__header">
        <img alt="" src={props.employeeImageSrc} />
        <div className="request-card__user-info">
          <div className="request-card__user-name">{props.employeeFullName}</div>
          <div className="request-card__user-position">{props.employeePosition}</div>
        </div>
        <div className="request-card__user-menu"><img alt="" src={KebabMenuImage} /></div>
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
        {props.type === LeaveRequestType.SICK_LEAVE ? "Sick Leave" : "Request for Time off"}
      </div>
    );
  }

  const renderRequestDate = () => {
    return (
      <div className={"request-card__date " +
        (props.status === LeaveRequestStatus.PENDING ? "request-card__date--pending" : "")}>
        {props.durationInDays} days - {props.startDate} - {props.endDate}
      </div>
    );
  }

  const renderMessage = () => {
    if (props.message === "" || props.status !== LeaveRequestStatus.PENDING) return (<div></div>);

    return (
      <div>
        <div className="request-card__message-title">Personal message: </div>
        <div className="request-card__message">{props.message}</div>
      </div>
    )
  }

  const renderCardAction = () => {
    if (props.status === LeaveRequestStatus.PENDING) {
      return (
        <div className="request-card__action">
          <button className="ni-button ni-button__text ni-button--small 
            request-card__reject-button" onClick={handleRejectClick}>Reject</button>
          <button className="ni-button ni-button__contained ni-button__text--primary
            ni-button--small request-card__approve-button" onClick={handleApproveClick}>Approve</button>
        </div>
      );
    }
    return (<div></div>);
  }

  const handleRejectClick = () => {
    dispatch(changeRequestStatusInit(props.id, LeaveRequestStatus.REJECTED));
  }

  const handleApproveClick = () => {
    dispatch(changeRequestStatusInit(props.id, LeaveRequestStatus.APPROVED));
  }

  return (
    <div className="request-card">
      {renderCardHeader()}
      {renderCardContent()}
      {renderCardAction()}
    </div>
  )
}

export default AdminViewLeaveRequestCard;
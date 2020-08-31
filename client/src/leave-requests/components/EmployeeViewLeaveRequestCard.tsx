import React from 'react';
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType } from '../store';
import "../styles/leave-request-card.scss";

function EmployeeViewLeaveRequestCard(props: LeaveRequest) {

  const renderRequestTitle = () => {
    if (props.type === LeaveRequestType.SICK_LEAVE)
      return (<div className="request-card__title">Sick Leave</div>);
    else return (<div className="request-card__title">Request for Time off</div>);
  }

  const renderMessage = () => {
    if (props.status === LeaveRequestStatus.APPROVED)
      return (<div className="request-card--approved">Approved</div>);
    if (props.status === LeaveRequestStatus.PENDING)
      return (<div className="request-card--pending">Pending approval</div>);
    if (props.status === LeaveRequestStatus.REJECTED)
      return (<div className="request-card--rejected">Rejected</div>);
  }

  const renderDate = () => {
    return (
      <div className="request-card__date">
        {props.durationInDays} days - {props.startDate} - {props.endDate}
      </div>
    );
  }

  return (
    <div className="request-card">
      <div className="request-card__content">
        {renderRequestTitle()}
        {renderDate()}
        {renderMessage()}
      </div>
    </div>
  );
}

export default EmployeeViewLeaveRequestCard;
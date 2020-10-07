import React, { createRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { WhitePlusImage } from '../../assets';
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType } from '../store';
import "../styles/leave-request-card.scss";

interface Props extends LeaveRequest {
  onPress?: HammerListener;
  onClick?: HammerListener;
  selected?: boolean,
}

function EmployeeViewLeaveRequestCard(props: Props) {
  const cardRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const hammer = new Hammer(cardRef.current as HTMLDivElement);
    hammer.set({ domEvents: true });
    if (props.onPress) hammer.on("press", props.onPress);
    if (props.onClick) hammer.on("tap", (event) => {
      event.srcEvent.stopImmediatePropagation();
      props.onClick && props.onClick(event);
    });
    return () => {
      hammer.off("press");
      hammer.off("tap");
    }
  }, [cardRef, props.onPress, props.onClick]);

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
    <div ref={cardRef}
      className={"request-card" + (props.selected ? " request-card--selected" : "")}>
      <div className="request-card__content">
        {renderRequestTitle()}
        {renderDate()}
        {renderMessage()}
      </div>
    </div>
  );
}

export default EmployeeViewLeaveRequestCard;
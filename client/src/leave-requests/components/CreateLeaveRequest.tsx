import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { ChangeEvent, useState } from 'react';
import { NiHeader } from '../../shared';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { LeaveRequestType } from '../store';
import "../styles/create-leave-request.scss";

function CreateLeaveRequest() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedRequestType, setSelectedRequestType] = useState(LeaveRequestType.TIME_OFF);
  const [message, setMessage] = useState("");

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  }

  const handleRequestTypeClick = (type: LeaveRequestType) => {
    setSelectedRequestType(type);
  }

  const activeButtonStyle: string = "ni-button ni-button--small " +
    "ni-button__text create-request__buttons--active";
  const inactiveButtonStyle: string = "ni-button ni-button--small " +
    "ni-button__outlined create-request__buttons--inactive";

  const timeOffButtonStyle = () => {
    return selectedRequestType === LeaveRequestType.TIME_OFF ?
      activeButtonStyle : inactiveButtonStyle;
  }

  const sickLeaveButtonStyle = () => {
    return selectedRequestType === LeaveRequestType.SICK_LEAVE ?
      activeButtonStyle : inactiveButtonStyle;
  }

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  return (
    <div className="create-request">
      <NiHeader backArrow={true} logo={false} title="Create a request" menu={true} />
      <div className="create-request__body">
        <div className="create-request__label">Type of request: </div>
        <div className="create-request__buttons">
          <button
            className={timeOffButtonStyle()}
            onClick={() => handleRequestTypeClick(LeaveRequestType.TIME_OFF)}>Time off
          </button>
          <button
            className={sickLeaveButtonStyle()}
            onClick={() => handleRequestTypeClick(LeaveRequestType.SICK_LEAVE)}>Sick leave
          </button>
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className="create-request__date-field"
            onChange={handleDateChange}
            value={selectedDate} />
        </MuiPickersUtilsProvider>
        <TextField
          className="ni-text-field create-request__comment-field"
          label="Leave a comment"
          placeholder="Ex I'm not feeling good..."
          value={message}
          onChange={handleCommentChange} />
        <div className="create-request__buttons">
          <button className="ni-button ni-button--small 
            ni-button__text ni-button__text--dark">Cancel</button>
          <button className="ni-button ni-button--small 
            ni-button__contained ni-button__contained--primary">Send</button>
        </div>
      </div>
    </div>
  )
}

export default CreateLeaveRequest;
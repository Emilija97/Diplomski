import { Grid, TextField } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import DatePickerComponent from '../../employee/activities/components/DatePickerComponent';
import { getPerson } from '../../employee/store/actions';
import { NiHeader } from '../../shared';
import ButtonToggle from '../../shared/button-toggle/ButtonToggle';
import FormAction from '../../shared/form-action/FormAction';
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from '../../store/store';
import { createRequest, LeaveRequest, LeaveRequestStatus, LeaveRequestType, navigationMap, selectRequest, selectRequests, updateRequest } from '../store';
import "../styles/create-leave-request.scss";

function CreateLeaveRequest() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let leaveRequest: LeaveRequest = useSelector((state: RootState) => selectRequest(state, id));

  const [startDate, setStartDate] = useState<Date>(leaveRequest === undefined ? new Date() : new Date(leaveRequest.startDate));
  const [endDate, setEndDate] = useState<Date>(leaveRequest === undefined ? new Date() : new Date(leaveRequest.endDate));
  const [selectedRequestType, setSelectedRequestType] = useState(leaveRequest === undefined ? LeaveRequestType.TIME_OFF : leaveRequest.type);
  const [message, setMessage] = useState(leaveRequest === undefined ? "" : leaveRequest.message);
  const { loggedUserId } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.person);

  useEffect(() => {
    dispatch(getPerson(loggedUserId));
  }, [dispatch, loggedUserId]);

  const onAcceptClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const durationInDays = Math.round((endDate?.getTime() - startDate?.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const request: LeaveRequest = {
      id: id === undefined ? '' : id,
      employeeFullName: user.fullName,
      employeeId: user.id,
      employeePosition: user.position,
      employeeImageSrc: user.imageSrc,
      durationInDays: durationInDays,
      startDate: startDate.toLocaleDateString() as string,
      endDate: endDate.toLocaleDateString() as string,
      message: message,
      type: selectedRequestType,
      status: LeaveRequestStatus.PENDING
    };

    id === undefined ? dispatch(createRequest(request)) : dispatch(updateRequest(request));
    history.goBack();
  };

  const handleStartDateChange = (startDate: any) => {
    setStartDate(startDate);
  }

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  }

  const requestTypeChanged = (type: number) => {
    setSelectedRequestType(type);
  }

  const onRejectClick = () => {
    history.goBack();
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const textFieldStyle = (error: boolean) => {
    return "ni-text-field " + (error ? "ni-text-field--error" : "");
  }
  return (
    <div className="create-request">
      <NiHeader backArrow={true} logo={false} title="Create a request" menu={true} />
      <form onSubmit={onAcceptClick} className="create-request__form">
        <div className="create-request__content">
          <div className="create-request__label">Type of request: </div>
          <ButtonToggle
            buttonToggleMap={navigationMap}
            initState={selectedRequestType}
            onSelectClick={requestTypeChanged}
          />
          <br />
          <Grid container justify="space-around">
            <DatePickerComponent
              selectedDate={startDate}
              handleDateChange={handleStartDateChange}
              title="Select start date"
            />
            <DatePickerComponent
              selectedDate={endDate}
              handleDateChange={handleEndDateChange}
              title="Select end date"
            />
          </Grid>
          <br />
          <TextField
            className="ni-text-field create-request__comment-field"
            label="Leave a comment"
            placeholder="Ex I'm not feeling good..."
            value={message}
            onChange={handleCommentChange} />
          <div className="create-request__actions">
            <FormAction
              mode={true}
              rejectBtnTitle="Cancel"
              acceptBtnTitle="Save"
              onRejectClick={onRejectClick}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateLeaveRequest;
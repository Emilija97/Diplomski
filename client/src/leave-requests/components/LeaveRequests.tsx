import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { WhitePlusImage } from '../../assets';
import { UserType } from '../../auth/store/auth-state';
import { NiHeader } from '../../shared';
import "../../shared/styles/ni-tabs.scss";
import { RootState } from '../../store/store';
import { deleteRequests, LeaveRequest, LeaveRequestStatus, loadRequestsInit, selectRequest, selectRequestId, selectRequestsByStatus, setSelectedRequestStatus } from '../store';
import "../styles/leave-requests.scss";
import AdminViewLeaveRequestCard from './AdminViewLeaveRequestCard';
import EmployeeViewLeaveRequestCard from './EmployeeViewLeaveRequestCard';
import RequestHeader from './RequestHeader';

function LeaveRequests() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedRequestsIds, setSelectedRequestsIds] = useState<string[]>([]);

  const selectedRequestStatus = useSelector((state: RootState) =>
    state.leaveRequests.selectedRequestStatus);

  const { loggedUserType, loggedUserId } =
    useSelector((state: RootState) => state.auth);

  const requests: LeaveRequest[] = useSelector((state: RootState) =>
    selectRequestsByStatus(state, selectedRequestStatus, loggedUserId, loggedUserType));

  useEffect(() => {
    dispatch(loadRequestsInit())
  }, [dispatch, selectedRequestStatus]);

  const handleTabChange = (event: any, tabValue: any) => {
    dispatch(setSelectedRequestStatus(tabValue));
    setSelectedRequestsIds([]);
  }

  const handleCardPress = (requestId: string) => {
    selectedRequestsIds.includes(requestId) ?
      setSelectedRequestsIds(selectedRequestsIds.filter(id => id !== requestId)) :
      setSelectedRequestsIds([...selectedRequestsIds, requestId]);
  }

  const handleCardClick = (requestId: string, status: number) => {
    setSelectedRequestsIds([]);
    if (LeaveRequestStatus.PENDING === status)
      history.push(`/create-request/${requestId}`);
    else
      history.push(`/request-information/${requestId}`);
  }

  const handleBackArrowClick = () => {
    setSelectedRequestsIds([]);
  }
  const handleDeleteReportClick = () => {
    dispatch(deleteRequests(selectedRequestsIds));
    setSelectedRequestsIds([]);
  };

  const checkSelectedRequests = (requestId: string) => {
    if (selectedRequestsIds.filter(id => id === requestId).length !== 0) return true;
    else return false;
  }

  const renderRequestsCards = (requests: LeaveRequest[]) => {
    return loggedUserType === UserType.EMPLOYEE ?
      (requests.map(request =>
        <EmployeeViewLeaveRequestCard
          key={request.id}
          {...request} onPress={() => handleCardPress(request.id)}
          onClick={() => handleCardClick(request.id, request.status)}
          selected={checkSelectedRequests(request.id)} />)) :
      (requests.map(request => <AdminViewLeaveRequestCard key={request.id} {...request} />));
  }

  const onCreateRequestClick = () => {
    history.push("/create-request");
  }

  const renderFloatingButton = () => {
    if (selectedRequestStatus === LeaveRequestStatus.PENDING) {
      return (
        <div className="requests__floating-button">
          <button
            className="ni-button ni-button__circle ni-button__circle--large ni-button__circle--primary"
            onClick={() => onCreateRequestClick()}
          >
            <img alt="" src={WhitePlusImage}></img>
          </button>
        </div>
      )
    }
  }


  const renderHeader = () => {
    return selectedRequestsIds.length > 0 ?
      (<RequestHeader
        onBackArrowClick={handleBackArrowClick}
        onDeleteClick={handleDeleteReportClick} />) :
      (<NiHeader backArrow={true} logo={false} menu={true} title="Requests"></NiHeader>);
  };


  return (
    <div className="requests">
      {renderHeader()}
      <div className="requests__body">
        <Tabs
          onChange={handleTabChange}
          className="ni-tabs"
          value={selectedRequestStatus}
          variant="fullWidth"
        >
          <Tab value={LeaveRequestStatus.PENDING} label="Pending"></Tab>
          <Tab value={LeaveRequestStatus.APPROVED} label="Approved"></Tab>
          <Tab value={LeaveRequestStatus.REJECTED} label="Rejected"></Tab>
        </Tabs>
        {loggedUserType === UserType.EMPLOYEE ? renderFloatingButton() : ""}
        {requests.length === 0 ?
          (<div className="requests__no-requests-message">There are no requests in this category</div>) :
          renderRequestsCards(requests)
        }
      </div>
      <div className="requests__bottom-container"></div>
    </div>
  )
}

export default LeaveRequests;
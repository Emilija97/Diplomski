import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../auth/store/auth-state';
import { NiHeader } from '../../shared';
import "../../shared/styles/ni-tabs.scss";
import { RootState } from '../../store/store';
import { LeaveRequest, LeaveRequestStatus, loadRequestsInit, selectRequestsByStatus, setSelectedRequestStatus } from '../store';
import "../styles/leave-requests.scss";
import AdminViewLeaveRequestCard from './AdminViewLeaveRequestCard';
import EmployeeViewLeaveRequestCard from './EmployeeViewLeaveRequestCard';

function LeaveRequests() {
  const dispatch = useDispatch();

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
  }

  const renderRequestsCards = (requests: LeaveRequest[]) => {
    return loggedUserType === UserType.EMPLOYEE ?
      (requests.map(request => <EmployeeViewLeaveRequestCard key={request.id} {...request} />)) :
      (requests.map(request => <AdminViewLeaveRequestCard key={request.id} {...request} />));
  }

  return (
    <div className="requests">
      <NiHeader backArrow={true} logo={false} menu={true} title="Requests"></NiHeader>
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
        {requests.length === 0 ?
          (<div className="requests__no-requests-message">There are no requests in this category</div>) :
          renderRequestsCards(requests)
        }
      </div>
    </div>
  )
}

export default LeaveRequests;
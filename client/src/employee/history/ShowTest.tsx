import React, { useState } from 'react';
import ActivityForm from '../activities/components/ActivityForm';
import { ActivityStatus } from '../activities/store/activities-state';

interface Props {
  fullName: string;
  activity: any;
}

function ShowTest(props: Props) {
  let status = "";
  props.activity.status === ActivityStatus.PENDING ? status = "" : (ActivityStatus.PASSED ?
    status = "Passed" :
    status = "Not passed");

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="history-page__activity-item">
      <ActivityForm activity={props.activity} fullName={props.fullName}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)} />
      <div className={`history-page__activity-name`} onClick={() => setIsFormOpen(true)}>TEST</div>
      {status !== "" ?
        <div className="history-page__activity-status">{status}: {props.activity.date}</div>
        : <div className="history-page__activity-status">PENDING</div>}
      <div className="history-page__activity-comment">{props.activity.comment}</div>
    </div>
  )
}

export default ShowTest;
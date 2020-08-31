import React, { useState } from 'react';
import ActivityForm from '../activities/components/ActivityForm';
import { ActivityName } from '../activities/store/activities-state';

interface Props {
  fullName: string;
  activity: any;
}

function ShowHireAndSalary(props: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="history-page__activity-item">
      <ActivityForm activity={props.activity} fullName={props.fullName}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)} />
      <div className={`history-page__activity-name`} onClick={() => setIsFormOpen(true)}>{ActivityName[props.activity.name]}</div>
      <div className="history-page__activity-status">Changed: {props.activity.date}</div>
      <div className="history-page__activity-status">Salary: {props.activity.salary}</div>
    </div>
  )
}

export default ShowHireAndSalary;
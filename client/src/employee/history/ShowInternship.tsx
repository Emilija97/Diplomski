import React, { useState } from 'react';
import ActivityForm from '../activities/components/ActivityForm';

interface Props {
  fullName: string;
  activity: any;
}

function ShowInternship(props: Props) {
  const currentDate = new Date();
  const end = new Date(props.activity.endDate);
  let finished = true;
  if (currentDate.getDate() < end.getDate() && currentDate.getMonth() < end.getMonth())
    finished = false;
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="history-page__activity-item">
      <ActivityForm activity={props.activity} fullName={props.fullName}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)} />
      <div className={`${finished ? `history-page__activity-name` : `history-page__activity-name history-page__activity-name--green`}`}
        onClick={() => setIsFormOpen(true)}>INTERNSHIP</div>
      <div className="history-page__activity-status">Started: {props.activity.date}</div>
      {finished ? (
        <div className="history-page__activity-status">Completed: {props.activity.endDate}</div>
      ) : " "}
      <div className="history-page__activity-comment">{props.activity.comment}</div>
    </div>
  )
}

export default ShowInternship;
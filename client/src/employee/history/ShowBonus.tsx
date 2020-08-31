import React, { useState } from 'react';
import ActivityForm from '../activities/components/ActivityForm';

interface Props {
  fullName: string;
  activity: any;
}

function ShowBonus(props: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="history-page__activity-item">
      <ActivityForm activity={props.activity} fullName={props.fullName}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)} />
      <div className={`history-page__activity-name`} onClick={() => setIsFormOpen(true)}>BONUS</div>
      <div className="history-page__activity-status">Added: {props.activity.date}</div>
      <div className="history-page__activity-comment">{props.activity.bonus}</div>
    </div>
  )
}

export default ShowBonus;
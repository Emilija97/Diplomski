
import React from 'react';
import "../../../shared/styles/ni-button.scss";
import "../styles/activities.scss";

interface ActivityAction {
  onRejectClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAcceptClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ActivityAction(props: ActivityAction) {

  return (
    <div className="activity-content__form-action">
      <div className="activity-content__buttons">
        <button className="ni-button ni-button--small ni-button__text ni-button__text--dark form-action__buttons"
          onClick={props.onRejectClick}>
          Cancel</button>
        <button className="ni-button ni-button--small ni-button__text ni-button__text--dark form-action__buttons"
          onClick={props.onDeleteClick}>
          Delete</button>
        <button className={`ni-button ni-button--small ni-button__contained ni-button__contained--primary form-action__buttons`}
          onClick={props.onAcceptClick} type="submit">
          Save</button>
      </div>
    </div>
  )
}

export default ActivityAction;
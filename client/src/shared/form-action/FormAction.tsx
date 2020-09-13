
import React from 'react';
import "./form-action.scss";

interface FormAction {
  mode: boolean;
  rejectBtnTitle: string;
  acceptBtnTitle: string;
  onRejectClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAcceptClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function FormAction(props: FormAction) {

  return (
    <div className="form-action">
      <button className="ni-button ni-button--small ni-button__text ni-button__text--dark form-action__buttons"
        onClick={props.onRejectClick} type="button">
        {props.rejectBtnTitle}</button>
      <button className={`ni-button ni-button--small
       ${props.mode ?
          `ni-button__contained ni-button__contained--primary`
          : `ni-button__text ni-button__text--primary`} form-action__buttons`}
        onClick={props.onAcceptClick} type="submit">
        {props.acceptBtnTitle}</button>
    </div>
  )
}

export default FormAction;
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import 'date-fns';
import React from "react";
import "../../../shared/styles/ni-dialog.scss";
import "../styles/activity-form.scss";
import ChoseActivity from "./ChoseActivity";

interface Props {
  fullName: string;
  activity: any;
  open: boolean;
  onClose: () => void;
}

function ActivityForm(props: Props) {

  return (
    <div className="activity-form">
      <Dialog
        open={props.open}
        aria-labelledby="draggable-dialog-title"
        className="ni-dialog"
      >
        <DialogTitle id="draggable-dialog-title" className="activity-form__title">{props.fullName}</DialogTitle>
        <DialogContent>
          <ChoseActivity activity={props.activity} onClose={props.onClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ActivityForm;
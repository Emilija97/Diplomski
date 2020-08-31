import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormAction from "../../../shared/form-action/FormAction";
import "../../../shared/styles/ni-text-field.scss";
import { PersonState } from "../../store/reducer";
import { addActivity, updateActivity } from "../store/actions";
import { Activity, ActivityName } from "../store/activities-state";
import "../styles/activities.scss";
import "../styles/internship.scss";
import ActivityAction from "./ActivityAction";
import DatePickerComponent from "./DatePickerComponent";

interface Props extends Activity {
  closeForm: Function;
  onRejectClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDeleteClick: (id: string) => void;
  personState: PersonState;
}

function Internship(props: Props) {

  const dispatch = useDispatch();

  const [comment, setComment] = useState(props.id === undefined ? "" : props.comment);
  const [startDate, setStartDate] = useState<Date | null>(props.id === undefined ? new Date() : new Date(props.date));

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  }
  const [endDate, setEndDate] = useState<Date | null>(props.id === undefined ? new Date() : new Date(props.endDate as string));

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  }

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const onAcceptClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const activity: Activity = {
      id: props.id === undefined ? "" : props.id,
      personId: props.personState.id,
      name: ActivityName.INTERNSHIP,
      date: startDate?.toLocaleDateString() as string,
      endDate: endDate?.toLocaleDateString() as string,
      comment: comment
    }

    props.id === undefined ? dispatch(addActivity(activity)) : dispatch(updateActivity(activity));
    props.closeForm();
  }

  return (
    <div className="internship activity-content">
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

      <TextField label="Left a comment" value={comment} className="ni-text-field"
        multiline rowsMax="5" onChange={onChangeComment} />

      <div className="activity-content__form-action">
        {props.id === undefined ? <FormAction
          mode={false}
          rejectBtnTitle="Cancel"
          acceptBtnTitle="Save"
          onAcceptClick={onAcceptClick}
          onRejectClick={props.onRejectClick}
        />
          :
          <ActivityAction onRejectClick={props.onRejectClick} onAcceptClick={onAcceptClick} onDeleteClick={() => props.onDeleteClick(props.id)} />
        }
      </div>
    </div>
  );
}

export default Internship;
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormAction from "../../../shared/form-action/FormAction";
import "../../../shared/styles/ni-button.scss";
import "../../../shared/styles/ni-text-field.scss";
import { PersonState } from "../../store/reducer";
import { addActivity, updateActivity } from "../store";
import { Activity, ActivityName } from "../store/activities-state";
import "../styles/activities.scss";
import ActivityAction from "./ActivityAction";
import DatePickerComponent from "./DatePickerComponent";


interface Props extends Activity {
  closeForm: Function;
  onRejectClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDeleteClick: (id: string) => void;
  personState: PersonState;
}

function Bonus(props: Props) {

  const dispatch = useDispatch();

  const [bonus, setBonus] = useState(props.id === undefined ? "" : props.bonus);
  const [date, setDate] = useState<Date | null>(props.id === undefined ? new Date() : new Date(props.date));

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  }

  const onChangeBonus = (event: ChangeEvent<HTMLInputElement>) => {
    setBonus(event.target.value);
  }

  const onAcceptClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const activity: Activity = {
      id: props.id === undefined ? "" : props.id,
      personId: props.personState.id,
      name: ActivityName.BONUS,
      date: date?.toLocaleDateString() as string,
      bonus: (bonus as unknown as number)
    }

    props.id === undefined ? dispatch(addActivity(activity)) : dispatch(updateActivity(activity));
    props.closeForm();
  }

  return (
    <div className="bonus activity-content">
      <DatePickerComponent
        selectedDate={date}
        handleDateChange={handleDateChange}
        title="Select date"
      />
      <TextField
        className="ni-text-field"
        label="Add bonus"
        InputProps={{ inputProps: { min: 0 } }}
        // value={props.id === undefined ? 0 : props.bonus}
        type="number"
        onChange={onChangeBonus}
      />
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

export default Bonus;
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import FormAction from "../../../shared/form-action/FormAction";
import "../../../shared/styles/ni-text-field.scss";
import { Person } from "../../store/person-state";
import { PersonState } from "../../store/reducer";
import { addActivity, updateActivity } from "../store/actions";
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

function Hire(props: Props) {

  const dispatch = useDispatch();

  const [salary, setSalary] = useState(props.id === undefined ? "" : props.salary);
  const [date, setDate] = useState<Date | null>(props.id === undefined ? new Date() : new Date(props.date));

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  }

  const onChangeSalary = (event: ChangeEvent<HTMLInputElement>) => {
    setSalary(event.target.value);
  }

  const onAcceptClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const activity: Activity = {
      id: props.id === undefined ? "" : props.id,
      personId: props.personState.id,
      name: ActivityName.HIRE,
      date: date?.toLocaleDateString() as string,
      salary: (salary as unknown as number)
    }

    const person: Person = {
      id: props.personState.id,
      fullName: props.personState.fullName,
      position: props.personState.position,
      status: props.personState.status,
      imageSrc: "",
      birthDate: props.personState.birthDate,
      homeAddress: props.personState.homeAddress,
      enrolmentDate: props.personState.enrolmentDate,
      email: props.personState.email,
      phone: props.personState.phone,
      salary: (salary as unknown as number)
    }

    props.id === undefined ? dispatch(addActivity(activity, person)) : dispatch(updateActivity(activity, person));

    props.closeForm();
  }

  return (
    <div className="hire activity-content">
      <DatePickerComponent
        selectedDate={date}
        handleDateChange={handleDateChange}
        title="Select date"
      />
      <TextField className="ni-text-field" label="Salary"
        type="number" value={salary} onChange={onChangeSalary}
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

export default Hire;
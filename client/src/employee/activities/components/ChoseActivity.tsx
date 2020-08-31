import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../shared/styles/ni-text-field.scss";
import { RootState } from "../../../store/store";
import { activityNameMap, deleteActivity } from "../store";
import "../styles/chose-activity.scss";
import Bonus from "./Bonus";
import Contact from "./Contact";
import Hire from "./Hire";
import Internship from "./Internship";
import Interview from "./Interview";
import Salary from "./Salary";
import Test from "./Test";

interface Props {
  onClose: () => void;
  activity: any;
}

function ChoseActivity(props: Props) {
  const dispatch = useDispatch();
  const personState = useSelector((state: RootState) => state.person);

  const [selected, setSelected] = useState(props.activity.id === undefined ? "Contact" : activityNameMap.get(props.activity.name));

  const closeForm = () => {
    // dispatch(changeDialogState());
    props.onClose();
  }

  const onSelectChange = (event: React.ChangeEvent<any>) => {
    setSelected(event.target.value);
  }

  const onRejectClick = () => {
    closeForm();
  };

  const onDeleteClick = (id: string) => {
    dispatch(deleteActivity(id));
    closeForm();
  }

  return (
    <div className="chose-activity">
      {props.activity.id === undefined ?
        <FormControl className="chose-activity__select-form">
          <Select
            native
            autoWidth
            value={selected}
            onChange={onSelectChange}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}
              </option>
            ))}
          </Select>
        </FormControl>
        : <div>{selected}
          <hr /></div>}


      {selected && selected === "Contact" ? (
        <Contact
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Interview" ? (
        <Interview
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Internship" ? (
        <Internship
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Salary" ? (
        <Salary
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Bonus" ? (
        <Bonus
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Test" ? (
        <Test
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      ) : selected && selected === "Hire" ? (
        <Hire
          closeForm={closeForm}
          onRejectClick={onRejectClick}
          personState={personState}
          {...props.activity}
          onDeleteClick={onDeleteClick}
        />
      )
                    : null}
    </div>
  )
}

const options = ["Contact", "Interview", "Internship", "Salary", "Bonus", "Test", "Hire"];

export default ChoseActivity;
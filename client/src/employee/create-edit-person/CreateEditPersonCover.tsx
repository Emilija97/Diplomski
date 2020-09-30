import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent } from "react";
import { useHistory } from "react-router";
import { GoBackImage } from "../../assets";
import "../../shared/styles/ni-button.scss";
import "./create-edit-person-cover.scss";

const env = "http://localhost:5000/uploads";
interface Props {
  avatar: string;
  cover: string;
  name: string;
  role: string;
  mode: boolean;
  changeName: (event: ChangeEvent<HTMLInputElement>) => void;
  changeRole: (event: ChangeEvent<HTMLInputElement>) => void;
  changeImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CreateEditPersonCover(props: Props) {
  const history = useHistory();

  const onBackClick = () => {
    history.push('/people');
  };

  return (
    <div className="add-new-person-cover">
      <div className="add-new-person-cover__content">
        <img
          className="add-new-person-cover__background-image" alt=""
          src={props.mode ? props.cover : `${env}/${props.cover}`}
        ></img>
        <button className="ni-button ni-button__text ni-button__text--transparent add-new-person-cover__back"
          onClick={() => onBackClick()}>
          <img alt="" src={GoBackImage}></img>
        </button>
        <div className="add-new-person-cover__avatar">
          <label className="add-new-person-cover__custom-file-upload ni-button ni-button__circle 
						ni-button__circle--large ni-button__circle--primary">
            <input type="file" accept="image/*" className="add-new-person-cover__input-file"
              onChange={props.changeImage} />
            <img alt="" src={props.mode ? props.cover : `${env}/${props.avatar}`} className="add-new-person-cover__camera-img" />

          </label>

          <input type="text" className="add-new-person-cover__enter-name"
            name="name" placeholder={props.name === "" ? "Enter Name" : props.name}
            onChange={props.changeName}>
          </input>

          <input
            type="text" className="add-new-person-cover__enter-role"
            name="name" placeholder={props.role === "" ? "Enter Role" : props.role}
            onChange={props.changeRole}>
          </input>
        </div>
      </div>
    </div>
  );
}

export default CreateEditPersonCover;
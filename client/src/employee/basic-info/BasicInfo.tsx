import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { UserStatus } from "../../people/store";
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from "../../store/store";
import "./basic-info.scss";

function BasicInfo() {

  const history = useHistory();
  const person = useSelector((state: RootState) => state.person);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (person.status === UserStatus.EMPLOYEE)
      setStatus("Employee");
    else
      setStatus("Candidate");
  }, [person.status]);

  const clickOnLink = () => {
    console.log("Get CV from some url");
  };

  const editProfile = () => {
    console.log(history);
    history.push(`/create-edit-person/${person.id}`);
  };

  return (
    <div className="basic-info">
      <div className="basic-info__item">
        <label className="basic-info__item--title">Status:</label>
        <label className="basic-info__item--value">{status}</label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Birth date:</label>
        <label className="basic-info__item--value">{person.birthDate}</label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Home address:</label>
        <label className="basic-info__item--value">{person.homeAddress}</label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Enrolment Date:</label>
        <label className="basic-info__item--value">{person.enrolmentDate}</label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Email:</label>
        <label className="basic-info__item--value">
          {person.email}
        </label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Phone:</label>
        <label className="basic-info__item--value">{person.phone}</label>
        <hr className="basic-info__item--underline"></hr>
      </div>
      <div className="basic-info__item">
        <label className="basic-info__item--title">Link to CV:</label>
        <a className="basic-info__item--link" onClick={() => clickOnLink()}>
          examplecv.com
        </a>
      </div>

      <div className="basic-info__edit-btn">
        <button
          className="ni-button ni-button--extra-large ni-button__outlined ni-button__outlined--primary"
          onClick={() => editProfile()}>
          Edit profile
        </button>
      </div>
    </div>
  );
}

export default BasicInfo;

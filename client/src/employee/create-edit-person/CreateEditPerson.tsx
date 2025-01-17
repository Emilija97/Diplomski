import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { PdfImage } from "../../assets";
import { UserType } from "../../auth/store";
import { addNewPerson, UserStatus } from "../../people/store";
import ButtonToggle from "../../shared/button-toggle/ButtonToggle";
import FormAction from "../../shared/form-action/FormAction";
import "../../shared/styles/ni-button.scss";
import "../../shared/styles/ni-text-field.scss";
import { RootState } from "../../store/store";
import { updatePerson } from "../store/actions";
import { navigationMap, Person } from "../store/person-state";
import { createEditFormikConfig } from "./create-edit-formik";
import "./create-edit-person.scss";
import CreateEditPersonCover from "./CreateEditPersonCover";

function CreateEditPerson() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.person);
  const { errorMessage, success } = useSelector((state: RootState) => state.people);
  const history = useHistory();
  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;

  const [selectedItem, setSelectedItem] = useState(id === undefined ? UserStatus.EMPLOYEE : user.status);

  const [cover, setCover] = useState(id === undefined ? "illustration.png" : user.imageSrc);
  const [avatar, setAvatar] = useState(id === undefined ? "camera.png" : user.imageSrc);
  const [cv, setCv] = useState(id === undefined ? "" : user.cv);
  const [file, setFile] = useState();
  const [mode, setMode] = useState(false);
  const [cvFile, setCvFile] = useState();
  const [cvName, setCvName] = useState("");

  useEffect(() => {
    if (success || user.success)
      return chooseAction();
  }, [success, errorMessage, user.success]);

  const onAcceptClick = () => {

    const person: Person = {
      id: id === undefined ? '' : id,
      fullName: formik.values.fullName as string,
      position: formik.values.role as string,
      status: formik.values.status as UserStatus,
      imageSrc: avatar,
      birthDate: formik.values.birthDate as string,
      homeAddress: formik.values.homeAddress as string,
      enrolmentDate: formik.values.enrolmentDate as string,
      email: formik.values.email as string,
      phone: formik.values.phone as string,
      salary: (id === undefined ? undefined : user.salary),
      cv: cv,
      type: id === undefined ? UserType.GUEST : user.type
    };

    id === undefined ? dispatch(addNewPerson(person, file, cvFile)) : dispatch(updatePerson(id, person, file, cvFile));
  };

  const chooseAction = () => {
    id === undefined ? history.push('/people') : history.push(`/user-profile/${id}`);
  }

  const formik = useFormik(createEditFormikConfig(onAcceptClick, (id === undefined ? undefined : user)));

  const onRejectClick = () => {
    history.goBack();
  };

  const changeImage = (event: any) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setCover(reader.result as string);
    };

    reader.readAsDataURL(file);
    setMode(true);

    setFile(event.target.files[0]);
  };

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('fullName', event.target.value);
  }

  const changeRole = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('role', event.target.value);
  }

  const onUploadFile = (event: any) => {
    event.preventDefault();
    setCvFile(event.target.files[0]);
    setCvName(event.target.files[0].name);
  }

  const statusChange = (item: number) => {
    formik.setFieldValue('status', (item));
    setSelectedItem(item);
  }

  const textFieldStyle = (error: boolean) => {
    return "ni-text-field " + (error ? "ni-text-field--error" : "");
  }

  return (
    <div className="create-edit-person">
      <form onSubmit={formik.handleSubmit} className="create-edit-person__form" encType="multipart/form-data">
        <CreateEditPersonCover
          cover={cover}
          avatar={avatar}
          mode={mode}
          name={formik.values.fullName as string}
          role={formik.values.role as string}
          changeName={changeName}
          changeRole={changeRole}
          changeImage={changeImage}

        />
        <div className="create-edit-person__content">
          {errorMessage !== "" ? <h3 className="text-danger">{errorMessage}</h3> : ""}
          <label className="create-edit-person__content-label">Status</label>
          <ButtonToggle
            buttonToggleMap={navigationMap}
            initState={selectedItem}
            onSelectClick={statusChange}
          />
          <div className="create-edit-person__content-form">
            <TextField  {...formik.getFieldProps('birthDate')}
              className={textFieldStyle(formik.touched.birthDate && formik.errors.birthDate ? true : false)}
              helperText={formik.errors.birthDate} label="Birth date" name="birthDate"
              error={formik.touched.birthDate && formik.errors.birthDate ? true : false} />

            <TextField {...formik.getFieldProps('homeAddress')}
              className={textFieldStyle(formik.touched.homeAddress && formik.errors.homeAddress ? true : false)}
              helperText={formik.errors.homeAddress} label="Home Address" name='homeAddress'
              error={formik.touched.homeAddress && formik.errors.homeAddress ? true : false} />

            <TextField {...formik.getFieldProps('enrolmentDate')}
              className={textFieldStyle(formik.touched.enrolmentDate && formik.errors.enrolmentDate ? true : false)}
              helperText={formik.errors.enrolmentDate} label="Enrolment Date" name="enrolmentDate"
              error={formik.touched.enrolmentDate && formik.errors.enrolmentDate ? true : false} />

            <TextField {...formik.getFieldProps('email')}
              className={textFieldStyle(formik.touched.email && formik.errors.email ? true : false)}
              helperText={formik.errors.email} label="Email" name='email'
              error={formik.touched.email && formik.errors.email ? true : false} />
            <TextField {...formik.getFieldProps('phone')}
              className={textFieldStyle(formik.touched.phone && formik.errors.phone ? true : false)}
              helperText={formik.errors.phone} label="Phone" name='phone'
              error={formik.touched.phone && formik.errors.phone ? true : false} />
          </div>
          <label className="create-edit-person__content-label">Link to CV</label>
          <div className="create-edit-person__content-upload-cv">
            <label className="create-edit-person__content-label--upload">
              {cvName ? cvName : "Upload a pdf file"}
            </label>
            <div className="create-edit-person__content-image-upload">
              <label className="create-edit-person__content-custom-file-upload">
                <input type="file" accept="application/pdf, application/msword"
                  className="create-edit-person__content-input-file"
                  ref={fileInput}
                  onChange={onUploadFile} />
                <img alt="" src={PdfImage} />
              </label>
            </div>
          </div>

          <hr className="create-edit-person__content-underline"></hr>
          <FormAction
            mode={true}
            rejectBtnTitle="Cancel"
            acceptBtnTitle="Save"
            onRejectClick={onRejectClick}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateEditPerson;

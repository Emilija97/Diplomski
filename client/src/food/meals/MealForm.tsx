import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { UploadPictureImage } from '../../assets';
import { NiHeader } from '../../shared';
import FormAction from '../../shared/form-action/FormAction';
import { RootState } from '../../store/store';
import "./meal-form.scss";
import { MealFormData, mealFormikConfig } from './meal-formik';
import { addMealInit, loadMealInit, updateMealInit } from './store/actions';
import { selectMealById } from './store/selectors';


function MealForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cateringId, mealType, mealId } = useParams();
  const meal = useSelector((state: RootState) => selectMealById(state, mealId as string));
  const formik = useFormik<MealFormData>(mealFormikConfig(values => handleSubmitClick(values), meal));

  const [mealImage, setMealImage] = useState(meal?.imageSrc);

  useEffect(() => {
    if (mealId != null) dispatch(loadMealInit(mealId as string));
  }, [dispatch, mealId])

  useEffect(() => {
    setMealImage(meal?.imageSrc);
  }, [meal])

  const handleSubmitClick = (values: MealFormData) => {
    mealId == null ?
      dispatch(addMealInit({
        ...values,
        catering: cateringId as string,
        imageSrc: mealImage,
        type: parseInt(mealType as string),
        id: ""
      }
      )) :
      dispatch(updateMealInit({
        ...meal, ...values, imageSrc: mealImage
      }));

    history.goBack();
  }

  const textFieldStyle = (error: boolean) => {
    return "ni-text-field " + (error ? "ni-text-field--error" : "");
  }

  const handleCancelClick = () => {
    history.goBack();
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("l");
    event.preventDefault();

    const reader = new FileReader();
    const file = (event.target.files as FileList)[0];

    reader.onloadend = () => setMealImage(reader.result as string)
    reader.readAsDataURL(file);
  }

  return (
    <div className="meal-form">
      <NiHeader backArrow={true} logo={false} menu={true} title="Meal Title" />
      <div className="meal-form__cover">
        <img alt="" src={mealImage}
          className="meal-form__cover-image" />
        <label htmlFor="123" ><img alt="" src={UploadPictureImage} /></label>
        <input id="123" type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <form className="meal-form__inputs" onSubmit={formik.handleSubmit}>
        <TextField
          {...formik.getFieldProps('name')} label="Name" name="name" fullWidth
          className={textFieldStyle(formik.touched.name && formik.errors.name ? true : false)}
          error={formik.touched.name && formik.errors.name ? true : false}
          helperText={formik.errors.name} />
        <TextField type="number"
          {...formik.getFieldProps('quantity')} label="Quantity" name="quantity" fullWidth
          className={textFieldStyle(formik.touched.quantity && formik.errors.quantity ? true : false)}
          error={formik.touched.quantity && formik.errors.quantity ? true : false}
          helperText={formik.errors.quantity} />
        <TextField
          {...formik.getFieldProps('price')} label="Price" name="price" fullWidth
          className={textFieldStyle(formik.touched.price && formik.errors.price ? true : false)}
          error={formik.touched.price && formik.errors.price ? true : false}
          helperText={formik.errors.price} />
        <TextField
          {...formik.getFieldProps('description')} label="Description" name="description" fullWidth
          className={textFieldStyle(formik.touched.description && formik.errors.description ? true : false)} />
        <div className="meal-form__actions">
          <FormAction
            mode={true}
            rejectBtnTitle="Cancel"
            acceptBtnTitle="Save"
            onRejectClick={handleCancelClick}
          />
        </div>
      </form>
    </div>
  )
}

export default MealForm;
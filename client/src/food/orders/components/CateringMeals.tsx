import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { NiHeader } from '../../../shared';
import FormAction from '../../../shared/form-action/FormAction';
import { RootState } from '../../../store/store';
import { loadCateringsInit } from '../../catering/store/actions';
import { selectCaterings } from '../../catering/store/selectors';
import { loadMealsInit } from '../../meals/store/actions';
import { MealType } from '../../meals/store/meal-types';
import { addOrderInit, changeOrderInit, loadOrdersInit } from '../store/actions';
import { dayOfWeekMap } from '../store/order-state';
import { selectOrderMealsIds } from '../store/selectors';
import '../styles//catering-meals.scss';
import CourseMeals from './CourseMeals';

function CateringMeals() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { day, order, catering, mealType } = useParams();
  const caterings = useSelector((state: RootState) => selectCaterings(state));
  const [selectedCateringId, setSelectedCateringId] = useState(catering);
  const loggedUserId = useSelector((state: RootState) => state.auth.loggedUserId);
  const orderMeals = useSelector((state: RootState) => selectOrderMealsIds(state, order as string));

  const courses: MealType[] = mealType == null ?
    [MealType.MAIN_MEAL, MealType.SALAD, MealType.APPETIZER, MealType.BREAD] : [parseInt(mealType as string)];

  useEffect(() => {
    if (selectedCateringId == null)
      setSelectedCateringId(caterings[0]?.id);
  }, [caterings]);

  useEffect(() => {
    dispatch(loadCateringsInit());
    dispatch(loadOrdersInit(new Date().toLocaleDateString(), loggedUserId));
  }, []);

  useEffect(() => {
    if (selectedCateringId != null) {
      dispatch(loadMealsInit(selectedCateringId));
    }
  }, [dispatch, selectedCateringId]);

  const handleSelectChange = (event: React.ChangeEvent<any>) => {
    setSelectedCateringId(event.target.value);
  }

  const handleMealSelect = (previous: string, next: string) => {
    const indexToDelete = orderMeals.indexOf(previous);

    if (indexToDelete < 0) {
      orderMeals.push(next);
    }
    else {
      orderMeals[indexToDelete] = next;
    }
  }

  const handleCancelClick = () => {
    history.goBack();
  }

  const handleSubmitClick = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(day as string) - date.getDay());

    order == null ?
      dispatch(addOrderInit({
        user: loggedUserId,
        catering: selectedCateringId as string,
        meals: orderMeals,
        date: date.toLocaleDateString()
      })) :
      dispatch(changeOrderInit(order as string, orderMeals, catering as string));
  }

  return (
    <div className='catering-meals'>
      <NiHeader backArrow={true} logo={false} menu={true}
        title={dayOfWeekMap.get(parseInt(day as string)) as string} />

      <div className='catering-meals__content'>
        <div hidden={mealType != null}>
          <FormControl className="catering-meals__select-form">
            <Select native autoWidth value={selectedCateringId} onChange={handleSelectChange}>
              {caterings?.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </Select>
          </FormControl>
        </div>

        {courses.map(course =>
          <CourseMeals key={course}
            catering={selectedCateringId as string}
            course={course}
            onMealSelect={handleMealSelect} />
        )}

        <div className="catering-meals__actions">
          <FormAction
            mode={true}
            rejectBtnTitle="Cancel" acceptBtnTitle="Save"
            onRejectClick={handleCancelClick} onAcceptClick={handleSubmitClick}
          />
        </div>
      </div>

    </div>
  )
}

export default CateringMeals;
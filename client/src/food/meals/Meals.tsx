import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { DeleteImage, PlusImage } from '../../assets';
import { NiHeader, NiIconButton } from '../../shared';
import { RootState } from '../../store/store';
import { loadCateringInit } from '../catering/store/actions';
import MealCard from './MealCard';
import "./meals.scss";
import { deleteMealsInit, loadMealsInit } from './store/actions';
import { Meal, mealTypesMap } from './store/meal-types';
import { selectMealsByType } from './store/selectors';

function Meals() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cateringId, mealType } = useParams();

  const [selectedMealsIds, setSelectedMealsIds] = useState<string[]>([]);

  const meals: Meal[] = useSelector((state: RootState) =>
    selectMealsByType(state, cateringId as string, parseInt(mealType as string)));

  useEffect(() => {
    dispatch(loadCateringInit(cateringId as string));
    dispatch(loadMealsInit(cateringId as string, parseInt(mealType as string)));
  }, [dispatch, cateringId, mealType]);

  const handleMealCardClick = (id: string) => {
    setSelectedMealsIds([]);
    history.push(`${history.location.pathname}/form/${id}`);
  }

  const handleMealCardPress = (mealId: string) => {
    selectedMealsIds.includes(mealId) ?
      setSelectedMealsIds(selectedMealsIds.filter(id => id !== mealId)) :
      setSelectedMealsIds([...selectedMealsIds, mealId]);
  }

  const handleAddMealClick = () => {
    setSelectedMealsIds([]);
    history.push(`${history.location.pathname}/form`);
  }

  const handleDeleteMealsClick = () => {
    dispatch(deleteMealsInit(selectedMealsIds));
    setSelectedMealsIds([]);
  }

  return (
    <div className="meals">
      <NiHeader backArrow={true} logo={false} menu={true} title={mealTypesMap.get(parseInt(mealType as string)) as string} />
      <div className="meals__options">
        <div className="meals__title">{mealTypesMap.get(parseInt(mealType as string))}</div>
        <div className="meals__actions">
          <NiIconButton srcIcon={PlusImage} onClick={handleAddMealClick} />
          <NiIconButton hidden={selectedMealsIds.length === 0}
            srcIcon={DeleteImage} onClick={handleDeleteMealsClick} />
        </div>
      </div>
      <div className="meals__items">
        {meals?.map(meal =>
          <MealCard
            key={meal.id} {...meal}
            selected={selectedMealsIds.filter(id => id === meal.id).length !== 0}
            onClick={() => handleMealCardClick(meal.id)} onPress={() => handleMealCardPress(meal.id)} />)}
      </div>
    </div>
  )
}

export default Meals;
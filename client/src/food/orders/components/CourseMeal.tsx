import React, { useState } from 'react';
import { CheckImage, RoundedPlusImage } from '../../../assets';
import { NiIconButton } from '../../../shared';
import '../../../shared/styles/ni-button.scss';
import { Meal } from '../../meals/store/meal-types';
import '../styles/course-meal.scss';
import FoodForm from './FoodForm';

interface CourseMealProps {
  meal: Meal,
  selectedMeal: string,
  onMealSelect: (meal: string) => void
}

function CourseMeal(props: CourseMealProps) {
  const [isFoodFormOpen, setIsFoodFormOpen] = useState(false);

  const handleMealSelect = () => {
    props.onMealSelect(props.meal.id);
    setIsFoodFormOpen(false);
  }

  return (
    <div className='course-meal'>
      <div className='course-meal__text' onClick={() => setIsFoodFormOpen(true)}>
        <div className='course-meal__name'>{props.meal.name}</div>
        <div className="course-meal__details">
          <div className="course-meal__quantity">{props.meal.quantity} gr</div>
          <div className="course-meal__price">{props.meal.price} din</div>
        </div>
      </div>
      <FoodForm
        meal={props.meal} onAddToOrder={handleMealSelect}
        isSelected={props.selectedMeal === props.meal.id}
        open={isFoodFormOpen}
        onClose={() => setIsFoodFormOpen(false)}
      />
      <div className='course-meal__action'>
        <NiIconButton onClick={handleMealSelect}
          srcIcon={props.selectedMeal === props.meal.id ? CheckImage : RoundedPlusImage} />
      </div>
    </div>
  )
}

export default CourseMeal;
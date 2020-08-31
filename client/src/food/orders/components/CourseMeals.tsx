import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ListItem } from '../../../shared';
import { RootState } from '../../../store/store';
import { mealsCourseImageMap, MealType, mealTypesMap } from '../../meals/store/meal-types';
import { selectCourseMealsByCatering } from '../../meals/store/selectors';
import { selectCourseMealFromOrder } from '../store/selectors';
import "../styles/course-meals.scss";
import CourseMeal from './CourseMeal';

interface CourseMealsProps {
  catering: string,
  course: MealType,
  onMealSelect: (previous: string, next: string) => void
}

function CourseMeals(props: CourseMealsProps) {
  const { order } = useParams<{ order: string }>();

  const meals = useSelector((state: RootState) =>
    selectCourseMealsByCatering(state, props.catering, props.course));

  let initialSelectedMeal = useSelector((state: RootState) =>
    selectCourseMealFromOrder(state, order, props.course));

  const [selectedMeal, setSelectedMeal] = useState(initialSelectedMeal);

  useEffect(() => {
    setSelectedMeal(initialSelectedMeal);
  }, [initialSelectedMeal])

  const handleMealSelect = (meal: string) => {
    const previous: string = selectedMeal;
    const next = selectedMeal === meal ? "" : meal;

    setSelectedMeal(next);
    props.onMealSelect(previous, next);
  }

  return (
    <div className="course-meals">
      <ListItem className="course-meals__title"
        image={mealsCourseImageMap.get(props.course) as string}
        title={mealTypesMap.get(props.course) as string} />
      <div className="">
        {meals?.map(meal =>
          <CourseMeal
            key={meal.id}
            meal={meal}
            onMealSelect={handleMealSelect}
            selectedMeal={selectedMeal} />)}
      </div>
    </div>
  )
}

export default CourseMeals;
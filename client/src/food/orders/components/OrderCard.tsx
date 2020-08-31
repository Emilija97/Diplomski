import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../../store/store';
import { Meal, MealType, mealTypesMap } from '../../meals/store/meal-types';
import { DayOfWeek, dayOfWeekMap, Order } from '../store/order-state';
import { selectOrderMeals } from '../store/selectors';
import '../styles/order-card.scss';

interface OrderCardProps extends Order {
  day: DayOfWeek,
  disableActions?: boolean
}

function OrderCard(props: OrderCardProps) {
  const history = useHistory();
  const meals: Meal[] | null = useSelector((state: RootState) => selectOrderMeals(state, props.id));

  const handleOrderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.disableActions) return;

    props.id == null ?
      history.push(`/weekly-orders/${props.day}`) :
      history.push(`/weekly-orders/${props.day}/${props.id}/${props.catering}`);
  }

  const handleOrderMealClick = (mealType: MealType) => {
    if (props.disableActions) return;

    history.push(`/weekly-orders/${props.day}/${props.id}/${props.catering}/${mealType}`);
  }

  return (
    <div className='order-card'>
      <div className='order-card__header' onClick={handleOrderClick}>{dayOfWeekMap.get(props.day) as string}</div>
      {meals?.map(meal =>
        <div key={meal?.id} className='order-card__item' onClick={() => handleOrderMealClick(meal.type)}>
          <div className='order-card__item-border'></div>
          <div className='order-card__item-title'>{mealTypesMap.get(meal?.type)}</div>
          <div className='order-card__item-text'>{meal?.name}</div>
        </div>
      )}
    </div>
  )
}

export default OrderCard;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { BreadImage, DessertsImage, MainCourseImage, SaladsImage } from '../../assets';
import { NiHeader } from '../../shared';
import ListItem, { ListItemProps } from '../../shared/list-item/ListItem';
import { RootState } from '../../store/store';
import { MealType } from '../meals/store/meal-types';
import "./catering.scss";
import { loadCateringInit } from './store/actions';
import { selectCatering } from './store/selectors';


const cateringMenuItems: ListItemProps[] = [
  {
    title: "Main Course",
    image: MainCourseImage,
    url: MealType.MAIN_MEAL.toString()
  },
  {
    title: "Appetizer",
    image: DessertsImage,
    url: MealType.APPETIZER.toString()
  },
  {
    title: "Salads",
    image: SaladsImage,
    url: MealType.SALAD.toString()
  },
  {
    title: "Bread",
    image: BreadImage,
    url: MealType.BREAD.toString()
  }
]

function Catering() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cateringId } = useParams<{ cateringId: string }>();
  const catering = useSelector((state: RootState) => selectCatering(state, cateringId as string));

  useEffect(() => {
    dispatch(loadCateringInit(cateringId as string));
  }, [dispatch, cateringId]);

  const handleMenuItemClick = (url: string) => {
    history.push(`${history.location.pathname}/meal-types/${url}`);
  }

  return (
    <div className="catering">
      <NiHeader backArrow={true} logo={false} menu={true} title={catering?.name} />
      <div className="catering__title">Menu</div>
      <div className="catering__items">
        {cateringMenuItems.map(item =>
          <ListItem
            image={item.image}
            title={item.title}
            key={item.url}
            className="catering__item"
            onClick={() => handleMenuItemClick(item.url as string)} />
        )}
      </div>
    </div>
  )
}

export default Catering;
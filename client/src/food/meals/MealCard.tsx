import React, { createRef, useEffect } from 'react';
import { MarkedImage } from '../../assets';
import "./meal-card.scss";
import { Meal } from './store/meal-types';

interface MealCardProps extends Meal {
  onClick: HammerListener,
  onPress: HammerListener,
  selected: boolean
}

function MealCard(props: MealCardProps) {
  const cardRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const hammer = new Hammer(cardRef.current as HTMLDivElement);
    if (props.onPress) hammer.on("press", props.onPress);
    if (props.onClick) hammer.on("tap", props.onClick);
    return () => {
      hammer.off("press");
      hammer.off("tap");
    }
  }, [cardRef, props.onPress, props.onClick]);

  return (
    <div ref={cardRef} className={"meal-card" + (props.selected ? " meal-card--selected" : "")}>
      <div className="meal-card__image-container">
        <img className="meal-card__image" alt="" src={props.imageSrc} />
        <div hidden={!props.selected} className="meal-card__overlay-image"><img alt="" src={MarkedImage} /></div>
      </div>
      <div className="meal-card__content">
        <div className="meal-card__title">{props.name}</div>
        <div className="meal-card__details">
          <div className="meal-card__quantity">{props.quantity} gr</div>
          <div className="meal-card__price">{props.price} din</div>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
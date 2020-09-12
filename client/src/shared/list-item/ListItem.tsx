import Hammer from "hammerjs";
import React, { createRef, useEffect } from 'react';
import { MarkedImage } from '../../assets';
import "./list-item.scss";

export interface ListItemProps {
  image: string,
  contextIcon?: string,
  title: string,
  subtext?: string,
  className?: string,
  selected?: boolean,
  onPress?: HammerListener;
  onClick?: HammerListener;
  url?: string
}

function ListItem(props: ListItemProps) {
  const cardRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const hammer = new Hammer(cardRef.current as HTMLDivElement);
    hammer.set({ domEvents: true });
    if (props.onPress) hammer.on("press", props.onPress);
    if (props.onClick) hammer.on("tap", (event) => {
      event.srcEvent.stopImmediatePropagation();
      props.onClick && props.onClick(event);
    });
    return () => {
      hammer.off("press");
      hammer.off("tap");
    }
  }, [cardRef, props.onPress, props.onClick]);

  return (
    <div ref={cardRef}
      className={"list-item " + props.className + (props.selected ? " list-item--selected" : "")}>
      <div className="list-item__image-container">
        <img className="list-item__image" alt="" src={`http://localhost:5000/uploads/${props.image}`} />
        <img className="list-item__overlay-image" hidden={!props.selected} alt="" src={MarkedImage} />
      </div>
      <div className="list-item__info">
        <div className="list-item__name">{props.title}</div>
        <div className="list-item__position">{props.subtext}</div>
      </div>
      <img hidden={props.contextIcon == null} alt="" src={props.contextIcon} className="list-item__context-icon" />
    </div>
  );
}

export default ListItem;
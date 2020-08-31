import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import 'date-fns';
import React from "react";
import "../../../shared/styles/ni-button.scss";
import "../../../shared/styles/ni-dialog.scss";
import { Meal } from "../../meals/store/meal-types";
import "../styles/food-form.scss";

interface Props {
  meal: Meal,
  isSelected: boolean,
  open: boolean,
  onClose: () => void,
  onAddToOrder: () => void
}

function FoodForm(props: Props) {
  return (
    <div className="food-form">
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="draggable-dialog-title"
        className="ni-dialog"
      >
        <DialogContent>
          <div className="food-form__image"><img alt="" src={props.meal.imageSrc}></img></div>
          <div className="food-form__title">{props.meal.name}</div>
          <div className="food-form__informations">
            <div>{props.meal.quantity} gr</div>
            <div>{props.meal.price} din</div>
          </div>
          <div className="food-form__description">{props.meal.description}</div>
          <div className="food-form__actions">
            <button
              className="ni-button ni-button--small ni-button__contained ni-button__contained--primary"
              onClick={props.onAddToOrder} >
              {props.isSelected ? "Remove from order" : "Add to order"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FoodForm;
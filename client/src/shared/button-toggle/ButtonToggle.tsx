
import React, { useState } from 'react';
import "./button-toggle.scss";

interface ButtonToggle {
  buttonToggleMap: Map<string, string>;
  initState: string;
  onSelectClick: (value: string) => void;
}

function ButtonToggle(props: ButtonToggle) {

  const [selected, setSelected] = useState(props.initState);

  const chosenBtnChange = (item: string) => {
    setSelected(item);
    props.onSelectClick(item);
  }

  return (
    <div className="button-toggle">
      {Array.from(props.buttonToggleMap.keys()).map(item => {
        return (
          <button type="button"
            key={item}
            className={`ni-button ni-button--small ni-button--small ni-button__outlined--inactive ${
              selected === item
                ? `ni-button__text ni-button__text--selected button-toggle__status-buttons-selected`
                : "ni-button__outlined button-toggle__status-buttons-inactive-btn"
              }`}
            onClick={() => chosenBtnChange(item)}>
            {props.buttonToggleMap.get(item)}
          </button>
        );
      })}
    </div>
  )
}

export default ButtonToggle;
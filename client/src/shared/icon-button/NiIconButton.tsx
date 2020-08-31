import React, { MouseEvent } from 'react';
import "../styles/ni-button.scss";
import "./ni-icon-button.scss";

interface IconButtonProps {
  srcIcon: string,
  onClick?: (event: MouseEvent) => void,
  className?: string,
  hidden?: boolean
}

function NiIconButton(props: IconButtonProps) {
  return (
    <button className={"ni-icon-button ni-button ni-button__circle " + props.className}>
      <img hidden={props.hidden} alt="" src={props.srcIcon} onClick={props.onClick} />
    </button>
  );
}

export default NiIconButton;
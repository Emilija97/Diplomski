import React, { ChangeEvent } from 'react';
import { LoopImage } from '../../assets';
import "./search-field.scss";

interface ISearchField {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function SearchField(props: ISearchField) {
  return (
    <div className="search-field">
      <div className="search-field__image">
        <img alt="" src={LoopImage} />
      </div>
      <div className="search-field__input-container">
        <input className="search-field__input" type="text"
          onChange={props.onChange} placeholder="Search..." />
      </div>
    </div>
  )
}

export default SearchField;
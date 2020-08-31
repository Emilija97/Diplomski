import { Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CateringImage, PlusImage } from '../../assets';
import { ListItem, NiHeader, NiIconButton } from '../../shared';
import { RootState } from '../../store/store';
import AddCateringForm from './AddCateringForm';
import "./caterings.scss";
import { loadCateringsInit } from './store/actions';
import { selectCaterings } from './store/selectors';


function Caterings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const caterings = useSelector((state: RootState) => selectCaterings(state));
  const [isCateringFormOpen, setIsCateringFormOpen] = useState(false);

  useEffect(() => {
    dispatch(loadCateringsInit());
  }, [dispatch]);

  const handleCateringClick = (id: string) => {
    history.push(`/caterings/${id}`);
  }

  const handleCloseDialog = () => {
    setIsCateringFormOpen(false);
  }

  const handleAddCateringClick = () => {
    setIsCateringFormOpen(true);
  }

  return (
    <div className="caterings">
      <NiHeader backArrow={true} logo={false} menu={true} title="Food" />
      <div className="caterings__menu">
        <div className="caterings__title">Catering Services </div>
        <NiIconButton onClick={handleAddCateringClick} srcIcon={PlusImage} className="caterings__plus-button" />
      </div>
      <div className="caterings__items">
        {caterings.map(catering =>
          <ListItem
            image={CateringImage}
            title={catering.name}
            subtext={catering.description}
            key={catering.id}
            className="caterings__item"
            onClick={() => handleCateringClick(catering.id)} />
        )}
      </div>
      <Dialog open={isCateringFormOpen}>
        <AddCateringForm onClose={handleCloseDialog} />
      </Dialog>
    </div>
  )
}

export default Caterings;
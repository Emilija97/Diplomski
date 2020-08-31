import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { NiIconButton } from '..';
import { BackArrowImage, LogoImage, MenuImage } from '../../assets';
import UserMenu from '../../user-menu/UserMenu';
import "./ni-header.scss";

interface INiHeader {
  backArrow: boolean,
  menu: boolean,
  logo: boolean,
  title: string,
  className?: string
}

function NiHeader(props: INiHeader) {
  const history = useHistory();
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  const handleMenuClick = () => {
    setUserMenuVisibility(true);
  }

  const handleBackClick = () => {
    history.goBack();
  }

  const onUserMenuClose = () => {
    setUserMenuVisibility(false);
  }

  const titleStyle = (): string => {
    return props.logo ? "ni-header__logo-title" : "ni-header__title";
  }

  return (
    <div className={"ni-header " + props.className}>
      <NiIconButton hidden={!props.backArrow} onClick={handleBackClick}
        srcIcon={BackArrowImage} className="ni-header__arrow" />
      <div className="ni-header__logo">
        <img hidden={!props.logo} className="ni-header__logo-image" alt="" src={LogoImage} />
        <div className={titleStyle()}>{props.title}</div>
      </div>
      <NiIconButton hidden={!props.menu} onClick={handleMenuClick}
        srcIcon={MenuImage} className="ni-header__menu" />
      <Dialog fullScreen open={userMenuVisibility} className="ni-header__dialog" >
        <UserMenu onClose={onUserMenuClose} />
      </Dialog>
    </div>
  )
}

export default NiHeader;
import React from 'react';
import { LoadingScreenImage } from '../assets';
import "./loading-screen.scss";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img alt="" src={LoadingScreenImage}></img>
    </div>
  );
}

export default LoadingScreen;
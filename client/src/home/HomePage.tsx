import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { HomeImage } from "../assets";
import { UserType } from "../auth/store";
import { NiHeader } from "../shared";
import "../shared/styles/ni-button.scss";
import { RootState } from "../store/store";
import "./home-page.scss";

function HomePage() {
  const history = useHistory();
  const { loggedUserType } = useSelector((state: RootState) => state.auth);

  const handleLoginClick = () => {
    history.push("/login");
  }

  if (loggedUserType !== UserType.GUEST) {
    return (<Redirect to="/dashboard" />);
  }

  return (
    <div className="home-page">
      <NiHeader backArrow={false} logo={true} menu={false} title="NIGNITE" />
      <div className="home-page__body">
        <div className="home-page__body-title">Welcome to Nignite!</div>
        <div className="home-page__welcome-text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </div>
        <div className="home-page__auth">
          <button onClick={handleLoginClick}
            className="ni-button ni-button--medium ni-button--full-width
              ni-button__contained ni-button__contained--primary">
            Log in
          </button>
          <div className="home-page__sign-up">Don't have an account?
            <Link to="/register" className="home-page__sign-up-link">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="home-page__background">
        <img alt="" src={HomeImage} className="home-page__background-image" />
      </div>
    </div>
  );
}

export default HomePage;

// src/components/ContentSwitcher.js
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import ImgCarousel from "../../../Slot7/Carousel";
import CompanyTable from "../../../Slot3/bootstrap-included/components/CompanyTable";

const ContentSwitcher = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return (
      <>
        <Profile />
        <ImgCarousel />
        <CompanyTable />
      </>
    );
  }

  return <LoginForm />;
};

export default ContentSwitcher;

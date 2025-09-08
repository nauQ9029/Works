import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "./components/HeroSection"
import CategorySection from "./components/CategorySection";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import ReviewSection from "./components/ReviewSection";


const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection/>
      <FeatureSection/>
      <AboutSection/>
      <ReviewSection/>
    </>

  )
};

export default LandingPage;

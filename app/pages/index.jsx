import React from "react";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeCom from "../components/Home";
import CustomHead from "../components/CustomHead";

export default function Hello() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";

  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <HomeCom />
    </>
  );
}

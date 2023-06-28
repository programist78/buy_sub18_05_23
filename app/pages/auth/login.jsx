import React from "react";
import CustomHead from "../../components/CustomHead";
import LoginCom from "../../components/Auth/Login";

export default function Login() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";

  return (
    <>
      <CustomHead pageTitle={pageTitle} pageDescription={pageDescription} />
      <LoginCom />;
    </>
  );
}

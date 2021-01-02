import debounce from "lodash.debounce";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const AppLayout = ({Body,isLoggedIn=false}) => {
  useEffect(() => {
    setVh();
    window.addEventListener("resize", debounce(setVh, 200), false);

    return window.removeEventListener("resize", setVh, false);
  }, []);

  const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn}/>
      {Body}
      <Footer />
    </BrowserRouter>
  );
};

export default AppLayout;

import React from "react";
import BasicCalculator from "../BasicCalculator";

import { ReactComponent as HeaderThing } from '../../asserts/header_thing.svg';

import '../../styles/MainPage.css';

const MainPage = () => {

  const currentScreen = window.screen.width;


  return (
    <>
      <div className="m-5 mt-4 main-div">
        <div className={currentScreen > 768 ? "d-flex justify-content-between " : ""}>
          <div className="p-logo ">Калькулятор для предпринимателей </div>
          {currentScreen > 768 ? < div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринимателей, расчитайте инвестиции в два клика!</div> : <></>}
        </div>
        <h1 className="h1-main">Расчитай вложения <HeaderThing /></h1>
        {currentScreen <= 768 ? < div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринимателей, расчитайте инвестиции в два клика!</div> : <></>}
        < BasicCalculator />
      </div >
    </>
  )
};

export default MainPage;

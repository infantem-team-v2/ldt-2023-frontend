import React from "react";
import DistrictsMap from "../DistrictsMap";
import BasicCalculator from "../BasicCalculator";

import { ReactComponent as HeaderThing } from '../../asserts/header_thing.svg';

import '../../styles/MainPage.css';

const MainPage = () => {


  return (
    <>
      <div className="m-5 mt-4 main-div">
        <div className="d-flex justify-content-between ">
          <div className="p-logo ">Калькулятор для предпринимателей </div>
          <div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринимателей, расчитайте инвестиции в два клика!</div>
        </div>
        <h1 className="h1-main">Расчитай вложения <HeaderThing /></h1>


        <BasicCalculator />
        <DistrictsMap />
      </div>
    </>
  )
};

export default MainPage;

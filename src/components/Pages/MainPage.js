import React from "react";
import BasicCalculator from "../BasicCalculator";

import { ReactComponent as HeaderThing } from '../../asserts/header_thing.svg';

import '../../styles/MainPage.css';
import RegularSlider from "../ui-kit/RegularSlider";

const MainPage = ({ isLogedIn }) => {

  const currentScreen = window.screen.width;

  const [fields, setFields] = React.useState();


  return (
    <>
      <div className="m-5 mt-4 main-div">
        <div className={currentScreen > 768 ? "d-flex justify-content-between " : ""}>
          <div className="p-logo ">Калькулятор для предпринимателей </div>
          {currentScreen > 768 ? < div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринимателей, расчитайте инвестиции в два клика!</div> : <></>}
        </div>
        <h1 className="h1-main">Рассчитай вложения <HeaderThing /></h1>
        {currentScreen <= 768 ? < div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринимателей, расчитайте инвестиции в два клика!</div> : <></>}
        < BasicCalculator isLogedIn={isLogedIn} />

      </div >
      <RegularSlider
        controlId='accounting-operations'
        label='Количество бухгалтерских операций'
        value={fields}
        onChange={(e) => { setFields(e.target.value) }}
        overlay={<p>Количество бухгалтерских операций в месяц'</p>}
        formLabel={"Количество бухгалтерских операций: "}
      />
    </>
  )
};

export default MainPage;

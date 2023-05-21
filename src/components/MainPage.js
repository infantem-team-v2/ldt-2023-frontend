import DistrictsMap from "./DistrictsMap";
import BasicCalculator from "./BasicCalculator";
import ProgressBar from "./ProgressBar";

import { ReactComponent as HeaderThing } from '../asserts/header_thing.svg';

import '../styles/MainPage.css';

const MainPage = () => {

  return (
    <>
      <div className="m-5 mt-4 main-div">
        <div className="d-flex justify-content-between ">
          <p className="p-logo">Калькулятор для предпренимателей </p>
          <div className="p-logo p-logo-span">Быстрый и удобный инструмент для<br /> московских предпринемателей,<br /> расчитайте инвестиции в два клика!</div>
        </div>
        <h1 className="h1-main">Рассчитай вложения <HeaderThing /></h1>

        <ProgressBar range={10} current={1} />
      </div>
    </>
  )
};

export default MainPage;

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
          <div className="p-logo ">Калькулятор для предпренимателей </div>
          <div className="p-logo secondary-head-sign">Быстрый и удобный инструмент для московских предпринемателей, расчитайте инвестиции в два клика!</div>
        </div>
        <h1 className="h1-main">Расчитай вложения <HeaderThing /></h1>

        <ProgressBar range={10} current={1} />
        <DistrictsMap />

      </div>
    </>
  )
};

export default MainPage;

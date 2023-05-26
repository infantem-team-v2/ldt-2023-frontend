import React from "react";

import { ReactComponent as F404Svg } from "../../asserts/img404.svg";

import "../../styles/F404Page.css";


const F404Page = () => {
  return (
    <div className="text-center page-404-container">
      <h1 className="h1-404">Ooops...</h1>
      <h1 className="h1-404">Что-то пошло не так</h1>
      <F404Svg className="img-fluid img-404" />
      <p className="p-404 ">Произошла ошибка 404</p>
      <p className="p-404 ">Страница не найдена</p>
    </div>
  );
};

export default F404Page;
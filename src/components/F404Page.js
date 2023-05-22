import React from "react";

import f404path from "../asserts/f404_img.jpg";

import "../styles/F404Page.css";


const F404Page = () => {
  return (
    <div className="container text-center mt-4">
      <h1 className="h1-404">Ooops...</h1>
      <h1 className="h1-404">Что-то пошло не так</h1>
      <img src={f404path} alt="404" className="img-fluid " style={{
        width: "57%",
        height: "auto",
        mixBlendMode: "multiply",
        filter: "brightness(1.2)",
      }} />
      <p className="p-404">Произошла ошибка 404 <br />Страница не найдена</p>
    </div>
  );
};

export default F404Page;
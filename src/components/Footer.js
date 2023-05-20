import React from "react";

const Footer = () => {
  const colClassName = "col-md-3 col-sm-6";
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container ">
        <div className="row d-flex align-items-space-around text-center">
          <div className="col-md-3">
            <h5>Быстрая навигация</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" className="text-white">O нас</a>
              </li>
              <li>
                <a href="#track-order" className="text-white">Отследить заказ</a>
              </li>
              <li>
                <a href="#our-adventages" className="text-white">Наши преимущества</a>
              </li>
              <li>
                <a href="#top-products" className="text-white"></a>
              </li>
              <li>
                <a href="#contacts" className="text-white">Контакты</a>
              </li>
            </ul>
          </div>
          <div className={colClassName}>
            <h5>sdgfsfdsfsdfs</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://vk.com/@prettydelivery-ustanovka-poizon" className="text-white" target="_blank">
                  Tutorial
                </a>
              </li>
            </ul>
          </div>
          <div className={colClassName}>
            <h5>:dfdfdfdf</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://www.facebook.com" target="_blank" className="text-white">
                  fdfsdfs
                </a>
              </li>
            </ul>
          </div>
          <div className={colClassName}>
            <h5>Отзывы</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://vk.com/@prettydelivery-ustanovka-poizon" className="text-white" target="_blank">
                  Смотреть отзывы
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
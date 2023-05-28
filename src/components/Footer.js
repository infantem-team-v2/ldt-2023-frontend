import React from "react";

import "../styles/Footer.css";

import { ReactComponent as Logo } from "../asserts/logo-big-black.svg";
const Footer = () => {


  // get screen size
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const colClassName = screenSize < 768 ? 'footer-col' : "footer-col";
  const mainRowClassName = screenSize < 768 ? 'footer-main-div' : "footer-main-div-desc";

  return (
    <footer>
      <div className="container">
        <div className="footer-logo">
          <Logo className='img footer-logo' />
        </div>
        <div className={mainRowClassName}>

          <div className={colClassName}>
            <h5>© 2023 Hack</h5>
          </div>
          <div className={colClassName}>
            <h5>InfantemTeam</h5>
          </div>
          <div className={colClassName}>
            <h5>InfantemTeam@gmail.com</h5>
          </div>
          <div className={colClassName}>
            <h5>Designed by InfantemTeam</h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
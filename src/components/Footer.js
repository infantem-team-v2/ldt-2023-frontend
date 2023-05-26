import React from "react";

import "../styles/Footer.css";

const Footer = () => {


  // get screen size
  const [screenSize, setScreenSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    console.log("screenSize", screenSize)
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colClassName = screenSize < 768 ? 'footer-col' : "col-md-3 col-sm-6 footer-col";
  const mainRowClassName = screenSize < 768 ? 'footer-main-div' : "row d-flex align-items-space-around text-center footer-main-div";

  return (
    <footer className="bg-dark text-light py-3 ">
      <div className="container">
        <div className="footer-logo">
          <h5>LOGO<span>/INFANTEM</span></h5>
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
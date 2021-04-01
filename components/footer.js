import moment from "moment";
import React from "react";

const Footer = () => (
  <footer className="small copywright-text">
    <div className="container">
      <div className="row justify-content-center">
        © {moment().format("YYYY")} Eva Denys
      </div>
    </div>
  </footer>
);

export default Footer;

import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footerLists">
        <ul className="footerList">
          <li className="footerLinks">Countries</li>
          <li className="footerLinks">Regions</li>
          <li className="footerLinks">Cities</li>
          <li className="footerLinks">Districts</li>
          <li className="footerLinks">Airpots</li>
        </ul>
        <ul className="footerList">
          <li className="footerLinks">Houses</li>
          <li className="footerLinks">Apartments</li>
          <li className="footerLinks">Villas</li>
          <li className="footerLinks">Resorts</li>
          <li className="footerLinks">Cabins</li>
        </ul>
        <ul className="footerList">
          <li className="footerLinks">Unique places to stay</li>
          <li className="footerLinks">Guest houses</li>
          <li className="footerLinks">Discover</li>
          <li className="footerLinks">All destinations</li>
          <li className="footerLinks">All flight destinations</li>
        </ul>
      </div>
      <p>WANDERERS &#169; 2023</p>
    </div>
  );
}

export default Footer;

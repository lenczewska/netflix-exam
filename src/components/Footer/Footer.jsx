import React from "react";
import "./Footer.css";
import instagram_icon from "../../assets/img/instagram_icon.png";
import youtube_icon from "../../assets/img/youtube_icon.png";
import facebook_icon from "../../assets/img/facebook_icon.png";

function Footer() {
  return (
    <div className="footer  p-[30px_4%] max-w-[1000px] m-auto">
      <div className="footer-icons flex gap-[20px] ml-[10px] mb-[10px]  mt-[60px] pl-[10px]">
        <img className="cursor-pointer w-[25px]" src={facebook_icon} alt="" />
        <img className="cursor-pointer w-[25px]" src={instagram_icon} alt="" />
        <img className="cursor-pointer w-[25px]" src={youtube_icon} alt="" />
      </div>

      <ul className="grid grid-cols-[auto_auto_auto_auto] mt-[20px]  text-[14px] gap-[15px] text-[#787878] mb-[30px]">
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright text-[14px] text-[#787878]">
        © 2025 Netflix clone by <b className="text-[#6e0000]">Kotlyarova</b>{" "}
      </p>
    </div>
  );
}

export default Footer;

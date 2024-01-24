import React from "react";
import "./Footer.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { GitHub, Instagram, LinkedIn, Mail } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">ABOUT ME</Typography>
        <Typography>
          Hey!, my name is Rohit Mehra, I am a FullStack Developer.
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a
          href="https://www.instagram.com/_simply.rohit_?igsh=MWZpaXhqbm1iaDNmYw=="
          target="_blank"
        >
          <Instagram />
        </a>
        {/* <a><GitHub /></a> */}
        <a href="mailto:rohitmehra2k@gmail.com">
          <Mail />
        </a>
        <a href="https://www.linkedin.com/in/rohitmehra2k" target="_blank">
          <LinkedIn />
        </a>
      </div>
    </div>
  );
};

export default Footer;

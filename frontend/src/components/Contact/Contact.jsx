import React, { useEffect, useState } from "react";
import "./Contact.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../actions/user";
import { useAlert } from "react-alert";

const Contact = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageVal, setMessage] = useState("");

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, messageVal));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (loginMessage) {
      alert.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGES" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGES" });
    }
  }, [alert, message, error, dispatch, loginMessage]);
  return (
    <div className="contact">
      <div className="contactRightBar"></div>
      <div className="contactContainer">
        <form className="contactContainerForm" onSubmit={contactFormHandler}>
          <Typography variant="h4">Contact Us</Typography>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Message"
            required
            value={messageVal}
            onChange={(e) => setMessage(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
          <Button variant="contained" type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

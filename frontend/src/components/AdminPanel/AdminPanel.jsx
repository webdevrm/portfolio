import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdTimeline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineProject } from "react-icons/ai";
import { GiSkills } from "react-icons/gi";
import { getUser, logout, updateUser } from "../../actions/user";
import { useAlert } from "react-alert";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message: loginMessage } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(name, email, password, about));
    dispatch(getUser());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleAboutImage = (e) => {
    const Reader = new FileReader();
    Reader.readAsDataURL(e.target.files[0]);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAbout({ ...about, avtar: Reader.result });
        console.log("Reader.result ::::", Reader.result);
      }
    };
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
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Name"
            className="adminPanelsInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="adminPanelsInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="adminPanelsInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <div className="adminPanelSkill">
            <div>
              <Typography>Skill 1</Typography>
              <input
                className="admilPanelFileUpload"
                type="file"
                onChange={(e) => handleImage(e, 1)}
                accept="image/*"
              />
            </div>
          </div> */}
          <div className="adminPanelAbout">
            <fieldset>
              <legend>About</legend>
              <input
                type="text"
                placeholder="Name"
                className="adminPanelsInput"
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Title"
                className="adminPanelsInput"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subtitle"
                className="adminPanelsInput"
                value={about.subtitle}
                onChange={(e) =>
                  setAbout({ ...about, subtitle: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="adminPanelsInput"
                value={about.description}
                onChange={(e) =>
                  setAbout({ ...about, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Quote"
                className="adminPanelsInput"
                value={about.quote}
                onChange={(e) => setAbout({ ...about, quote: e.target.value })}
              />
              <input
                type="file"
                placeholder="Choose Avtar"
                className="admilPanelFileUpload"
                onChange={handleAboutImage}
                accept="image/*"
              />
            </fieldset>
          </div>

          <Link to="/admin/skills">
            Skills <GiSkills />
          </Link>
          <Link to="/admin/timeline">
            Timeline <MdTimeline />
          </Link>
          <Link to="/admin/project">
            Projects <AiOutlineProject />
          </Link>
          <Button type="submit" variant="contained" disabled={loading}>
            Update
          </Button>
        </form>

        <Button
          variant="contained"
          color="error"
          style={{ display: "block", margin: "4vmax auto" }}
          onClick={logoutHandler}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;

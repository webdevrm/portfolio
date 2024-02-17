import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addSkills, getUser } from "../../actions/user";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { ProjectCard } from "../Project/Project";
import { SkillsCard } from "../Home/Home";

const AddSkills = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addSkills(title, image));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
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
            placeholder="Title"
            className="adminPanelsInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            placeholder="Choose File"
            className="admilPanelFileUpload"
            onChange={handleImage}
            accept="image/*"
          />

          <Link to="/account">
            Back <MdKeyboardBackspace />
          </Link>
          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="adminPanelCard">
          {user &&
            user.skills &&
            user.skills.map((item) => (
              <SkillsCard
                id={item._id}
                key={item._id}
                src={item.image.url}
                title={item.title}
                isAdmin={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddSkills;

import React from "react";
import "./Project.css";
import { Typography, Button } from "@mui/material";
import { AiOutlineProject } from "react-icons/ai";
import { Delete } from "@mui/icons-material";
import avtar from "../../Images/avtar.jpg";
import { useDispatch } from "react-redux";
import { deleteProject, getUser } from "../../actions/user";

export const ProjectCard = ({
  id,
  url,
  projectTitle,
  projectImage,
  projectDescription,
  technologies,
  isAdmin = false,
}) => {
  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(getUser());
  };
  return (
    <>
      <a href={url} className="projectCard" target="_blank">
        <div>
          <img src={projectImage} alt="Project" />
          <Typography variant="h5">{projectTitle}</Typography>
        </div>
        <div>
          <Typography variant="h4">About Project</Typography>
          <Typography>{projectDescription}</Typography>
          <Typography variant="h6">Tech Stack: {technologies}</Typography>
        </div>
      </a>
      {isAdmin && (
        <Button
          style={{ color: "rgba(40,40,40, 0.7)" }}
          onClick={() => deleteHandler(id)}
        >
          <Delete />
        </Button>
      )}
    </>
  );
};

const Project = ({ projects }) => {
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <AiOutlineProject />
      </Typography>
      <div className="projectWrapper">
        {projects.map((project, index) => (
          <ProjectCard
            url={project.url}
            projectTitle={project.title}
            projectImage={project.image.url}
            projectDescription={project.description}
            technologies={project.techStack}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;

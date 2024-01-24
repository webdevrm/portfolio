import React from "react";
import "./Home.css";
import { useEffect } from "react";
import * as THREE from "three";
import moonImage from "../../Images/moon.jpg";
import venusImage from "../../Images/venus.jpg";
import spaceImage from "../../Images/space.jpg";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Button,
} from "@mui/material";
import CustomTimeLine from "../CustomTimeLine/CustomTimeLine";
import { deleteSkills, getUser } from "../../actions/user";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MouseOutlined } from "@mui/icons-material";

export const SkillsCard = ({ src, title, id, isAdmin = false }) => {
  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    await dispatch(deleteSkills(id));
    dispatch(getUser());
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 5,
        padding: 3,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="iconbox rounded-4">
          <i className="webIcon">
            <img src={src} alt={title} />
          </i>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {isAdmin && (
          <Button
            style={{
              margin: "auto",
              display: "block",
              color: "rgba(40,40,40,0.7)",
            }}
            onClick={() => deleteHandler(id)}
          >
            <FaTrash />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Home = ({ timelines, skills }) => {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load(moonImage);
    const venusTexture = textureLoader.load(venusImage);
    const spaceTexture = textureLoader.load(spaceImage);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 3, 10);
    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const moonGeometry = new THREE.SphereGeometry(3, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    const venusGeometry = new THREE.SphereGeometry(4, 64, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.position.set(8, 5, 5);

    const pointLight = new THREE.PointLight("white", 60, 100);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1);

    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    scene.add(venus);
    scene.add(moon);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceTexture;

    const constSpeed = 0.01;
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }

      if (e.clientX >= window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }

      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }
      if (e.clientY >= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.001;
      venus.rotation.y += 0.001;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    animate();

    return window.addEventListener("scroll", () => {
      camera.rotation.y = window.scrollY * 0.002;
      camera.rotation.x = window.scrollY * 0.001;
    });
  }, []);
  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas>
      <div className="homeCanvaContainer">
        <Typography variant="h1">
          <p>R</p>
          <p>O</p>
          <p>H</p>
          <p>I</p>
          <p>T</p>
        </Typography>
        <div className="homeCanvaBox">
          <Typography variant="h2">DEVELOPER</Typography>
          <Typography variant="h2">DESIGNER</Typography>
        </div>
        <Link to="/projects">View Work</Link>
      </div>
      <div className="homeScrollBtn">
        <MouseOutlined />
      </div>
      <div className="homeContainer">
        <Typography variant="h3">TIMELINE</Typography>
        <CustomTimeLine timeLine={timelines} />
      </div>
      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>
        <Grid container spcaing={2}>
          {skills &&
            skills.map((item, i) => (
              <Grid
                item
                md={2}
                sx={{ mx: 2, my: 3 }}
                data-aos={i % 2 === 0 ? "fade-up" : "fade-down"}
              >
                <SkillsCard
                  id={item._id}
                  key={item._id}
                  src={item.image.url}
                  title={item.title}
                  isAdmin={false}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;

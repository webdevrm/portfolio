import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "./actions/user";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Timeline from "./components/AdminPanel/Timeline";
import EditProject from "./components/AdminPanel/Project";
import AddSkills from "./components/AdminPanel/AddSkills";
AOS.init();

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home timelines={user.timeline} skills={user.skills} />}
            />
            <Route path="/about" element={<About about={user.about} />} />
            <Route
              path="/projects"
              element={<Project projects={user.projects} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/account"
              element={isAuthenticated ? <AdminPanel /> : <Login />}
            />
            <Route
              path="/admin/timeline"
              element={isAuthenticated ? <Timeline /> : <Login />}
            />
            <Route
              path="/admin/project"
              element={isAuthenticated ? <EditProject /> : <Login />}
            />
            <Route
              path="/admin/skills"
              element={isAuthenticated ? <AddSkills /> : <Login />}
            />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;

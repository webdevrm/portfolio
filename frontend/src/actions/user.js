import axios from "axios";

const instance = axios.create({
  baseURL: "https://rohitmehra-portfolio-live.onrender.com",
});

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST",
    });

    const { data } = await instance.get(`/api/v1/user`);

    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const { data } = await instance.post(
      `/api/v1/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data?.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });

    const { data } = await instance.get(`/api/v1/logout`);
    localStorage.clear();
    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });

    const { data } = await instance.get(`/api/v1/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};
export const updateUser =
  (name, email, password, about) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });

      const { data } = await instance.put(
        `/api/v1/admin/update`,
        {
          name,
          email,
          password,
          about,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: error.response.data.message,
      });
    }
  };
export const addTimeline = (title, description, date) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "ADD_TIMELINE_REQUEST",
    });

    const { data } = await instance.post(
      `/api/v1/admin/timeline/add`,
      {
        title,
        description,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "ADD_TIMELINE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TIMELINE_FAILURE",
      payload: error.response.data.message,
    });
  }
};
export const deleteTimeline = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "DELETE_TIMELINE_REQUEST",
    });

    const { data } = await instance.delete(`/api/v1/admin/timeline/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "DELETE_TIMELINE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_TIMELINE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const addProject =
  (title, description, url, image, techStack) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      dispatch({
        type: "ADD_PROJECT_REQUEST",
      });

      const { data } = await instance.post(
        `/api/v1/admin/project/add`,
        {
          title,
          description,
          url,
          image,
          techStack,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "ADD_PROJECT_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ADD_PROJECT_FAILURE",
        payload: error.response.data.message,
      });
    }
  };
export const contactUs = (name, email, message) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "CONTACT_REQUEST",
    });

    const { data } = await instance.post(
      `/api/v1/contact`,
      {
        name,
        email,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "CONTACT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CONTACT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "DELETE_PROJECT_REQUEST",
    });

    const { data } = await instance.delete(`/api/v1/admin/project/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "DELETE_PROJECT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PROJECT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const addSkills = (title, image) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "ADD_SKILLS_REQUEST",
    });

    const { data } = await instance.post(
      `/api/v1/admin/skills/add`,
      {
        title,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: "ADD_SKILLS_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_SKILLS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deleteSkills = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({
      type: "DELETE_SKILLS_REQUEST",
    });

    const { data } = await instance.delete(`/api/v1/admin/skills/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "DELETE_SKILLS_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_SKILLS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

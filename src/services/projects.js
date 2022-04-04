import axiosInstance from "../helpers/axiosInstance";

export const postProject = async ({ name, description, id,logo }) => {
  try {
    const response = await axiosInstance.post("/projects", {
      data: {
        project_manager: id,
        name,
        description,
        logo
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

//post project

//getAll projects
//reactquery

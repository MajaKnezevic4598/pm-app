import axiosInstance from "../helpers/axiosInstance";

export const postProject = async ({ name, description, id }) => {
  try {
    const response = await axiosInstance.post("/projects", {
      data: {
        projectManager: id,
        name,
        description,
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

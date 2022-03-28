import axiosInstance from "../helpers/axiosInstance";

function compare(a, b) {
  if (a.attributes.createdAt > b.attributes.createdAt) {
    return -1;
  }
  if (a.attributes.createdAt < b.attributes.createdAt) {
    return 1;
  }
  return 0;
}

const employee = {
  employeeData: async function (id) {
    try {
      const response = await axiosInstance.get(
        `/profiles/${id}?populate=projectsEmployed.project_manager.profilePhoto&populate=projectsEmployed.logo&populate=projectsEmployed.employees`
      );
      console.log(response.data.data.attributes.projectsEmployed.data);
      return response.data.data.attributes.projectsEmployed.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default employee;

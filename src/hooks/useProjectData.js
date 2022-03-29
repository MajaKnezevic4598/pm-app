import { useQuery, useMutation } from "react-query";
import axiosInstance from "../helpers/axiosInstance";

const addProject = ({ id, name, description, logo }) => {
  return axiosInstance.post("/projects", {
    data: {
      project_manager: id,
      name,
      description,
      logo,
    },
  });
};

export const useAddSingleProject = () => {
  return useMutation(addProject);
};

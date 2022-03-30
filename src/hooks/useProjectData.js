import { useQuery, useMutation } from "react-query";
import axiosInstance from "../helpers/axiosInstance";

const fetchProjectsForSinglePM = ({ queryKey }) => {
  const profileId = queryKey[1];
  return axiosInstance.get(
    `/profiles/${profileId}?populate=projectsManaging.logo&populate=projectsManaging.employees.profilePhoto&populate=profilePhoto`
  );
};

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

export const useAllProjectsForPM = (profileId) => {
  return useQuery(
    ["all-projects-for-single-PM", profileId],
    fetchProjectsForSinglePM
  );
};

export const useAddSingleProject = () => {
  return useMutation(addProject);
};

import { useQuery, useMutation } from "react-query";
import axiosInstance from "../helpers/axiosInstance";

const fetchProjectsForSinglePM = ({ queryKey }) => {
  const profileId = queryKey[1];
  const nameFilter = queryKey[2];
  //   return axiosInstance.get(
  //     `/profiles/${profileId}?populate=projectsManaging.logo&populate=projectsManaging.employees.profilePhoto&populate=profilePhoto&filters[name][$containsi]=${nameFilter}`
  //   );

  return axiosInstance.get(
    `/projects?filters[project_manager][id][$eq]=${profileId}&filters[name][$containsi]=${nameFilter}&populate=logo&populate=employees.profilePhoto&populate=project_manager.profilePhoto`
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

export const useAllProjectsForPM = (profileId, nameFilter) => {
  return useQuery(
    ["all-projects-for-single-PM", profileId, nameFilter],
    fetchProjectsForSinglePM,
    {
      keepPreviousData: true,
    }
  );
};

export const useAddSingleProject = () => {
  return useMutation(addProject);
};

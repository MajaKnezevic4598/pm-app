import { useQuery, useMutation } from 'react-query';
import axiosInstance from '../helpers/axiosInstance';

const fetchProjectsForSinglePM = async (profileId, nameFilter) => {
  const res = await axiosInstance.get(
    `/projects?filters[project_manager][id][$eq]=${profileId}&filters[name][$containsi]=${nameFilter}&populate=logo&populate=employees.profilePhoto&populate=project_manager.profilePhoto`
  );

  return res;
};

const addProject = ({ id, name, description, logo, employees }) => {
  return axiosInstance.post('/projects', {
    data: {
      project_manager: id,
      name,
      description,
      logo,
      employees,
    },
  });
};

export const useAllProjectsForPM = (profileId, nameFilter) => {
  return useQuery(
    ['all-projects-for-single-PM', profileId],
    () => {
      return fetchProjectsForSinglePM(profileId, nameFilter);
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useAddSingleProject = (onSuccess) => {
  return useMutation(addProject, {
    onSuccess,
  });
};

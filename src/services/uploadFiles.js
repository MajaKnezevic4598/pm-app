import axiosInstance from "../helpers/axiosInstance";

export const uploadImageProfile = async (id, files) => {
  const formData = new FormData();

  formData.append("files", files);

  axiosInstance
    .post("/upload", formData)
    .then((response) => {
      console.log(response);
      axiosInstance.put("/profiles/" + id, {
        data: {
          profilePhoto: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const uploadImageLogo = async (id, files) => {
  const formData = new FormData();

  formData.append("files", files);

  axiosInstance
    .post("/upload", formData)
    .then((response) => {
      console.log(response);
      axiosInstance.put("/projects/" + id, {
        data: {
          logo: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

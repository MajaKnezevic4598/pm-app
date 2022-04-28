import axiosInstance from '../helpers/axiosInstance';

export const uploadImageProfile = async (id, files) => {
  const formData = new FormData();

  formData.append('files', files);

  axiosInstance
    .post('/upload', formData)
    .then((response) => {
      axiosInstance.put('/profiles/' + id, {
        data: {
          profilePhoto: response.data,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

//upload file
export const uploadFiles = async (imgData) => {
  const formData = new FormData();
  formData.append('files', imgData);
  try {
    const response = await axiosInstance.post('upload', formData);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

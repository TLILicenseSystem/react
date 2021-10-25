import api from "./api2";

export const getToken = async () => {
  return await api
    .post("token/searchToken", {
      url: process.env.REACT_APP_TOKEN_URL,
      key: process.env.REACT_APP_CONSUMER_KEY,
      secret: process.env.REACT_APP_CONSUMER_SECRET,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};

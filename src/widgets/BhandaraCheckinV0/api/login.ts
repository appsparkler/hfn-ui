import {
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  USER_NAME,
  USER_PASSWORD,
} from "./env-variables";

export const login = () => {
  const formdata = new FormData();
  formdata.append("client_id", CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("grant_type", GRANT_TYPE);
  if (GRANT_TYPE === "password") {
    formdata.append("username", USER_NAME);
    formdata.append("password", USER_PASSWORD);
  }

  var requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${API_URL}/o/token/`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem("srcmToken", result);
    })
    .catch((error) => console.log("error", error));
};

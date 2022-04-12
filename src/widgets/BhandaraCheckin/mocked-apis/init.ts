export const init = () => {
  const accessTokenObj = localStorage.getItem("srcmToken");
  const tokenObj = {
    access_token: "MTq9doPD3xRZEJnZZbflzh2ZCsKq67",
  };
  localStorage.setItem("srcmToken", JSON.stringify(tokenObj));
};

export const getAccessToken = () => {
  const json = localStorage.getItem("srcmToken");
  if (json) {
    const obj = JSON.parse(json);
    return obj.access_token;
  }
  return "MTq9doPD3xRZEJnZZbflzh2ZCsKq67";
};

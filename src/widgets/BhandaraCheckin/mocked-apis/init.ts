import { setupToken } from "./token";

export const init = () => {
  const accessTokenObj = localStorage.getItem("srcmToken");
  if (!accessTokenObj) {
    const tokenObj = {
      access_token: "MTq9doPD3xRZEJnZZbflzh2ZCsKq67",
    };
    localStorage.setItem("srcmToken", JSON.stringify(tokenObj));
  }
};

export const getAccessToken = () => {
  const json = localStorage.getItem("srcmToken");
  if (json) {
    const obj = JSON.parse(json);
    return obj.access_token;
  }
  return "MTq9doPD3xRZEJnZZbflzh2ZCsKq67";
};

export const fetchWithToken = async <T = any>(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<T> => {
  const res = await fetch(input, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const obj = await res.json();
  if (obj.detail === "Authentication credentials were not provided.") {
    await setupToken();
    return fetchWithToken(input, init);
  } else return obj;
};

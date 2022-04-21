import { login } from "./server-apis/login";

export const setAccessTokenOnLocalStorage = () => {
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
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
  });

  const obj = await res.json();
  if (obj.detail === "Authentication credentials were not provided.") {
    await login();
    return fetchWithToken(input, init);
  } else return obj;
};

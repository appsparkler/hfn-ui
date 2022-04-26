import { API_URL, API_VERSION } from "./env-variables";
import { fetchWithToken } from "./utils";

export const maskedPnrs = () => {
  var requestOptions = {
    method: "GET",
  };

  return fetchWithToken(
    `${API_URL}/api/${API_VERSION}/masked-pnrs/`,
    requestOptions
  );
};

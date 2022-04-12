import React from "react";
import { fetchUserDetails } from "./widgets/BhandaraCheckin/mocked-apis/fetchUserDetails";
import { fetchToken } from "./widgets/BhandaraCheckin/mocked-apis/token";
import { UserSRCM } from "./widgets/BhandaraCheckin/types";

export default {
  title: "API Story",
};

const getUserDetails = async ({
  abhyasiId,
  bearerToken,
}: {
  abhyasiId: string;
  bearerToken?: string;
}): Promise<UserSRCM | undefined> => {
  try {
    const res = await fetchUserDetails({ abhyasiId });
    const obj = await res.json();
    if (obj.detail === "Authentication credentials were not provided.") {
      await fetchToken();
      const tokenJSON =
        localStorage.getItem("srcmToken") || '{"accessToken": ""}';
      const { access_token } = JSON.parse(tokenJSON);
      return getUserDetails({ abhyasiId, bearerToken: access_token });
    } else {
      console.log(obj.results[0]);
      return obj.results[0];
    }
  } catch (e) {
    console.error(e);
  }
};

getUserDetails({ abhyasiId: "INAAAE478" })
  .then((res) => {
    console.log({ res });
  })
  .catch(console.error);

export const chore = () => {
  return <div>Test API</div>;
};

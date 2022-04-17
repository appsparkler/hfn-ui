import { SearchUserParams, UserSRCM } from "../../types";
import { fetchWithToken } from "../init";

export const searchUser = (
  searchParams: SearchUserParams
): Promise<UserSRCM> => {
  const urlSearchParams = new URLSearchParams(searchParams);
  return fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?${urlSearchParams}`
  );
};

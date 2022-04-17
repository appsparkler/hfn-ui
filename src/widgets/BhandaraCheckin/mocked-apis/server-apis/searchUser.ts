import { SearchUserParams, SearchUserResponse } from "../../types";
import { fetchWithToken } from "../init";

export const searchUser = (
  searchParams: SearchUserParams
): Promise<SearchUserResponse> => {
  const urlSearchParams = new URLSearchParams(searchParams as any);
  return fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?${urlSearchParams}`
  );
};

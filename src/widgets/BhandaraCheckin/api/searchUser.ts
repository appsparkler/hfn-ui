import { SearchUserParams, SearchUserResponse } from "../types";
import { fetchWithToken } from "./utils";
import { API_URL } from "./env-variables";

export const searchUser = (
  searchParams: SearchUserParams
): Promise<SearchUserResponse> => {
  const urlSearchParams = new URLSearchParams(searchParams as any);
  return fetchWithToken(`${API_URL}/api/abhyasis/search/?${urlSearchParams}`);
};

import { UserSRCM } from "../../types";
import { fetchWithToken } from "../init";

export type SearchUserParams = Partial<Omit<UserSRCM, "id" | "firebase_uid">>;

export const searchUser = (
  searchParams: SearchUserParams
): Promise<UserSRCM> => {
  const urlSearchParams = new URLSearchParams(searchParams);
  return fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?${urlSearchParams}`
  );
};

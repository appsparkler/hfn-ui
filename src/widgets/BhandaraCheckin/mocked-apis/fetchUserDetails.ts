import { UserSRCM } from "../types";
import { fetchWithToken } from "./init";

export const fetchUserDetails = (abhyasiId: string): Promise<UserSRCM> =>
  fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?ref=${abhyasiId}`
  ).then((res) => res.results[0]);

import { getAccessToken } from "./init";

export const fetchUserDetails = ({ abhyasiId }: { abhyasiId?: string }) =>
  fetch(`https://profile.srcm.net/api/abhyasis/search/?ref=${abhyasiId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

import { SearchUserParams, SearchUserResponse } from "../../types";
import { fetchWithToken } from "../init";

export const searchUser = (
  searchParams: SearchUserParams
): Promise<SearchUserResponse> => {
  const urlSearchParams = new URLSearchParams(searchParams as any);
  return (
    fetchWithToken(
      `https://profile.srcm.net/api/abhyasis/search/?${urlSearchParams}`
    )
      // .then((res) => res.json())
      .then((res: SearchUserResponse) => ({
        ...res,
        results: [
          {
            ...res.results[0],
            // age_group: "40-49",
            age_group: "",
            gender: "male",
            email: "a*****b@malinator.com",
            mobile: "+91*****399393",
            city: {
              id: 12,
              name: "Hello World City",
            },
          },
        ],
      }))
  );
};

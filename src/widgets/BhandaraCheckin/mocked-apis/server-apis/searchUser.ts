import { SearchUserParams, SearchUserResponse } from "../../types";
import { fetchWithToken } from "../init";

export const searchUser = (
  searchParams: SearchUserParams
): Promise<SearchUserResponse> => {
  const urlSearchParams = new URLSearchParams(searchParams as any);
  return fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?${urlSearchParams}`
  );
  // .then((res) => res.json())
  /** THE BELOW SECTION IS NEEDED TO TEST VARIOUS SCENARIOS */
  // .then((res: SearchUserResponse) => ({
  //   ...res,
  //   results: [
  //     {
  //       ...res.results[0],
  //       // age_group: "40-49",
  //       age_group: "",
  //       // gender: "male",
  //       gender: "",
  //       // email: "a*****b@malinator.com",
  //       email: "",
  //       mobile: "+91*****399393",
  //       // mobile: "",
  //       city: {
  //         id: 12,
  //         name: "Hello World City",
  //       },
  //     },
  //   ],
  // }))
};

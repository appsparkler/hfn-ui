import React from "react";
import { fetchUserDetailsV1 } from "./widgets/BhandaraCheckin/mocked-apis/fetchUserDetails";

export default {
  title: "API Story",
};

fetchUserDetailsV1("INAAAE478")
  .then((res) => {
    alert(res.name);
  })
  .catch(console.error);

export const chore = () => {
  return <div>Test API</div>;
};

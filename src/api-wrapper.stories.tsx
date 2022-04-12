import React from "react";
import { fetchUserDetails } from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "API Story",
};

fetchUserDetails("INAAAE478")
  .then((res) => {
    alert(res.name);
  })
  .catch(console.error);

export const chore = () => {
  return <div>Test API</div>;
};

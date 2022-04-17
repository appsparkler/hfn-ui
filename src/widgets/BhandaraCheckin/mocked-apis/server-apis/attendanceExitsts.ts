import { fetchWithToken } from "../init";

export const attendanceExists = () => {
  var requestOptions = {
    method: "GET",
  };

  return fetchWithToken(
    "https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/exists/?part_name=1650178276&email=1650178276@mailinator.com&mobile=911650178276",
    requestOptions
  );
};

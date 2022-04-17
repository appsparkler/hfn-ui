var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer UG7P1gwxzV4KCmMZtC3Ar8IN0jdpJa");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  name: "1650177042",
  ref: "B99999999",
  email: "1650177042@mailinator.com",
  mobile: "911650177042",
  attendance_datetime: "",
  city_id: 195,
  age_group: "24",
  gender: "M",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  //   redirect: "follow",
};

export const postAttendance = () =>
  fetch(
    "https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

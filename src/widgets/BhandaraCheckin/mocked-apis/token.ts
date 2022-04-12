const formdata = new FormData();
formdata.append("client_id", "XxFhQFRe5E0RsmyZ2SvCRqjvcmXJogEW2OPUPeSK");
formdata.append("grant_type", "client_credentials");
formdata.append(
  "client_secret",
  "n7XvchA0MHClZPIlrqicZBDbns9kp0DjdbdmtGUtEwR1NLCCwYDv2uu3flsZA720QbE7woOWsmyXjr6JJIWYAfPXeapA2OXQMgeVfHL7bDXgHZ0QDmpnQy88JtCcdVSI"
);

var requestOptions: RequestInit = {
  method: "POST",
  body: formdata,
};

export const fetchToken = () =>
  fetch("https://profile.srcm.net/o/token/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem("srcmToken", result);
    })
    .catch((error) => console.log("error", error));

export const login = () => {
  const formdata = new FormData();
  formdata.append("grant_type", "password");
  formdata.append("client_id", "u4g9FxYdcjAZVAGfEQw1TWxVnskG1o8y6axOfVVH");
  formdata.append(
    "client_secret",
    "nd25rjcZfLQxr3cTYk4OSKL2e8D9YrZwqE8viE8dlQrDwIs1orK6NZjOrnK8Vs3oT4Iv2ZBtCTO2OnohT2qvBj3PFiQjzNr94uFvsUOFQYjSwdINQLLas0liP7l0K1BK"
  );
  formdata.append("username", "test_abhyasi1@mailinator.com");
  formdata.append("password", "password");

  var requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
  };

  return fetch("https://profile.srcm.net/o/token/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem("srcmToken", result);
    })
    .catch((error) => console.log("error", error));
};

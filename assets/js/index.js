const getStartedBtn = document.querySelector("#getStartedBtn");
const clientID = "805b4589fb474d7f8007a468b5879903";
const clientSecret = "eadbd8eabea14e02a4c463fba46c6fc0";

const getToken = () => {
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  })
    .then((response) => response.json())
    .then((data) => storeToken(data.access_token))
    .catch((err) => console.log(err));
};

getStartedBtn.addEventListener("click", getToken);

function storeToken(token) {
  const storedToken = token;
  console.log(storedToken);
}

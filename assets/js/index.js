const getStartedBtn = document.querySelector("#getStartedBtn");
const clientID = "805b4589fb474d7f8007a468b5879903";
const clientSecret = "eadbd8eabea14e02a4c463fba46c6fc0";
const render = document.getElementById("render");
let storedToken;
let searchBtn;
const apiKey = "EsUEPgZZeR0POnwasZa8al2WpaC3QR90NUVgfiYUKKw";

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

function storeToken(token) {
  storedToken = localStorage.setItem("storedToken", token);
}

getStartedBtn.addEventListener("click", showForm);

function showForm() {
  render.classList.add("hideAnim");
  render.addEventListener("transitionend", function (event) {
    if (event.propertyName !== "opacity") return;
    render.classList.remove("hideAnim");
    // render.classList.add("hidden");

    render.innerHTML = "";
    render.innerHTML = `<div class="col">
    <div class="text-white fs-1">Paste Your Brief</div>
    <div class="input-group">
      <textarea class="form-control" id="text"></textarea>
    </div> 
    <button type="button" id="searchBtn" class="btn btn-dark m-3">
      Search
    </button>
  </div>`;

    render.classList.add("showAnim");

    searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", findKeywords);
  });
}

function findKeywords() {
  const text = document.getElementById("text").value;
  console.log(text);
  fetch(
    "https://apis.paralleldots.com/v4/keywords?text=" +
      text +
      "&api_key=" +
      apiKey,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

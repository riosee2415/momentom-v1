const weather = document.querySelector(".js-weather");

const API_KEY = "7eb0833cca459a1dccd38e098f464ac5";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't Access Geo Location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handelGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedcoords = localStorage.getItem(COORDS);
  if (loadedcoords === null) {
    askForCoords();
  } else {
    //get Weather
    const parseCoords = JSON.parse(loadedcoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();

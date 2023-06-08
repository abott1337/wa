function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

let currentInfo = document.querySelector("#dayAndTime");
let currentTime = new Date();
currentInfo.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class = "forecastDay">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42"/>
            <br />
            <div class ="forecastTemperatures"> 
            <span id="forecast-max">${Math.round(
              forecastDay.temp.max
            )}°</span> /
            <span id="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#number").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);

  //let maxTemperature = document.querySelector("#forecast-max");
  //maxTemperature.innerHTML = Math.round(response.data.main.temp_max);
  //let minTemperature = document.querySelector("#forecast-min");
  //minTemperature.innerHTML = Math.round(response.data.main.temp_min);

  console.log(response.data);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let form = document.querySelector("#searchBar");
form.addEventListener("submit", handleSubmit);

search("Tokyo");

function searchLocation(position) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#cLButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

function changeF(event) {
  event.preventDefault();
  let number = document.querySelector("#number");
  number.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

function changeC(event) {
  event.preventDefault();
  let number = document.querySelector("#number");
  let temperature = number.innerHTML;
  number.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", changeF);

let celcius = document.querySelector("#c");
celcius.addEventListener("click", changeC);

////////////////////

//let lat = "37.270702";
//let lon = "-76.707458";
//let part = "current";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=metric`;

//function showTemperature(response) {}

//axios.get(apiUrl).then(showTemperature);

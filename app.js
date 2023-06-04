let apiKey = "0c5f59b841b794d99933757d256233b1";
//show weather details
function showWeatherDetails(response) {
  let currentTime = new Date();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = weekdays[currentTime.getDay()];

  let temperatureElement = document.getElementById("number");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let visibilityElement = document.getElementById("visibility");
  let descriptionElement = document.getElementById("description");
  let currentDayElement = document.getElementById("current-day");
  let iconElement = document.getElementById("icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  visibilityElement.innerHTML = response.data.visibility;
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentDayElement.innerHTML = `${currentDay}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
}

//show city name
function showCityName(response) {
  let cityName = response.data.name;
  let cityNameElement = document.getElementById("city");
  cityNameElement.innerHTML = cityName;
}

// show current location

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(geoUrl).then((response) => {
    showCityName(response);
    showWeatherDetails(response);
  });
}

// get position
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// search a city

function showCityInput(event) {
  event.preventDefault();
  let input = document.getElementById("cityInput");
  let inputValue = input.value;
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = `${inputValue}`;

  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=0c5f59b841b794d99933757d256233b1&units=metric`;
  axios.get(cityUrl).then(showWeatherDetails);
}

// show Fahrenheit
let celsiusTemperature = null;
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.getElementById("number");
  fahrenheitElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

// show celsius
function showCelsius(event) {
  event.preventDefault();
  let celsiusElement = document.getElementById("number");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}
//repetitive weather rolls
function showForcastUnit() {
  let forcastunitElement = document.getElementById("weather-roll");
  let forcastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      ` 
            <div class="col-2">
              <p>${day}</p>
              <img
                src="https://openweathermap.org/img/wn/10d@2x.png"
                alt="forcast-icon"
                width="80px"
              />
              <span class="max-temp">18°</span>
              <span class="min-temp">12°</span>
            </div>

     `;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastunitElement.innerHTML = forcastHTML;
}
showForcastUnit();

// eventlistener
let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", showCityInput);

let currentButtonElement = document.getElementById("current-button");
currentButtonElement.addEventListener("click", getCurrentPosition);
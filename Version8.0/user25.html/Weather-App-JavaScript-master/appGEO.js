const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const feelsLikeElement = document.querySelector(".feels-like");
const messageElement = document.querySelector(".message");
const timeElement = document.querySelector(".time");

const weather = {
    temperature: { unit: "celsius" }
};

const KELVIN = 273;
const key = "38b8911f7707fa14ba9a1ac9869bba11";

// GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.innerHTML = "Geolocation not supported";
}

function setPosition(position){
    getWeather(position.coords.latitude, position.coords.longitude);
}

function showError(error){
    notificationElement.innerHTML = error.message;
}

// WEATHER
function getWeather(lat, lon){

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

    fetch(api)
        .then(res => res.json())
        .then(data => {

            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.feelsLike = data.main.feels_like;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(displayWeather);
}

// DISPLAY
function displayWeather(){

    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

    feelsLikeElement.innerHTML =
        `Feels like: ${Math.floor(weather.feelsLike - KELVIN)}°C`;

    weatherMessage();
    changeBackground();
    startClock();
}

// BACKGROUND
function changeBackground(){
    document.body.style.background =
        weather.iconId.includes("d")
        ? "linear-gradient(to top, #87CEEB, #fff)"
        : "linear-gradient(to top, #2c3e50, #000)";
}

// MESSAGE
function weatherMessage(){
    let t = weather.temperature.value;

    if(t < 0) messageElement.innerHTML = "Freezing 🥶";
    else if(t < 15) messageElement.innerHTML = "Cold 🧥";
    else if(t < 25) messageElement.innerHTML = "Nice 🙂";
    else messageElement.innerHTML = "Hot 🔥";
}

// CLOCK
function startClock(){
    setInterval(() => {
        timeElement.innerHTML = new Date().toLocaleString();
    }, 1000);
}

// CITY SEARCH
function searchCity(){

    let city = document.getElementById("cityInput").value;

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    fetch(api)
        .then(res => res.json())
        .then(data => {

            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.feelsLike = data.main.feels_like;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

            displayWeather();
        });
}

// TOGGLE C/F
tempElement.addEventListener("click", function(){

    if(weather.temperature.unit == "celsius"){

        let f = Math.floor((weather.temperature.value * 9/5) + 32);
        tempElement.innerHTML = `${f}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    } else {

        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});
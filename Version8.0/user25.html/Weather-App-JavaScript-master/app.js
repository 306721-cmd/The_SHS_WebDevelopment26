// || API KEY ||
const key = "38b8911f7707fa14ba9a1ac9869bba11";

// Hardcoded location (Shakopee)
var latitude = "44.7974";
var longitude = "-93.5273";

// ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {
    temperature: { unit: "celsius" }
};

const KELVIN = 273;

// GET WEATHER
function getWeather(){

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(res => res.json())
        .then(data => {

            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
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
}

// CONVERT
function celsiusToFahrenheit(t){
    return (t * 9/5) + 32;
}

// TOGGLE TEMP
tempElement.addEventListener("click", function(){

    if(weather.temperature.unit == "celsius"){

        let f = Math.floor(celsiusToFahrenheit(weather.temperature.value));
        tempElement.innerHTML = `${f}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    } else {

        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});

getWeather();
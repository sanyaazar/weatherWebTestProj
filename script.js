"use strict";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "8927332d385daab3512e1f324b3c5aff";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      if (json.cod == "404") {
        container.style.height = "600px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error.classList.add("active");
        return;
      }

      container.style.height = "570px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          container.style.height = "650px";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Mist":
          image.src = "images/mist.png";
          break;
        case "Haze":
          image.src = "images/haze.png";
          break;
        default:
          image.src = "images/cloud.png";

          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
      description.innerHTML = `${
        json.weather[0].description.charAt(0).toUpperCase() +
        json.weather[0].description.slice(1)
      }`;
      humidity.innerHTML = `${parseInt(json.main.humidity)}<span>%</span>`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
    });
});

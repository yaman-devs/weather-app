const cityInput = document.getElementById("city");
const searchCityButton = document.getElementById("cityButton");
const APIkey = "40a53494388b89300bd5f9586fce2dd6";
const gifAPIKey = "skIdTWViopqgONdZz3EzAjFgGN4BGPf3";

async function getCityName() {
  try {
    if (cityInput.value === "") {
      alert("Please enter city name.");
      return;
    }
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&appid=${APIkey}`
    );
    let data = await response.json();
    let lat = data[0].lat;
    let lon = data[0].lon;
    let weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
    );
    let wData = await weather.json();
    return wData;
  } catch (err) {
    console.log(err);
  }
}
async function getGif(weather) {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/stickers/translate?api_key=${gifAPIKey}&s=${weather}`
    );
    let data = await response.json();
    return data.data.images.original.url;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function DOM() {
  const tempDom = document.getElementById("weather-temp");
  const tempContainerDom = document.getElementById("temp-container");
  const weatherSpanDom = document.getElementById("weather-span");
  const weatherGif = document.getElementById("weather-gif");

  tempContainerDom.style.display = "block";

  let data = await getCityName();
  let gif = await getGif(data.weather[0].main);
  weatherGif.src = gif;

  tempDom.innerText = data.main.temp;
  weatherSpanDom.innerText = data.weather[0].main;
  console.log(data);
}
searchCityButton.addEventListener("click", DOM);

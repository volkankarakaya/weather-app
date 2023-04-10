async function getWeatherInfo(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=d2664f26e86a41f8a9282501230604&q=${location}&aqi=no`
  );

  const info = await response.json();

  return info;
}

async function getForecastData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d2664f26e86a41f8a9282501230604&q=${location}&days=5&aqi=no&alerts=no`
  );
  // const response =await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=50a625311167038a3cdd423710a81421`);

  const info = await response.json();
  return info;
}

getWeatherInfo("Eskisehir").then((value) => {
  console.log(value);
  renderWeatherInformation(value);
  changeTemp(value)
});

getForecastData("Eskisehir").then((value) => {
  console.log(value);
});

function renderWeatherInformation(data) {
  const condition = document.querySelector(".weather-info__condition");
  const city = document.querySelector(".weather-info__city");
  const date = document.querySelector(".weather-info__date");
  const time = document.querySelector(".weather-info__time");
  const temperature = document.querySelector(".weather-info__temperature");

  condition.innerText = data.current.condition.text;
  city.innerText = data.location.name;
  date.innerText = formatDate(data.location.localtime);
  time.innerText = formatTime(data.location.localtime);
  temperature.innerText = data.current.temp_c + " °C";
}

function formatDate(dateTime) {
  const currentDate = new Date(dateTime);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return currentDate.toLocaleDateString("en-US", options);
}

function formatTime(dateTime) {
  const currentDate = new Date(dateTime);
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return time;
}

function changeTemperatureToC(data) {
  const temperature = document.querySelector(".weather-info__temperature");
  temperature.innerText = data.current.temp_c + " °C";
}
function changeTemperatureToF(data) {
  const temperature = document.querySelector(".weather-info__temperature");
  temperature.innerText = data.current.temp_f + " °F";
  
}

function changeTemp(data) {
  const fButton = document.querySelector(".weather-info__units-f");
  const cButton = document.querySelector(".weather-info__units-c");

  fButton.addEventListener('click', ()=>{
    changeTemperatureToF(data)
    fButton.style.display = 'none'
    cButton.style.display = 'block'
  })
  cButton.addEventListener('click', ()=>{
    changeTemperatureToC(data);
    fButton.style.display = 'block'
    cButton.style.display = 'none'

  })
}

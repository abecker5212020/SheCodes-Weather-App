	
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
      `Sunday`,
      `Monday`,
      `Tuesday`,
      `Wednesday`,
      `Thursday`,
      `Friday`,
      `Saturday`,
    ];
    let day = days[date.getDay()];
    return `Last updated: ${day} ${formatHours(timestamp)}`;
  }
  

  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let AMPM = `AM`;
    if (hour > 12) {
      AMPM = `pm`;
      hour = hour - 12;
    } else {
      AMPM = `am`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${hour}:${minute}${AMPM}`;
  }

function formatDay(timestamp) {
  let date=new Date(timestamp*1000);
  let day =date.getDay();
  let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];


}


function displayForecast(response) {
  let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    

    forecast.forEach(function(forecastDay, index) { 
      if (index < 6) {
    forecastHTML =forecastHTML + `
 
    <div class="col-2">
       <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}
       </div>
        <img src=img/${forecastDay.weather[0].icon}.svg alt="" width="44" />
      <div class="weather-forecast-temperature">
     <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)} °</span>
     <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)} °</span>
   </div>
 </div> `;
      }
});

 forecastHTML = forecastHTML + `</div>`;
 forecastElement.innerHTML=forecastHTML;
    }


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2bc2f64093a701d2be588698038a4fb8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTempertaure(response) {
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidtiy");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let precipitationElement =document.querySelector("#precipitation");

    fahrenheitTemperature=response.data.main.temp;

    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    iconElement.setAttribute(`src`, `img/${response.data.weather[0].icon}.svg`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    precipitationElement.innerHTML=Math.round(response.data.main.precipitation);

    getForecast(response.data.coord);
}


function search(city) {
    let apiKey = "2bc2f64093a701d2be588698038a4fb8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTempertaure);    
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);

}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature=(celsiusTemperature * 9/5) + 32 ;
    //remove the active class from celsius link
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let fahrenheitTemperature=null;

// temperature conversion

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

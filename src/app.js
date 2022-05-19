function displayTempertaure(response) {
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidtiy");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.main.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey= "2bc2f64093a701d2be588698038a4fb8";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTempertaure);
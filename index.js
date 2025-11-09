let search = document.querySelector(".search");
let btn = document.querySelector(".btn");
let wind = document.querySelector(".wind");
let speed = document.querySelector(".speed");
let humidity = document.querySelector(".humidity");
let city_name = document.querySelector(".city-name");
let weather = document.querySelector(".weather");
let weather_des = document.querySelector(".weather-des");
let base_url = `https://api.openweathermap.org/data/2.5/weather?q=`;
let apiKey = `d1845658f92b31c64bd94f06f7188c9c`;
let city = "Toronto"; 

btn.addEventListener("click", () => {
    city = search.value;
    getData(city, apiKey).then((Data) => {
       details(Data);
    }).catch(err => {
        alert("Error: Could not fetch data. Please check the city name.");
    });
}); 

function details(Data){
        wind.textContent = Data.wind;
        humidity.textContent = Data.humidity;
        speed.textContent = Data.speed;
        weather_des.textContent = Data.weather_des;
        city_name.textContent = Data.city_name
}

async function getData(city, apiKey) {
    let ogApi = `${base_url}${city}&appid=${apiKey}&units=metric`;
    try {
        let rData = await fetch(ogApi);
        let Data = await rData.json();
        console.log(Data);
        if (Data.cod !== 200) throw new Error("City not found");

        const iconCode = Data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;

        let temperature = document.querySelector(".temp");
        temperature.textContent = `${Data.main.temp}°`; 

        return {
            wind: `${Data.wind.speed} m/s`,
            humidity: `${Data.main.humidity}%`,
            speed: ` ${Data.wind.speed} m/s`,
            weather_des : `${Data.weather[0].description}`,
            city_name : `${Data.name}`
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching data");
    }
}



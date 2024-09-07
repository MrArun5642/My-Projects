document.getElementById("submitButton").addEventListener("click", function() {
    const location = document.getElementById("locationInput").value;
    if (location) {
        getWeatherData(location);
    } else {
        displayError("Please enter a location.");
    }
});

async function getWeatherData(location) {
    const apiKey = '211158a74590af681a5f6a978c12427e'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        console.log(response,"==========-oiuhg")
        if (!response.ok) {
            throw new Error("Location not found. Please enter a valid location.");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log(data.weather[0],"----------------")
    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>
            <img src="${weatherIcon}" alt="Weather icon" class="weather-icon" id="weatherIcon" />
        </p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Weather Description: ${data.weather[0].description}</p>
    `;

    const weatherMain = data.weather[0].main.toLowerCase();
    const weatherDescription = data.weather[0].description.toLowerCase();
    setWeatherBackground(weatherMain, weatherDescription);

}

function setWeatherBackground(weatherMain, weatherDescription) {
    const body = document.body;
    const video = document.getElementById("backgroundVideo");

    video.style.display = 'none'; 
    body.className = ''; 

    if (weatherMain.includes("rain")) {
        body.classList.add("rainy");
    } else if (weatherMain.includes("clear")) {
        body.classList.add("sunny");
    } else if (weatherMain.includes("cloud")) {
        body.classList.add("overcast");
    } else if (weatherMain.includes("snow")) {
        body.classList.add("snowy");
    } else if (weatherMain.includes("haze")) {
        body.classList.add("haze");
    } else if (weatherMain.includes("mist")) {
        body.classList.add("mist");
    } else {
        body.classList.add("default");
    }
}


function displayError(message) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
}
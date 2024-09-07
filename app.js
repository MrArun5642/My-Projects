document.getElementById("submitButton").addEventListener("click", function() {
    const location = document.getElementById("locationInput").value;
    if (location) {
        getWeatherData(location);
    } else {
        displayError("Please enter a location.");
    }
});

async function getWeatherData(location) {
    const apiKey = '211158a74590af681a5f6a978c12427e'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        console.log(response)
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

    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p><img src="${weatherIcon}" alt="Weather icon" class="weather-icon" /></p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function displayError(message) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
}
s

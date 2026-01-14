const API_KEY = 'YOUR_API_KEY_HERE'; // Get free API key from openweathermap.org
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherData = document.getElementById('weatherData');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

async function getWeather(city) {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
        hideWeather();
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed.toFixed(1);
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = 
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    weatherData.classList.remove('hidden');
}

function showLoading() {
    searchBtn.textContent = 'Loading...';
    searchBtn.disabled = true;
}

function hideLoading() {
    searchBtn.textContent = 'Search';
    searchBtn.disabled = false;
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    hideLoading();
}

function hideError() {
    errorDiv.classList.add('hidden');
}

function hideWeather() {
    weatherData.classList.add('hidden');
    hideLoading();
}

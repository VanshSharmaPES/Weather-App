import type { WeatherData } from '../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherData;
}

function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2 className="city-name">{weather.name}</h2>
          <p className="country">{weather.sys.country}</p>
        </div>
        <div className="weather-icon-wrapper">
          <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
        </div>
      </div>

      <div className="temperature-section">
        <div className="main-temp">
          <span className="temp-value">{Math.round(weather.main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-description">{weather.weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.wind.speed.toFixed(1)} m/s</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🔽</div>
          <div className="detail-content">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

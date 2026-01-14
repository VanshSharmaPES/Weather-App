import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import { WeatherData } from './types/weather';
import './App.css';

const API_KEY = '33423a7d3c3a4d5db44182835253008';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">
            <span className="icon">🌤️</span>
            Weather Forecast
          </h1>
          <p className="subtitle">Get real-time weather updates for any city</p>
        </div>

        <SearchBar onSearch={fetchWeather} loading={loading} />

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {weather && <WeatherCard weather={weather} />}

        {!weather && !error && (
          <div className="placeholder">
            <div className="placeholder-icon">🔍</div>
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

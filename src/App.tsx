import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import { WeatherData } from './types/weather';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '33423a7d3c3a4d5db44182835253008';
const API_URL = 'http://api.weatherapi.com/v1/current.json';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}`;
      console.log('Fetching weather for:', city);
      console.log('API URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      console.log('Response Status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your WeatherAPI key.');
        }
        throw new Error(data.error?.message || 'City not found');
      }

      // Transform WeatherAPI response to match our WeatherData interface
      const transformedData: WeatherData = {
        name: data.location.name,
        sys: {
          country: data.location.country
        },
        main: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          description: data.current.condition.text,
          icon: getWeatherIcon(data.current.condition.code, data.current.is_day)
        }],
        wind: {
          speed: data.current.wind_kph / 3.6 // Convert kph to m/s
        }
      };

      setWeather(transformedData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Map WeatherAPI condition codes to OpenWeatherMap-style icon codes
  const getWeatherIcon = (code: number, isDay: number): string => {
    const iconMap: { [key: number]: string } = {
      1000: isDay ? '01d' : '01n', // Clear
      1003: isDay ? '02d' : '02n', // Partly cloudy
      1006: isDay ? '03d' : '03n', // Cloudy
      1009: isDay ? '04d' : '04n', // Overcast
      1030: '50d', // Mist
      1063: '10d', // Patchy rain possible
      1066: '13d', // Patchy snow possible
      1069: '13d', // Patchy sleet possible
      1072: '13d', // Patchy freezing drizzle
      1087: '11d', // Thundery outbreaks
      1114: '13d', // Blowing snow
      1117: '13d', // Blizzard
      1135: '50d', // Fog
      1147: '50d', // Freezing fog
      1150: '09d', // Patchy light drizzle
      1153: '09d', // Light drizzle
      1168: '09d', // Freezing drizzle
      1171: '09d', // Heavy freezing drizzle
      1180: '10d', // Patchy light rain
      1183: '10d', // Light rain
      1186: '10d', // Moderate rain at times
      1189: '10d', // Moderate rain
      1192: '10d', // Heavy rain at times
      1195: '10d', // Heavy rain
      1198: '10d', // Light freezing rain
      1201: '10d', // Moderate or heavy freezing rain
      1204: '13d', // Light sleet
      1207: '13d', // Moderate or heavy sleet
      1210: '13d', // Patchy light snow
      1213: '13d', // Light snow
      1216: '13d', // Patchy moderate snow
      1219: '13d', // Moderate snow
      1222: '13d', // Patchy heavy snow
      1225: '13d', // Heavy snow
      1237: '13d', // Ice pellets
      1240: '09d', // Light rain shower
      1243: '09d', // Moderate or heavy rain shower
      1246: '09d', // Torrential rain shower
      1249: '13d', // Light sleet showers
      1252: '13d', // Moderate or heavy sleet showers
      1255: '13d', // Light snow showers
      1258: '13d', // Moderate or heavy snow showers
      1261: '13d', // Light showers of ice pellets
      1264: '13d', // Moderate or heavy showers of ice pellets
      1273: '11d', // Patchy light rain with thunder
      1276: '11d', // Moderate or heavy rain with thunder
      1279: '11d', // Patchy light snow with thunder
      1282: '11d', // Moderate or heavy snow with thunder
    };
    return iconMap[code] || '01d';
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

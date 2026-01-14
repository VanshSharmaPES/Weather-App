import { useState, FormEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={loading || !city.trim()}
      >
        {loading ? (
          <span className="loading-spinner"></span>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}

export default SearchBar;

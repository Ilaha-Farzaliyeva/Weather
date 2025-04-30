
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim() === "") return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${query}`
        );

        if (!res.ok) {
          throw new Error("Data not found");
        }

        const result = await res.json();
        setData(result);
        setError("");
      } catch (err) {
        setData(null);
        setError(err.message);
      }
    };

    fetchData();
  }, [query]);

  const handleClick = () => {
    if (city.trim() === "") {
      setError("Şəhər adı boş ola bilməz");
      return;
    }
    setQuery(city.trim());
  };

  return (
    <div className="app">
      <div className="card">
        <div className="input-group">
          <input
            type="text"
            placeholder="Ölkə və ya şəhər adı yazın"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleClick}>Get Forecast</button>
        </div>

        {error && <p className="error">{error}</p>}

        {data && (
          <div className="result">
            <h2>{data.location.name}, {data.location.country}</h2>
            <img src={data.current.condition.icon} alt="weather icon" />
            <p>{data.current.condition.text}</p>
            <p>{data.current.temp_c}°C</p>
            <p>Wind: {data.current.wind_kph} kph</p>
            <p>Visibility: {data.current.vis_km} km</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


"use client";

import { useState } from "react";
import axios from "axios";

export default function Home(){

  type WeatherData = {
    name: string;
    weather: {description: string}[];
    main:{temp:number};
  }

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;
    try{
      const apiKey = "4a2080376de5fa44bd57329316ebe480";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError(null);
    } catch (err){
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2x1 font-bold mb-4">Weather Finder</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-2 border rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-64 text-center">
          <h2 className="text-xl font-semibold">{weather?.name}</h2>
          <p className="text-gray-700">{weather?.weather[0]?.description}</p>
          <p className="text-2x1 font-bold">{weather?.main?.temp}°C</p>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-red-500 font-semibold">{error}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
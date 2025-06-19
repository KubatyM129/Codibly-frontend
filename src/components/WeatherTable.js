import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherTable = ({ data, darkMode }) => {
    const weatherData = data || [];

    if (!weatherData.length) return <div>Loading...</div>;

    return (
        <table className={`weather-table${darkMode ? ' dark-mode' : ''}`}>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Pogoda</th>
                    <th>Max Temp (°C)</th>
                    <th>Min Temp (°C)</th>
                    <th>Produkcja energi (kWh)</th>
                </tr>
            </thead>
            <tbody>
                {weatherData.map((day) => (
                    <tr key={day.date}>
                        <td>{new Date(day.date).toLocaleDateString('en-GB')}</td>
                        <td>
                            <WeatherIcon weathercode={day.weather_code} />
                        </td>
                        <td>{day.max_temp}</td>
                        <td>{day.min_temp}</td>
                        <td>{day.energy}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WeatherTable;
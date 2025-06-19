import React, { useEffect, useState } from 'react';
import { fetchWeatherSummary } from '../api/weatherApi';

const WeatherFooter = ({ coords }) => {
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                let latitude, longitude;
                if (coords) {
                    latitude = coords.lat;
                    longitude = coords.lng;
                } else {
                    const loc = await getLocation();
                    latitude = loc.latitude;
                    longitude = loc.longitude;
                }
                const data = await fetchWeatherSummary(latitude, longitude);
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getWeatherData();
    }, [coords]);

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    };

    if (loading) return <div className="weather-footer">Loading summary...</div>;
    if (error) return <div className="weather-footer">Error: {error}</div>;

    return (
        <div className="weather-footer">
            <h3>Podsumowanie tygodnia</h3>
            <div className="summary-row">
                <span className="summary-label">Skrajne temperatury:</span>
                <span className="summary-value">
                    min: {weatherData.extreme_temperatures?.min ?? '-'}°C &nbsp;|&nbsp; max: {weatherData.extreme_temperatures?.max ?? '-'}°C
                </span>
            </div>
            <div className="summary-row">
                <span className="summary-label">Średnie ciśnienie:</span>
                <span className="summary-value">
                    {weatherData.average_pressure ?? '-'} hPa
                </span>
            </div>
            <div className="summary-row">
                <span className="summary-label">Średnia ekspozycja na słońce:</span>
                <span className="summary-value">
                    {weatherData.average_sun_exposure ?? '-'} Godzin
                </span>
            </div>
            <div className="summary-row">
                <span className="summary-label">Podsumowanie:</span>
                <span className="summary-value">
                    {weatherData.summary ?? '-'}
                </span>
            </div>
        </div>
    );
};

export default WeatherFooter;
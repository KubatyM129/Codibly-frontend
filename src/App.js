import React, { useEffect, useState } from 'react';
import WeatherTable from './components/WeatherTable';
import WeatherFooter from './components/WeatherFooter';
import { fetchWeatherData } from './api/weatherApi';
import { getLocation } from './utils/location';
import LocationPickerModal from './components/LocationPickerModal';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
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
                const data = await fetchWeatherData(latitude, longitude);
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } 
        };
        getWeather();
    }, [coords]);

    const handleToggleMode = () => setDarkMode((prev) => !prev);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    const handleLocationSelect = (latlng) => {
        setCoords({ lat: latlng.lat, lng: latlng.lng });
    };

    useEffect(() => {
        if (!coords) {
            getLocation()
                .then(loc => setCoords({ lat: loc.latitude, lng: loc.longitude }))
                .catch(err => setError(err.message));
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="header">
                <button
                    className={`toggle-btn${darkMode ? ' dark' : ''}`}
                    onClick={handleToggleMode}
                    aria-label="Toggle dark mode"
                    tabIndex={0}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    className={`toggle-btn${darkMode ? ' dark' : ''}`}
                    style={{ marginLeft: 12 }}
                    onClick={() => setShowLocationModal(true)}
                >
                    Zmień lokalizację
                </button>
            </div>
            <div className="title">
                <h1>7-dniowa Prognoza Pogody</h1>
            </div>
            {weatherData && <WeatherTable data={weatherData} darkMode={darkMode} />}
            {weatherData && <WeatherFooter coords={coords} />}
            <LocationPickerModal
                show={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                onLocationSelect={handleLocationSelect}
            />
        </div>
    );
};

export default App;
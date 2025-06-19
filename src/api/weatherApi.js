import axios from 'axios';

// Assumes frontend and backend run on the same host, backend on port 8000
const BASE_URL = 'https://codibly-backend-mq9i.onrender.com/api/weather';

export const fetchWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: { latitude, longitude }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
export const fetchWeatherSummary = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${BASE_URL}/summary`, {
            params: { latitude, longitude }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudRain, faSnowflake, faBolt, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon = ({ weathercode }) => {
    let icon;
    
    switch (weathercode) {
        case 0:
            icon = faSun; // clear sky
            break;
        case 1:
        case 2:
        case 3:
            icon = faCloudSun; // partly cloudy
            break;
        case 45:
        case 48:
            icon = faSmog; // fog
            break;
        case 51:
        case 53:
        case 55:
            icon = faCloudRain; //drizzle
            break;
        case 56:
        case 57:
            icon = faCloudRain; // freezing drizzle
            break;
        case 61:
        case 63:
        case 65:            
            icon = faCloudRain; // rain
            break;
        case 66:
        case 67:
            icon = faBolt; // freezing rain
            break;
        case 71:
        case 73:
        case 75:
            icon = faSnowflake; // snow
            break;
        case 77:
            icon = faSnowflake;  // snow grains
            break;
        case 80:
        case 81:
        case 82:
            icon = faCloudShowersHeavy;  // rain showers
            break;
        case 85:
        case 86:
            icon = faSnowflake;  // snow showers
            break;
        case 95:
            icon = faBolt;  // thunderstorm
            break;
        case 96:
        case 99:
            icon = faBolt;  // thunderstorm with hail
            break;
        default:
            icon = faSnowflake; // Default icon for unknown weather codes
    }

    return <FontAwesomeIcon icon={icon} />;
};

export default WeatherIcon;
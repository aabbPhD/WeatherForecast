import { weatherImages } from "../assets/allImages";

const { clear_day, clear_night, partly_cloudy_day, partly_cloudy_night, overcast, fog, drizzle, 
    rain, snow_shower, slight_snow, moderate_snow, heavy_snow, rain_shower, thunderstorm, rain_with_thunderstorm } = weatherImages;

export const weatherIcons = {
    0:  [clear_day, clear_night],
    1:  [partly_cloudy_day, partly_cloudy_night],
    2:  [partly_cloudy_day, partly_cloudy_night],
    3:  overcast,
    45: fog,
    48: fog,
    51: drizzle,
    53: drizzle,
    55: drizzle,
    56: snow_shower,
    57: snow_shower,
    61: rain,
    63: rain,
    65: rain,
    66: snow_shower,
    67: snow_shower,
    71: slight_snow,
    73: moderate_snow,
    75: heavy_snow,
    77: heavy_snow,
    80: rain_shower,
    81: rain_shower,
    82: rain_shower,
    85: snow_shower,
    86: snow_shower,
    95: thunderstorm,
    96: rain_with_thunderstorm,
    99: rain_with_thunderstorm
};
import { weatherImages } from "./allImages";

export const width_changeButtonsToPictures = 620;


export const daysOfWeek_short = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
export const daysOfWeek_full = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
export const weatherCodeDescriptions = {
    0:  "Ясно",
    1:  "Преимущественно ясно",
    2:  "Облачно",
    3:  "Пасмурно",
    45: "Туман",
    48: "Оседающий туман",
    51: "Слабая морось",
    53: "Умеренная морось",
    55: "Сильная морось",
    56: "Замерзающий дождь",
    57: "Замерзающий дождь",
    61: "Слабый дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    66: "Слабый дождь со снегом",
    67: "Сильный дождь со снегом",
    71: "Слабый снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    77: "Снежная крупа",
    80: "Слабые ливни",
    81: "Умеренные ливни",
    82: "Сильные ливни",
    85: "Слабый снежный дождь",
    86: "Сильный снежный дождь",
    95: "Гроза",
    96: "Дождь с грозой",
    99: "Сильный дождь с грозой"
};

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

export const DAY_START = 6;
export const NIGHT_START = 18;
export const HOURS_PER_DAY = 24;
export const MIN_PER_HOUR = 60;
export const SEC_IN_HOUR = 3600;
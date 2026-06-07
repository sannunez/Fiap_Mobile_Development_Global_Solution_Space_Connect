import axios from "axios";

export async function forecastNextSevenDays(latitude: number,longitude: number){

    const response = await axios.get("https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude,
                longitude,
                forecast_days: 7,
                daily: [
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "precipitation_sum",
                    "precipitation_probability_max",
                    "wind_speed_10m_max"
                ].join(",")
            },
        }
    )

    return response.data.daily.time.map((date: string, index: number) => ({
            date,

            maxTemp: response.data.daily.temperature_2m_max[index],

            minTemp: response.data.daily.temperature_2m_min[index],

            precipitation: response.data.daily.precipitation_sum[index],

            rainChance: response.data.daily.precipitation_probability_max[index],

            wind: response.data.daily.wind_speed_10m_max[index],
        })
    );
}

export async function getCurrentDay(latitude: number,longitude: number){

    const response = await axios.get("https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude,
                longitude,
                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "precipitation",
                    "wind_speed_10m",
                    "is_day"
                ].join(",")
            },
        }
    )
    
    return {
    date: response.data.current.time.split("T")[0],

    temperature:
        response.data.current.temperature_2m,

    humidity:
        response.data.current.relative_humidity_2m,

    precipitation:
        response.data.current.precipitation,

    wind:
        response.data.current.wind_speed_10m,

    is_day:
        response.data.current.is_day,
};
            
}



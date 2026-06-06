import axios from "axios";

export async function getCurrentWeather(latitude: number,longitude: number){

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


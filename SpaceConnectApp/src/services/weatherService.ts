import axios from "axios";

export async function getCurrentWeather(
    latitude: number,
    longitude: number){


    const response = await axios.get("https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude,
                longitude,
                current: "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation",
            },
        }
    )

    return response.data;
}


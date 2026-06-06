import axios from "axios";

export async function searchLocation(cityName: string){
    const response = await axios.get("https://geocoding-api.open-meteo.com/v1/search",
        {
            params: {
                name: cityName,
                count: 1,
                language: "pt",
                format: "json",
            },
        }
    );

    return response.data;
}
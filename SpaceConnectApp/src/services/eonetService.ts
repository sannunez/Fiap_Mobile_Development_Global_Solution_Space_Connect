import axios from "axios";
import { EarthNews } from "../types/EarthNews";

export async function getEarthNews(): Promise<EarthNews[]> {
    const response = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events",
        {
            params: {
                status: "open",
                days: 30,
                limit: 10,
            },
        }
        
    );

    return  response.data.events.map((event: any) => ({
        id: event.id,

        title: event.title,

        category: event.categories[0]?.title ?? "Unknown",

        data: event.geometry[0]?.date,
    }));
}
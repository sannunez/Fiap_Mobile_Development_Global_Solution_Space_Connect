import axios from "axios";
import { EarthNews } from "../types/EarthNews";

export async function getEarthNews(): Promise<EarthNews[]> {
    try {

        const response = await axios.get(
            "https://eonet.gsfc.nasa.gov/api/v3/events",
            {
                params: {
                    status: "open",
                    days: 30,
                    limit: 10,
                },
            }
        );

        return response.data.events.map((event: any) => ({
            id: event.id,
            title: event.title,
            category: event.categories[0]?.title ?? "Unknown",
            date: event.geometry[0]?.date,
        }));

    } catch (error) {

        if (axios.isAxiosError(error)) {

            if (error.response?.status === 503) {

                console.error(
                    "[NASA EONET] Serviço temporariamente indisponível (503). Tente novamente(Pressione R no terminal)."
                );

                throw new Error(
                    "A NASA está temporariamente indisponível. Tente novamente em alguns minutos(Pressione R no terminal)."
                );
            }

            console.error(
                "[NASA EONET] Erro:",
                error.response?.status
            );

            throw new Error(
                "Não foi possível carregar os eventos."
            );
        }

        console.error(error);

        throw new Error(
            "Erro inesperado ao carregar eventos."
        );
    }
}
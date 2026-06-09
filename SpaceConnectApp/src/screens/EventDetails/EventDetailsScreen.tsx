import {ScrollView,Text,Pressable} from "react-native";

import { useRoute } from "@react-navigation/native";

import { Linking } from "react-native";

import { EarthNews } from "../../types/EarthNews";

export default function EventDetailsScreen() {

    const route = useRoute();

    const { event } = route.params as {
        event: EarthNews;
    };

    const recommendations = {

        Wildfires: [
            "Evite queimadas.",
            "Não descarte cigarros na vegetação.",
            "Respeite áreas isoladas.",
        ],

        Floods: [
            "Evite áreas alagadas.",
            "Procure locais elevados.",
            "Siga orientações da defesa civil.",
        ],

        Volcanoes: [
            "Utilize máscara.",
            "Evite áreas de evacuação.",
            "Acompanhe alertas locais.",
        ],

        Drought: [
            "Economize água.",
            "Evite desperdícios.",
            "Proteja áreas verdes.",
        ],

        Landslides: [
            "Evite encostas instáveis.",
            "Observe rachaduras no solo.",
            "Siga alertas de evacuação.",
        ],

        "Severe Storms": [
            "Permaneça em local seguro.",
            "Evite áreas abertas.",
            "Acompanhe alertas meteorológicos.",
        ],

    };

    const categoryLinks: Record<string, string> = {

        Wildfires:
            "https://earthobservatory.nasa.gov/topic/wildfires",

        Floods:
            "https://earthobservatory.nasa.gov/topic/floods",

        Volcanoes:
            "https://earthobservatory.nasa.gov/topic/volcanoes",

        Drought:
            "https://earthobservatory.nasa.gov/topic/drought",

        Landslides:
            "https://earthobservatory.nasa.gov/topic/landslides",

        "Severe Storms":
            "https://earthobservatory.nasa.gov/topic/storms",

        "Sea and Lake Ice":
            "https://earthobservatory.nasa.gov/topic/sea-ice",
    };

    const eventRecommendations =
        recommendations[
            event.category as keyof typeof recommendations
        ] ?? [];

    const link =
        categoryLinks[
            event.category as keyof typeof categoryLinks
        ];

    return (

        <ScrollView
            contentContainerStyle={{
                padding: 20,
            }}
        >

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
            >
                {event.title}
            </Text>

            <Text
                style={{
                    fontSize: 18,
                    color: "gray",
                }}
            >
                Categoria: {event.category}
            </Text>

            <Text
                style={{
                    fontSize: 16,
                    marginTop: 10,
                }}
            >
                Data:{" "}
                {new Date(
                    event.date
                ).toLocaleDateString("pt-BR")}
            </Text>

            <Text
                style={{
                    marginTop: 25,
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                Recomendações
            </Text>

            {
                eventRecommendations.map(
                    (item, index) => (

                        <Text
                            key={index}
                            style={{
                                marginTop: 10,
                                fontSize: 16,
                            }}
                        >
                            • {item}
                        </Text>

                    )
                )
            }

            {
                link && (

                    <Pressable
                        onPress={() =>
                            Linking.openURL(link)
                        }
                        style={{
                            marginTop: 30,
                            padding: 15,

                            borderRadius: 10,

                            alignItems: "center",

                            backgroundColor: "#1E88E5",
                        }}
                    >

                        <Text
                            style={{
                                color: "#FFF",
                                fontWeight: "bold",
                            }}
                        >
                            Saiba Mais na NASA
                        </Text>

                    </Pressable>

                )
            }

        </ScrollView>

    );
}
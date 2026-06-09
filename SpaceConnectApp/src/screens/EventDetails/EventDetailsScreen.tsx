import {ScrollView,Text,Pressable} from "react-native";

import { useRoute } from "@react-navigation/native";

import { Linking } from "react-native";

import { EarthNews } from "../../types/EarthNews";
import { useTheme } from "../../hooks/useTheme";

export default function EventDetailsScreen() {
    const {theme} = useTheme();

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
            "https://disasters.nasa.gov/what-we-do/disasters/fires",

        Floods:
            "https://disasters.nasa.gov/what-we-do/disasters/floods",

        Drought:
            "https://earthobservatory.nasa.gov/topic/Drought",

        "Severe Storms":
            "https://disasters.nasa.gov",

        Volcanoes:
            "https://earthobservatory.nasa.gov",

        Landslides:
            "https://disasters.nasa.gov",

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
                flex: 1,
                padding: 20,
                backgroundColor: theme.background,
            }}
        >

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: theme.text
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
                    color: theme.text
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
                    color: theme.text
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
                                color: theme.text
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
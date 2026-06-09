import { View, Text, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { EarthNews } from "../types/EarthNews";
import { useTheme } from "../hooks/useTheme";
import {
    toggleFavorite,
    getFavorites
} from "../services/favoriteNewsService";

type Props = {
    news: EarthNews;
};

export default function EarthNewsCard({ news }: Props) {

    const { theme } = useTheme();

    const navigation = useNavigation<any>();

    const [isFavorite, setIsFavorite] = useState(false);

    const categoryTranslations: Record<string, string> = {
        Wildfires: "Incêndios",
        Volcanoes: "Vulcões",
        Floods: "Enchentes",
        Drought: "Secas",
        Landslides: "Deslizamentos",
        "Severe Storms": "Tempestades",
    };

    const translatedCategory =
        categoryTranslations[news.category] ??
        news.category;

    useEffect(() => {

        async function checkFavorite() {

            const favorites =
                await getFavorites();

            const exists =
                favorites.some(
                    item => item.id === news.id
                );

            setIsFavorite(exists);

        }

        checkFavorite();

    }, [news.id]);

    return (

        <Pressable
            onPress={() =>
                navigation.navigate(
                    "EventDetails",
                    {
                        event: news
                    }
                )
            }
        >

            <LinearGradient
                colors={[
                    theme.gradiente,
                    theme.card,
                    theme.card,
                    theme.card
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                    width: 300,
                    height: 150,

                    marginRight: 8,
                    marginVertical: 5,

                    padding: 10,

                    borderRadius: 10,

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: theme.text,
                    }}
                >
                    {news.title}
                </Text>

                <Text
                    style={{
                        fontSize: 16,
                        color: "gray",
                    }}
                >
                    {translatedCategory}
                </Text>

                <View
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                    }}
                >

                    <Pressable
                        onPress={async (e) => {

                            e.stopPropagation();

                            const result =
                                await toggleFavorite(news);

                            setIsFavorite(result);

                        }}
                    >

                        <Image
                            style={{
                                width: 32,
                                height: 32,
                            }}
                            source={
                                isFavorite
                                    ? require("../assets/images/favorite-active.png")
                                    : require("../assets/images/favorite.png")
                            }
                        />

                    </Pressable>

                </View>

            </LinearGradient>

        </Pressable>

    );
}
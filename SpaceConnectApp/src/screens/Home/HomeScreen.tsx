import { useState, useEffect } from "react";
import { View, ScrollView, FlatList, Text } from "react-native";

import BarCharComp from "../../components/barchart";
import DayChart from "../../components/dayChart";
import EarthNewsCard from "../../components/EarthNewscard";

import { useTheme } from "../../hooks/useTheme";

import { loadWeather, saveWeather } from "../../storage/weatherServiceStorage";

import { getEarthNews } from "../../services/eonetService";
import { EarthNews } from "../../types/EarthNews";

export default function HomeScreen() {
    const { theme } = useTheme();

    const [locationName, setLocationName] = useState("");
    const [forecast, setForecast] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState<any>(null);

    const [news, setNews] = useState<EarthNews[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCache() {
            const cached = await loadWeather("last-weather");

            if (cached) {
                setForecast(cached.forecast);
                setCurrentDay(cached.currentDay);
                setLocationName(cached.locationName);
            }
        }

        loadCache();
    }, []);

    useEffect(() => {

        async function loadNews() {

            try {

                const data = await getEarthNews();

                setNews(data);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);
                }

            }
        }

        loadNews();

    }, []);

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.background,
            }}
        >
            <View style={{
                alignItems: "center",
                gap: 10,
            }}>

                {currentDay && (
                    <DayChart
                        data={currentDay}
                        rainChance={forecast?.[0]?.rainChance ?? 0}
                        location={locationName}
                    />
                )}

                <BarCharComp data={forecast} />

            </View>
            <View style={{
                margin: 10
            }}>

                <Text style={{
                    color: "gray",
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10
                }}>Ocorrendo no mundo:</Text>

                <View
                    style={{
                    height: 170,
                    }}
                >

                {
                    error !== "" && (
                        <Text
                            style={{
                                color: "red",
                                marginVertical: 10,
                            }}
                        >
                            {error}
                        </Text>
                    )
                }
                
                <FlatList
                    horizontal
                    data={news}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <EarthNewsCard news={item} />
                    )}
                />
                </View>
                
                <Text style={{
                    width: "100%",
                    color: "gray",
                    fontSize: 14,
                    textAlign: "right"
                }}>Fonte: EONET API - NASA</Text>
            </View>
        </ScrollView>
    );
}
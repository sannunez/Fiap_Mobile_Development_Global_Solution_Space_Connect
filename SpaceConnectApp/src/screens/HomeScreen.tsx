import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";

import BarCharComp from "../components/barchart";
import DayChart from "../components/dayChart";

import { useTheme } from "../hooks/useTheme";
import { forecastNextSevenDays, getCurrentDay } from "../services/weatherService";
import { searchLocation } from "../services/geocodingService";

import { loadWeather, saveWeather } from "../storage/weatherServiceStorage";

export default function HomeScreen() {
    const { theme } = useTheme();

    const [hasCache, setHasCache] = useState<boolean | null>(null);

    const [location, setLocation] = useState("");
    const [forecast, setForecast] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadCacheOnStart() {
            const cached = await loadWeather("last-weather");

            if (cached) {
                setForecast(cached.forecast);
                setCurrentDay(cached.currentDay);
                setHasCache(true);
            } else {
                setHasCache(false);
            }
        }

        loadCacheOnStart();
    }, []);

    async function getGeoLoc() {
        try {
            setLoading(true);

            const geoData = await searchLocation(location);

            const forecastData = await forecastNextSevenDays(
                geoData.latitude,
                geoData.longitude
            );

            const currentDayData = await getCurrentDay(
                geoData.latitude,
                geoData.longitude
            );

            await saveWeather("last-weather", {
                forecast: forecastData,
                currentDay: currentDayData,
            });

            setForecast(forecastData);
            setCurrentDay(currentDayData);
            setHasCache(true);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // LOADING INICIAL (checa cache)
    if (hasCache === null) {
        return <View />;
    }

    // TELA DE BUSCA (sem cache)
    if (!hasCache) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: theme.background,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <TextInput
                    placeholder="Digite sua cidade..."
                    value={location}
                    onChangeText={setLocation}
                />

                <Pressable onPress={getGeoLoc}>
                    <Text style={{ color: theme.text }}>
                        {loading ? "Carregando..." : "Buscar clima"}
                    </Text>
                </Pressable>
            </View>
        );
    }

    // HOME (cache)
    return (
        <ScrollView>
            <View style={{
                flex: 1,
                backgroundColor: theme.background,
                alignItems: "center"
            }}>

                {currentDay && (
                    <DayChart
                        data={currentDay}
                        rainChance={forecast?.[0]?.rainChance ?? 0}
                    />
                )}

                <BarCharComp data={forecast} />

            </View>
        </ScrollView>
    );
}
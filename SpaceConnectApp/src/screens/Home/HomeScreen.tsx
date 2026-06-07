import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import BarCharComp from "../../components/barchart";
import DayChart from "../../components/dayChart";

import { useTheme } from "../../hooks/useTheme";

import { loadWeather, saveWeather } from "../../storage/weatherServiceStorage";

export default function HomeScreen() {
    const { theme } = useTheme();

    const [locationName, setLocationName] = useState("");
    const [forecast, setForecast] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState<any>(null);

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

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                backgroundColor: theme.background,
                alignItems: "center",
                gap: 10
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
        </ScrollView>
    );
}
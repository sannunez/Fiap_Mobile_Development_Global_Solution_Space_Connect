import { View, Text, ScrollView } from "react-native";
import { ForecastWeek } from "../types/ForecastWeek";
import { useTheme } from "../hooks/useTheme";

type ForecastCardProps = {
    item: ForecastWeek;
};

export default function ForecastCard({item,}: ForecastCardProps) {

    const {theme} = useTheme();

    function getWeekDay(date: string) {
        return new Date(date).toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
            }
        );
    }

    function getFormatDate(date: string) {
    return new Date(date).toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}

    return (
        <ScrollView
            style = {{
                width: 370
            }}
        >

            <View
                style={{
                    margin: 10,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: theme.card,
                    display: 'flex',
                    alignItems: 'center',
                    shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,

                    elevation: 5,

                }}
            >
                <Text style={{color: "gray", fontWeight: "500", fontSize: 16, marginBottom: 5}}>
                    {getWeekDay(item.date).toUpperCase()} - {getFormatDate(item.date)}
                </Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    gap: 50
                }}>
                    <View style={{gap: 5}}>
                        <Text style={{color: "gray", fontWeight: "400"}}>
                            Máx: {item.maxTemp}°C
                        </Text>

                        <Text  style={{color: "gray", fontWeight: "400"}}>
                            Mín: {item.minTemp}°C
                        </Text>
                    </View>
                
                    <View style={{backgroundColor: "#e6e6e6", width: 2, height: 50, borderRadius: 5}}/>

                    <View style={{gap: 5}}>
                        <Text  style={{color: "gray", fontWeight: "400"}}>
                            Chuva: {item.rainChance}%
                        </Text>

                        <Text  style={{color: "gray", fontWeight: "400"}}>
                            Vento: {item.wind} km/h
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
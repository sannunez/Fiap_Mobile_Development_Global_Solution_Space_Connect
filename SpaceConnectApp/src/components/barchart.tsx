import { View, StyleSheet, Pressable, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../hooks/useTheme";
import { ForecastWeek } from "../types/ForecastWeek";
import { useState } from "react";


type BarCharProps = {
    data: ForecastWeek[]
};

type MetricKey = "maxTemp" | "minTemp" | "wind" | "precipitation";

export default function BarCharComp({data} : BarCharProps){
    const {darkMode,toggleTheme,theme} = useTheme();

    const [metricIndex, setMetricIndex] = useState(0);

    const metrics: { key: MetricKey; label: string }[] = [
    { key: "maxTemp", label: "Temperatura Máx" },
    { key: "minTemp", label: "Temperatura Mín" },
    { key: "wind", label: "Vento" },
    { key: "precipitation", label: "Chuva" },
];

    const currentMetric = metrics[metricIndex];

    const nextMetric = () => {
        setMetricIndex(prev => (prev + 1) % metrics.length);
    };

    const prevMetric = () => {
        setMetricIndex(prev => (prev - 1 + metrics.length) % metrics.length);
    };

    const chartData = data.map((item) => {
    return {
        value: item[currentMetric.key],
        label: new Date(item.date).toLocaleDateString("pt-BR", {
            weekday: "short"
        }),
    };
});


    return(
        <View style={styles.chartCard}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <Pressable onPress={prevMetric}>
                    <Text>Menos</Text>
                </Pressable>

                    <Text>{currentMetric.label}</Text>

                <Pressable onPress={nextMetric}>
                    <Text>Mais</Text>
                </Pressable>
            </View>
            <BarChart
                data={chartData}
                showGradient
                gradientColor={"#05ca7f"}
                frontColor={"#68ffc5"}
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle = {{
                    color: "gray",
                    fontSize: 12,
                    fontWeight: "500"
                }}
                xAxisLabelTextStyle = {{
                    color: "gray",
                    fontSize: 12,
                    fontWeight: "500"
                }}

                barWidth = {30}
                spacing = {18}
                barBorderRadius={4}
                showValuesAsTopLabel
                topLabelTextStyle={{
                    color: "gray"
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chartCard: {
        width: "95%",

        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 5,

        shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 5,
    }
})
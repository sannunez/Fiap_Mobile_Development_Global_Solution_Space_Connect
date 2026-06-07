import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../hooks/useTheme";
import { ForecastWeek } from "../types/ForecastWeek";


type BarCharProps = {
    data: ForecastWeek[]
};

export default function BarCharComp({data} : BarCharProps){
    const {darkMode,toggleTheme,theme} = useTheme();
    
    const chartData = data.map((item) => {
        return {
            value: item.maxTemp,
            label: new Date(item.date).toLocaleDateString("pt-BR", {weekday:"short"})
        };
    })

    return(
        <View style={styles.chartCard}>
            <BarChart
                data={chartData}
                showGradient
                gradientColor={"#03e991"}
                frontColor={"#8ffdd3"}
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
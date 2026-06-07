import { View, StyleSheet, Text, Image } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { CurrentDay } from "../types/CurrentDay"
import { ForecastWeek } from "../types/ForecastWeek";
import { PieChart } from "react-native-gifted-charts";


type dayChartProps = {
    data: CurrentDay;
    rainChance: number;
}

export default function DayChart({data, rainChance} : dayChartProps){
    const {darkMode, toggleTheme, theme} = useTheme();

    const [year, month, day] = data.date.split("-");

    const months = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];

    const formattedDate = `${day} ${months[Number(month) - 1]} ${year}`;

    const isDay = data.is_day === 1;

    const pieChartData = [
        {
            value: rainChance,
            color: "#0899fa",
        },
        {
            value: 100 - rainChance,
            color: "#95d5ff",
        },
    ];
    
    return(
        <View style={{
                backgroundColor: theme.background, 
                width: '100%',
                height: 150,
                padding: 15,
                }}>

            <View style={{display: 'flex', alignItems: 'center'}}>
                <Text style={{fontSize: 18, marginBottom: 2, fontWeight: 500, color: "gray"}}>{formattedDate}</Text>
            </View>

            <View style={{
                backgroundColor: theme.background, 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent:'space-between', 
                width: '100%',

                }}>
                
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    gap: 10, 
                    
                }}>
                    {/* <View>
                        <Text style={{color: "gray", fontWeight: 400, fontSize: 32, includeFontPadding: false}}>
                            {day}
                        </Text>
                        <View style={{width: 35, height: 4, backgroundColor: "gray", borderRadius: 2}}/>
                        <Text style={{color: "gray", fontWeight: 400, fontSize: 32, includeFontPadding: false}}>
                            {month}
                        </Text>
                    </View> */}

                    <Image
                        source={
                            isDay
                                ? require("../assets/images/sun.png")
                                : require("../assets/images/moon.png")
                        }
                        style={{width: 50, height: 65}}
                        resizeMode="contain"
                    />
                </View>

                <Text style={{fontSize: 28, color: "gray"}}>
                    {data.temperature}°C
                </Text>

                <View style={{width: 2, height: 80, backgroundColor: "#cacaca", borderRadius: 2}}/>

                <View style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <View>
                        <Text style={{fontWeight: 400, color: 'gray', fontSize: 12}}>Chuva: {rainChance}%</Text>
                        <Text style={{fontWeight: 400, color: 'gray', fontSize: 12}}>Umidade: {data.humidity}%</Text>
                        <Text style={{fontWeight: 400, color: 'gray', fontSize: 12}}>Vento: {data.wind}km/h</Text>
                    </View>

                    <View>
                        <View>
                            <PieChart
                            data={pieChartData}
                            radius={40}
                            innerRadius={25}
                            innerCircleColor={theme.background}
                            donut
                            strokeWidth={2}
                            strokeColor={theme.background}
                            />
                        </View>
                        <View style={{ position: "absolute", width: 80, height: 80, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "gray", fontWeight: "400" }}>
                                {Math.round(rainChance)}%
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
    )
}
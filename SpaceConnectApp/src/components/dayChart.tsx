import { View, StyleSheet, Text, Image } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { CurrentDay } from "../types/CurrentDay"
import { PieChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";


type dayChartProps = {
    data: CurrentDay;
    rainChance: number;
    location: string
}

export default function DayChart({data, rainChance, location} : dayChartProps){
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
    
    const messages = [
        "Temperatura MUITO BAIXA: busque se aquecer imediatamente.",
        "Temperatura relativamente baixa: um agasalho e bebida quente caem bem.",
        "Temperatura agradavel: temperatura ideal.",
        "Temperatura relativamente alta: mantenha-se hidratado e use protetor solar.",
        "Temperatura MUITO ALTA: busque se abrigar imediatamente em local arejado, evite contato direto com a luz do sol."
    ];

    const message =
    data.temperature <= 9
        ? messages[0]
        : data.temperature <= 17
        ? messages[1]
        : data.temperature <= 22
        ? messages[2]
        : data.temperature <= 28
        ? messages[3]
        : messages[4];


    return(
        <View style={{
                backgroundColor: theme.background, 
                width: '100%',
                height: 150,
                padding: 15,
                marginBottom: 15,

                }}>

            <View style={{display: 'flex', alignItems: 'center'}}>
                <Text style={{fontSize: 18, marginBottom: 2, fontWeight: "500", color: "gray"}}>{location} - {formattedDate}</Text>
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
                        <Text style={{fontWeight: "400", color: 'gray', fontSize: 12}}>Chuva: {rainChance}%</Text>
                        <Text style={{fontWeight: "400", color: 'gray', fontSize: 12}}>Umidade: {data.humidity}%</Text>
                        <Text style={{fontWeight: "400", color: 'gray', fontSize: 12}}>Vento: {data.wind}km/h</Text>
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
            <View style={{display: 'flex', alignItems: 'center'}}>
                <Text style={{fontSize: 12, marginTop:5 ,fontWeight: "400", color: "gray", fontStyle: "italic", textAlign: "center"}}>
                    {message}
                </Text>
            </View>
        </View>
    )
}
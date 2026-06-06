import {useEffect, useState} from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'

import { useTheme } from '../hooks/useTheme'

import { getCurrentWeather } from '../services/weatherService'
import { searchLocation } from '../services/geocodingService';

export default function HomeScreen(){
    const {darkMode, toggleTheme, theme} = useTheme();

    const [weather, setWeather] = useState<any>();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [location, setLocation] = useState("");

    async function loadWeather(){
        const data = await getCurrentWeather(latitude, longitude);

        setWeather(data);
    }

    async function getGeoLoc(){
        const data = await searchLocation(location)

        setLatitude(data.latitude)
        setLocation(data.longitude)

        loadWeather()
    }



    if(!weather){
        return(
            <View>
                <TextInput
                    placeholder='Digite sua cidade...'
                    value={location}
                    onChangeText={setLocation}
                ></TextInput>

                <Pressable
                    onPress={getGeoLoc}
                >
                    <Text style={{color: theme.text}}>Dados Climáticos</Text>
                </Pressable>
                
            </View>
        )
    }

    return(
        <View
            style = {{
                display: 'flex',
                flex: 1,
                backgroundColor:  theme.background
            }}
        >
            <View>

                <Text  style={{color: theme.text,}}>
                    Temperatura: {weather?.current?.temperature_2m}°C
                </Text>

            </View>
        </View>
    )
}
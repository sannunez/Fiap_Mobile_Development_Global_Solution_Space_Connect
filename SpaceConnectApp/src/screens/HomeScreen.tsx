import {useEffect, useState} from 'react'
import {View, Text, TextInput, Pressable, FlatList, ScrollView} from 'react-native'

import BarCharComp from '../components/barchart'

import { useTheme } from '../hooks/useTheme'

import { getCurrentWeather } from '../services/weatherService'
import { searchLocation } from '../services/geocodingService';

export default function HomeScreen(){
    const {darkMode, toggleTheme, theme} = useTheme();

    const [location, setLocation] = useState("");
    const [forecast, setForecast] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function getGeoLoc() {
        try {
            setLoading(true);

            const geoData = await searchLocation(location);

            const weatherData = await getCurrentWeather(
                geoData.latitude,
                geoData.longitude
            );

            setForecast(weatherData);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }



    if(!forecast.length){
        return(
            <View style = {{
                    display: 'flex',
                    flex: 1,
                    backgroundColor:  theme.background,
                    alignItems: 'center'
                }}>

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
        <ScrollView contentInsetAdjustmentBehavior='automatic'>
            <View
                style = {{
                    display: 'flex',
                    flex: 1,
                    backgroundColor:  theme.background,
                    alignItems: 'center'
                }}
            >

                <View>
                    <BarCharComp data={forecast}/>
                </View>
                {/* <View>
                    <FlatList
                        data={forecast}
                        keyExtractor={(item) => item.date}
                        renderItem={({item}) => (
                            <View>
                                <Text style={{color: theme.text}}>
                                    {item.date}
                                </Text>
                                
                                <Text style={{color: theme.text}}>
                                    {item.maxTemp}°C
                                </Text>

                                <Text style={{color: theme.text}}>
                                    {item.minTemp}°C
                                </Text>
                                
                                <Text style={{color: theme.text}}>
                                    {item.rainChance}%
                                </Text>

                                <Text style={{color: theme.text}}>
                                    {item.precipitation} mm
                                </Text>

                                <Text style={{color: theme.text}}>
                                    {item.wind} km/h
                                </Text>
                            </View>
                        )}
                    />
                </View> */}
            </View>
        </ScrollView>
    )
}
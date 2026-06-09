import { View, TextInput, Pressable, Text, Image } from "react-native";
import { useState } from "react";
import { searchLocation } from "../../services/geocodingService";
import { saveWeather } from "../../storage/weatherServiceStorage";
import { forecastNextSevenDays, getCurrentDay } from "../../services/weatherService";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function UserScreen() {
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const navigation = useNavigation<Nav>();

    async function handleSearch() {
        if (!location.trim()) {
            setError("Por favor, informe uma cidade.");
            return;
        }

        try {
            setError("");

            const geo = await searchLocation(location);

            if (!geo) {
                setError("Cidade não encontrada.");
                return;
            }

            const forecast = await forecastNextSevenDays(
                geo.latitude,
                geo.longitude
            );

            const current = await getCurrentDay(
                geo.latitude,
                geo.longitude
            );

            await saveWeather("last-weather", {
                forecast,
                currentDay: current,
                locationName: geo.name
            });

            navigation.replace("Tabs");

        } catch (err) {
            console.log(err);
            setError("Não foi possível realizar a busca. Tente novamente.");
        }
    }

    return (
        <View
            style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    color: "gray",
                }}
            >
                GLOBAL SOLUTION
            </Text>

            <Image
                source={require("../../assets/images/SpaceConnectLogo.png")}
                resizeMode="contain"
                style={{
                    width: 250,
                    height: 200,
                }}
            />

            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Text
                    style={{
                        width: 300,
                    }}
                >
                    Digite sua cidade:
                </Text>

                <TextInput
                    placeholder="Exemplo: São Paulo"
                    value={location}
                    onChangeText={(text) => {
                        setLocation(text);

                        if (error) {
                            setError("");
                        }
                    }}
                    style={{
                        width: 300,
                        backgroundColor: "#e4e4e4",
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        color: "gray",

                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,

                        elevation: 5,
                    }}
                />

                {error ? (
                    <Text
                        style={{
                            width: 300,
                            color: "#ff4d4f",
                            fontSize: 12,
                        }}
                    >
                        {error}
                    </Text>
                ) : null}

                <Pressable
                    onPress={handleSearch}
                    style={{
                        display: "flex",
                        width: 130,
                        padding: 8,
                        backgroundColor: "#1792f7",
                        borderRadius: 5,
                        alignItems: "center",

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
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        Buscar
                    </Text>
                </Pressable>
            </View>

            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../../assets/images/FIAP-Logo.png")}
                    resizeMode="contain"
                    style={{
                        width: 150,
                        height: 50,
                    }}
                />

                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "gray",
                    }}
                >
                    2026
                </Text>
            </View>
        </View>
    );
}
import { useEffect, useState } from "react";
import { View, FlatList, TextInput, Text, Pressable } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { loadWeather } from "../../storage/weatherServiceStorage";
import { ForecastWeek } from "../../types/ForecastWeek";
import ForecastCard from "../../components/ForecastCard";
import FilterButton from "../../components/FilterButton";

export default function ListScreen() {
    const { theme } = useTheme();

    const [forecast, setForecast] = useState<ForecastWeek[]>([]);
    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("date");

    const [filter, setFilter] = useState("all");

    const [showOrder, setShowOrder] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const hiddenOrders = () => { setShowOrder(prev => !prev) }
    const hiddenFilters = () => { setShowFilter(prev => !prev) }

    useEffect(() => {
        async function loadData() {
            const cached = await loadWeather("last-weather");

            if (cached) {
                setForecast(cached.forecast);
            }
        }

        loadData();
    }, []);

    function getWeekDay(date: string) {
        return new Date(date).toLocaleDateString(
            "pt-BR",
            {
                weekday: "long"
            }
        );
    }

    const searchedForecast = forecast.filter(item =>
        getWeekDay(item.date)
            .toLowerCase()
            .includes(search.toLowerCase())
    );


    const filteredForecast = searchedForecast.filter(item => {
        switch (filter) {

            case "hot":
                return item.maxTemp >= 23;

            case "cold":
                return item.maxTemp <= 16;

            case "rainy":
                return item.rainChance >= 50;

            case "windy":
                return item.wind >= 20;

            default:
                return true;
        }
    });



    const sortedForecast = [...filteredForecast].sort((a, b) => {
        switch (sortBy) {
            case "maxTemp":
                return b.maxTemp - a.maxTemp;

            case "minTemp":
                return b.minTemp - a.minTemp;

            case "rainChance":
                return b.rainChance - a.rainChance;

            case "wind":
                return b.wind - a.wind;

            default:
                return 0;
        }
    });



    return (
        <View style={{ backgroundColor: theme.background, flex: 1}}>


            <View style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <FlatList
                    data={sortedForecast}
                    keyExtractor={(item) => item.date}
                    ListHeaderComponent={
                        <>
                            <TextInput
                                placeholder="Pesquisar dia..."
                                value={search}
                                onChangeText={setSearch}
                                style={{
                                    margin: 10,
                                    backgroundColor: "#f5f5f5",
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
                            <Pressable style={{ marginInline: 30 }}
                                onPress={hiddenOrders}
                            >
                                <Text style={{
                                    textDecorationLine: "underline",
                                    color: "gray"
                                }}>
                                    {showOrder ? "Ordernar ▲" : "Ordenar ▼"}
                                </Text>
                            </Pressable>


                            {showOrder && (
                                <View
                                    style={{
                                        marginInline: 30,
                                        backgroundColor: theme.card,
                                        borderRadius: 10,
                                        padding: 5
                                    }}
                                >

                                    <View>
                                        <FilterButton
                                            title="🌡️ Temp"
                                            active={sortBy === "maxTemp"}
                                            onPress={() => setSortBy("maxTemp")}
                                        />

                                        <FilterButton
                                            title="🌧️ Chuva"
                                            active={sortBy === "rainChance"}
                                            onPress={() => setSortBy("rainChance")}
                                        />

                                        <FilterButton
                                            title="🌬️ Vento"
                                            active={sortBy === "wind"}
                                            onPress={() => setSortBy("wind")}
                                        />
                                    </View>
                                </View>
                            )}
                            <Pressable style={{ marginInline: 30 }}
                                onPress={hiddenFilters}
                            >
                                <Text style={{
                                    textDecorationLine: "underline",
                                    color: "gray"
                                }}>
                                    {showFilter ? "Filtrar ▲" : "Filtrar ▼"}
                                </Text>
                            </Pressable>
                            {showFilter && (
                                <View
                                    style={{
                                        marginInline: 30,
                                        backgroundColor: theme.card,
                                        borderRadius: 10,
                                        padding: 5
                                    }}
                                >


                                    <View>
                                        <FilterButton
                                            title="Todos"
                                            active={filter === "all"}
                                            onPress={() => setFilter("all")}
                                        />

                                        <FilterButton
                                            title="🔥 Quentes"
                                            active={filter === "hot"}
                                            onPress={() => setFilter("hot")}
                                        />

                                        <FilterButton
                                            title="❄️ Frios"
                                            active={filter === "cold"}
                                            onPress={() => setFilter("cold")}
                                        />

                                        <FilterButton
                                            title="🌧️ Chuvosos"
                                            active={filter === "rainy"}
                                            onPress={() => setFilter("rainy")}
                                        />

                                        <FilterButton
                                            title="🌬️ Ventosos"
                                            active={filter === "windy"}
                                            onPress={() => setFilter("windy")}
                                        />
                                    </View>
                                </View>
                            )}
                        </>
                    }
                    renderItem={({ item }) => (
                        <ForecastCard item={item} />
                    )}
                />
            </View>

        </View>
    );
}
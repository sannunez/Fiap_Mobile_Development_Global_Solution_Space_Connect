import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Image, Platform, View } from "react-native";

import HomeScreen from "../screens/Home/HomeScreen";
import ListScreen from "../screens/List/ListScreen";
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

import { useTheme } from "../hooks/useTheme";
import { useUser } from "../hooks/useUser";

const Tab = createBottomTabNavigator();

const icons = {
    Home: {
        active: require("../assets/images/home-active.png"),
        inactive: require("../assets/images/home.png"),
    },
    Semana: {
        active: require("../assets/images/calendar-active.png"),
        inactive: require("../assets/images/calendar.png"),
    },
    Favoritos: {
        active: require("../assets/images/favorite-active.png"),
        inactive: require("../assets/images/favorite.png"),
    },
    Settings: {
        active: require("../assets/images/settings-active.png"),
        inactive: require("../assets/images/settings.png"),
    },
};

export default function AppNavigator() {

    const { darkMode, theme } = useTheme();

    const { username, treatment } = useUser();

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({focused, size}) => {

                    const icon = icons[route.name as keyof typeof icons];

                    return (
                        <Image
                            source={
                                focused
                                    ? icon.active
                                    : icon.inactive
                            }
                            style={{
                                width: size,
                                height: size,
                            }}
                            resizeMode="contain"
                        />
                    );
                },

                headerStyle: {
                    backgroundColor: theme.card,
                },

                headerTintColor: theme.text,
                headerTitleAlign: "center",
                headerTitle: username
                        ? `${route.name} • ${treatment} ${username}`
                        : route.name,

                tabBarBackground: () =>
                    Platform.OS === "web" ? (
                        <View style={{ flex: 1, backgroundColor: theme.card }} />
                    ) : (
                        <BlurView
                            intensity={darkMode ? 60 : 90}
                            tint={darkMode ? "dark" : "light"}
                            style={{ flex: 1 }}
                        />
                    ),

                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 65,
                },

                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: false,

            })}
        >

            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Semana" component={ListScreen}/>
            <Tab.Screen name="Favoritos" component={FavoritesScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>

        </Tab.Navigator>

    );
}
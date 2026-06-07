import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/Home/HomeScreen';
import ListScreen from '../screens/List/ListScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function AppNavigator(){
    
    const { theme } = useTheme();
    
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.card,
                },

                headerTintColor: theme.text,

                tabBarStyle: {
                    backgroundColor: theme.card
                },

                tabBarActiveTintColor: theme.primary,

                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            <Tab.Screen
                name="List"
                component={ListScreen}
            />

            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Tab.Navigator>
    )
}
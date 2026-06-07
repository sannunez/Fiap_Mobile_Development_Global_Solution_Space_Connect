import {View, Text, Switch, Pressable} from 'react-native'
import { useTheme } from '../hooks/useTheme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen(){
    const {darkMode, toggleTheme, theme} = useTheme();
    
    async function clearPreferences() {
        try {
            await AsyncStorage.clear();
            console.log("Preferências removidas");
        } catch (error) {
            console.log("Erro ao limpar cache", error);
        }
    }

    return(
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: theme.background,
            }}
        >
            <Text
                style={{
                color: theme.text,
                fontSize: 20,
                marginBottom: 20,
                }}
            >
                Dark Mode
            </Text>

            <Switch
                value={darkMode}
                onValueChange={toggleTheme}
            />

            <View>
                <Pressable onPress={clearPreferences}>
                    <Text>Limpar preferências</Text>
                </Pressable>
            </View>
        </View>
    )
}
import {View, Text, Switch, Pressable, Alert} from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen(){
    const {darkMode, toggleTheme, theme} = useTheme();

    function confirmClearPreferences() {
        Alert.alert(
            "Confirmar ação",
            "Você tem certeza?\n\nAo confirmar, você concorda em limpar dados salvos como:\n- Cidade analisada\n- Notícias salvas\n- Tema (Light/Dark)",

            [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Confirmar",
                style: "destructive",
                onPress: async () => {
                try {
                    await AsyncStorage.clear();
                    console.log("Preferências removidas");
                } catch (error) {
                    console.log("Erro ao limpar cache", error);
                }
                },
            },
            ]
        );
    }

    return(
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: theme.background,
                paddingHorizontal: 10
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                    color: theme.text,
                    fontSize: 16,
                    }}
                >
                    {darkMode ? " Definir para Light Mode" : " Definir para Dark Mode"}
                </Text>

                <Switch
                    value={darkMode}
                    onValueChange={toggleTheme}
                />
            </View>

            <View 
                style={{
                    marginLeft: 10
                }}
            >
                <Pressable onPress={confirmClearPreferences}>
                    <Text>Limpar preferências</Text>
                </Pressable>
            </View>
        </View>
    )
}
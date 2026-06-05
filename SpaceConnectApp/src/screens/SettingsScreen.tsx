import {View, Text, Switch} from 'react-native'
import { useTheme } from '../hooks/useTheme'

export default function SettingsScreen(){
    const {darkMode, toggleTheme, theme} = useTheme();
    
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
        </View>
    )
}
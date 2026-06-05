import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@spaceconnect_theme";

export async function saveTheme(darkMode: boolean): Promise<void> {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(darkMode)
    );
}

export async function loadTheme() {

    const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (value !== null) {
        return JSON.parse(value);
    }

    return false;
    
}
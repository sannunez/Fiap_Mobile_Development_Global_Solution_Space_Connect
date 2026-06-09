import AsyncStorage from "@react-native-async-storage/async-storage";

const USERNAME_KEY = "@username";
const TREATMENT_KEY = "@treatment";

export async function saveUserPreferences(username: string,treatment: string) {

    await AsyncStorage.setItem(
        USERNAME_KEY,
        username
    );

    await AsyncStorage.setItem(
        TREATMENT_KEY,
        treatment
    );
}

export async function getUserPreferences() {

    const username = await AsyncStorage.getItem(USERNAME_KEY);

    const treatment = await AsyncStorage.getItem(TREATMENT_KEY);

    return {
        username: username ?? "",
        treatment: treatment ?? "Sr.",
    };
}
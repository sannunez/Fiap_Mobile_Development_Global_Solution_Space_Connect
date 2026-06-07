import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveWeather(key: string, data: any) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.log("Erro ao salvar:", e)
    }
}

export async function loadWeather(key: string){
    try{
        const data = await AsyncStorage.getItem(key);

        if (!data) return null;

        return JSON.parse(data);
    } catch (e) {
        console.log("Erro ao carregar:", e);
        return null;
    }
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EarthNews } from "../types/EarthNews";

const STORAGE_KEY = "@favorite_news";

export async function saveFavorite(news: EarthNews) {

    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    const favorites: EarthNews[] =
        stored ? JSON.parse(stored) : [];

    const alreadyExists = favorites.some(
        item => item.id === news.id
    );

    if (alreadyExists) {
        return false;
    }

    favorites.push(news);

    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
    );

    return true;
}

export async function getFavorites(): Promise<EarthNews[]> {

    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
}

export async function toggleFavorite(news: EarthNews) {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    const favorites: EarthNews[] = stored ? JSON.parse(stored) : [];

    const index = favorites.findIndex(item => item.id === news.id);


    if (index !== -1) {
        favorites.splice(index, 1);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return false; // removido
    }

    
    favorites.push(news);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true; // adicionado
}
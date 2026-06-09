import AsyncStorage from "@react-native-async-storage/async-storage";
import { EarthNews } from "../types/EarthNews";

const STORAGE_KEY = "@favorite_news";

export async function loadFavorites(): Promise<EarthNews[]> {

    const stored =await AsyncStorage.getItem(STORAGE_KEY);

    return stored
        ? JSON.parse(stored)
        : [];
}

export async function saveFavorites(favorites: EarthNews[]) {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(favorites));
}
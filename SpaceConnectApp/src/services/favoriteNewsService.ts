import { EarthNews } from "../types/EarthNews";
import {loadFavorites, saveFavorites} from "../storage/favoriteNewsStorage";

export async function getFavorites() {
    return await loadFavorites();
}

export async function saveFavorite(news: EarthNews) {

    const favorites =await loadFavorites();

    const alreadyExists = favorites.some(item => item.id === news.id);

    if (alreadyExists) {
        return false;
    }

    favorites.push(news);

    await saveFavorites(favorites);

    return true;
}

export async function toggleFavorite(news: EarthNews) {
    const favorites = await loadFavorites();
    const index = favorites.findIndex(item => item.id === news.id);

    if (index !== -1) {
        favorites.splice(index, 1);
        await saveFavorites(favorites);

        return false;
    }

    favorites.push(news);

    await saveFavorites(favorites);

    return true;
}
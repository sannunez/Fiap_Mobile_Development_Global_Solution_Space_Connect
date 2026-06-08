import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, Text } from "react-native";

import EarthNewsCard from "../../components/EarthNewscard";
import { EarthNews } from "../../types/EarthNews";
import { getFavorites } from "../../services/favoriteNewsService";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<EarthNews[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadFavorites() {
        const data = await getFavorites();
        setFavorites(data);
      }

      loadFavorites();
    }, [])
  );

  return (
    <View style={{ display: 'flex', flex: 1, padding: 10, alignItems: 'center', width: '100%'}}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EarthNewsCard news={item} />
        )}
        ListEmptyComponent={
          <View style={{display: 'flex', flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{ fontSize: 16, color: "gray"}}>
              Nenhuma notícia favoritada
            </Text>
          </View>
        }
      />
    </View>
  );
}
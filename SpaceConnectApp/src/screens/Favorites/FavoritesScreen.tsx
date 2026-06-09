import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, Text, Alert, Pressable, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EarthNewsCard from "../../components/EarthNewscard";

import { EarthNews } from "../../types/EarthNews";
import { getFavorites } from "../../services/favoriteNewsService";
import {getUserPreferences,} from "../../services/userPreferencesService";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../contexts/UserContext";

export default function FavoritesScreen() {

  const { theme } = useTheme();

  const [favorites, setFavorites] = useState<EarthNews[]>([]);
  const [username, setUsername] = useState("");
  const [treatment, setTreatment] = useState("Sr.");
  const { saveProfile } = useUser();

  async function handleSaveProfile() {

    try {

      await saveProfile(
          username,
          treatment
      );

      Alert.alert(
        "Sucesso",
        "Perfil salvo com sucesso."
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar o perfil."
      );

    }
  }

  function confirmClearPreferences() {

    Alert.alert(
      "Confirmar ação",

      "Você tem certeza?\n\nAo confirmar, você concorda em limpar:\n\n• Cidade analisada\n• Notícias favoritas\n• Nome de usuário\n• Tratamento\n• Tema",

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

              setFavorites([]);

              setUsername("");

              setTreatment("Sr.");

              Alert.alert(
                "Sucesso",
                "Preferências removidas."
              );

            } catch (error) {

              console.log(
                "Erro ao limpar cache",
                error
              );

            }

          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {

      async function loadData() {

        const favoritesData =
          await getFavorites();

        setFavorites(
          favoritesData
        );

        const preferences =
          await getUserPreferences();

        setUsername(
          preferences.username
        );

        setTreatment(
          preferences.treatment
        );

      }

      loadData();

    }, [])
  );

  return (

    <View
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor:
          theme.background,
      }}
    >

      <View
        style={{
          width: "100%",
        }}
      >

        {/* PERFIL */}

        <View
          style={{
            padding: 15,

            borderRadius: 10,

            marginBottom: 15,

            backgroundColor:
              theme.card,
          }}
        >

          <Text
            style={{
              color: theme.text,
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Perfil
          </Text>

          <Text
            style={{
              color: theme.text,
              marginBottom: 8,
            }}
          >
            Tratamento
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginBottom: 15,
            }}
          >

            {
              ["Sr.", "Sra.", "Dr.", "Dra."]
                .map(item => (

                  <Pressable
                    key={item}

                    onPress={() =>
                      setTreatment(item)
                    }

                    style={{
                      padding: 10,

                      borderRadius: 8,

                      backgroundColor:
                        treatment === item
                          ? theme.gradiente
                          : theme.background,
                    }}
                  >

                    <Text
                      style={{
                        color: theme.text,
                      }}
                    >
                      {item}
                    </Text>

                  </Pressable>

                ))
            }

          </View>

          <Text
            style={{
              color: theme.text,
              marginBottom: 8,
            }}
          >
            Nome de usuário
          </Text>

          <TextInput
            value={username}

            onChangeText={
              setUsername
            }

            placeholder="Digite seu nome"

            placeholderTextColor="gray"

            style={{
              borderWidth: 1,

              borderColor: "gray",

              borderRadius: 8,

              padding: 10,

              color: theme.text,
            }}
          />

          <Pressable
            onPress={
              handleSaveProfile
            }

            style={{
              marginTop: 15,

              padding: 12,

              borderRadius: 8,

              alignItems: "center",

              backgroundColor:
                theme.gradiente,
            }}
          >

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Salvar Perfil
            </Text>

          </Pressable>

        </View>

        {/* FAVORITOS */}
        <View style={{width: '100%', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <FlatList
            data={favorites}

            keyExtractor={
              item => item.id
            }

            renderItem={({ item }) => (
              <EarthNewsCard
                news={item}
              />
            )}

            ListEmptyComponent={

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 30,
                }}
              >

                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                  }}
                >
                  Nenhuma notícia favoritada
                </Text>

              </View>
            }
          />
          
        </View>

        {/* LIMPAR */}

        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >

          <Pressable
            onPress={
              confirmClearPreferences
            }
          >

            <Text
              style={{
                color: theme.text,

                textDecorationLine:
                  "underline",
              }}
            >
              Limpar preferências
            </Text>

          </Pressable>

        </View>

      </View>

    </View>

  );
}
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import { temporadas } from "@/data/temporadas";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Recetas from "@/components/Recetas";
import { useSQLiteContext } from "expo-sqlite";
import { getRecipesBySeason } from "@/lib/recipes-db";
import type { Recipe } from "@/types/recipe";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SeasonScreen = () => {
  const db = useSQLiteContext();
  const { temporada } = useLocalSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const numTemporada = parseInt(temporada as string, 10); // Parse the temporada correctly

  const filteredTemporada = temporadas.find(
    (temp) => temp.temporada === numTemporada
  );

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!filteredTemporada) {
      return;
    }

    navigation.setOptions({
      title: `Temporada ${filteredTemporada.temporada}`,
    });
  }, [filteredTemporada, navigation]);

  useEffect(() => {
    let isMounted = true;

    const loadRecipes = async () => {
      if (Number.isNaN(numTemporada)) {
        setFilteredRecipes([]);
        setIsLoadingRecipes(false);
        return;
      }

      setIsLoadingRecipes(true);

      try {
        const recipes = await getRecipesBySeason(db, numTemporada);

        if (isMounted) {
          setFilteredRecipes(recipes);
        }
      } finally {
        if (isMounted) {
          setIsLoadingRecipes(false);
        }
      }
    };

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [db, numTemporada]);

  if (!filteredTemporada) {
    return null;
  }

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, width: wp(100) }}
      >
        <View style={styles.seasonInfo}>
          <Image
            source={filteredTemporada.imagen}
            style={styles.seasonImage}
            resizeMode="cover"
          />
          <Text style={styles.seasonTitle}>
            Temporada {filteredTemporada.temporada}
          </Text>
          <Text style={styles.seasonText}>
            Ganador: {filteredTemporada.ganador}
          </Text>
          <Text style={styles.seasonText}>
            Tercer Puesto: {filteredTemporada.tercer_puesto}
          </Text>
          <Text style={styles.seasonText}>Participantes:</Text>
          {filteredTemporada.participantes.map((participante, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: "blue",
                  borderRadius: 50,
                  width: hp(1),
                  height: hp(1),
                }}
              ></Text>
              <Text key={index} style={styles.participanteText}>
                {participante}
              </Text>
            </View>
          ))}
          <Text style={styles.seasonText2}>Resumen:</Text>
          <Text style={styles.seasonText}>{filteredTemporada.resumen}</Text>
          {isLoadingRecipes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#facc15" size="large" />
              <Text style={styles.loadingText}>Cargando recetas...</Text>
            </View>
          ) : (
            <Recetas meals={filteredRecipes} />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SeasonScreen;

const styles = StyleSheet.create({
  seasonInfo: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  seasonImage: {
    width: "100%",
    height: hp(32),
    borderRadius: 12,
  },
  seasonTitle: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "yellow",
    marginVertical: 10,
  },
  seasonText: {
    fontSize: hp(2.4),
    color: "white",
    marginVertical: 4,
  },
  seasonText2: {
    fontSize: hp(3),
    color: "white",
    marginTop: 10,
  },
  participanteText: {
    fontSize: hp(2),
    color: "white",
    marginLeft: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  loadingText: {
    color: "white",
    fontSize: hp(2),
    marginTop: 12,
  },
});

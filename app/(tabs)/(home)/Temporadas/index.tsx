import {
  ActivityIndicator,
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
import { AppBackground } from "@/components/AppBackground";
import { useAppTheme } from "@/hooks/useAppTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const SeasonScreen = () => {
  const db = useSQLiteContext();
  const { theme } = useAppTheme();
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
      headerShown: true,
      headerTitleAlign: "center",
      headerTintColor: theme.text,
      headerStyle: {
        backgroundColor:
          theme.mode === "light"
            ? "rgba(255,255,255,0.92)"
            : "rgba(17,24,39,0.92)",
      },
      headerTitleStyle: {
        fontWeight: "800",
      },
      headerShadowVisible: false,
    });
  }, [filteredTemporada, navigation, theme]);

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
    <AppBackground>
      <StatusBar barStyle={theme.statusBarStyle} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          <View
            style={[
              styles.seasonInfo,
              {
                backgroundColor: theme.surfaceStrong,
                borderColor: theme.border,
                shadowColor: theme.shadow,
              },
            ]}
          >
            <Image
              source={filteredTemporada.imagen}
              style={styles.seasonImage}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.seasonTitle,
                { color: theme.mode === "light" ? theme.tabBarActiveTint : theme.accent },
              ]}
            >
              Temporada {filteredTemporada.temporada}
            </Text>
            <Text style={[styles.seasonText, { color: theme.textMuted }]}>
              Ganador: <Text style={{ color: theme.text }}>{filteredTemporada.ganador}</Text>
            </Text>
            <Text style={[styles.seasonText, { color: theme.textMuted }]}>
              Tercer Puesto:{" "}
              <Text style={{ color: theme.text }}>{filteredTemporada.tercer_puesto}</Text>
            </Text>
            <Text style={[styles.seasonText, { color: theme.text }]}>
              Participantes:
            </Text>
            {filteredTemporada.participantes.map((participante, index) => (
              <View key={index} style={styles.participanteRow}>
                <View
                  style={[
                    styles.participanteDot,
                    { backgroundColor: theme.accent },
                  ]}
                />
                <Text style={[styles.participanteText, { color: theme.text }]}>
                  {participante}
                </Text>
              </View>
            ))}
            <Text style={[styles.seasonText2, { color: theme.text }]}>Resumen:</Text>
            <Text style={[styles.seasonText, { color: theme.textMuted }]}>
              {filteredTemporada.resumen}
            </Text>
            {isLoadingRecipes ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={theme.accent} size="large" />
                <Text style={[styles.loadingText, { color: theme.textMuted }]}>
                  Cargando recetas...
                </Text>
              </View>
            ) : (
              <Recetas meals={filteredRecipes} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
};

export default SeasonScreen;

const styles = StyleSheet.create({
  pageContent: {
    paddingBottom: 110,
    paddingHorizontal: 16,
    paddingTop: 10,
    width: wp(100),
  },
  seasonInfo: {
    padding: 16,
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },
  seasonImage: {
    width: "100%",
    height: hp(32),
    borderRadius: 12,
  },
  seasonTitle: {
    fontSize: hp(4),
    fontWeight: "bold",
    marginVertical: 10,
  },
  seasonText: {
    fontSize: hp(2.4),
    marginVertical: 4,
  },
  seasonText2: {
    fontSize: hp(3),
    marginTop: 10,
    fontWeight: "800",
  },
  participanteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 6,
  },
  participanteDot: {
    borderRadius: 50,
    width: hp(1),
    height: hp(1),
    marginRight: 10,
  },
  participanteText: {
    fontSize: hp(2),
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  loadingText: {
    fontSize: hp(2),
    marginTop: 12,
  },
});

import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { recipeData, recipeProps } from "@/data/recetario";
import { tempProps, temporadas } from "@/data/temporadas";

import React, { useLayoutEffect } from "react";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import Recetas from "@/components/Recetas";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {};

const index = (props: Props) => {
  const { temporada } = useLocalSearchParams();

  const numTemporada = parseInt(temporada as string, 10); // Parse the temporada correctly

  const filteredTemporada = temporadas.find(
    (temp) => temp.temporada === numTemporada
  );

  if (!filteredTemporada) {
    return null;
  }

  const filteredRecipes = recipeData.filter(
    (recipe) => recipe.temporada === numTemporada
  );
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Temporada ${filteredTemporada.temporada}`,
    });
  }, [navigation, filteredTemporada.temporada]);

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      {/* <Stack screenOptions={{}}>
        <Stack.Screen name={`Temporada ${filteredTemporada.temporada}`} />
      </Stack> */}
      <StatusBar barStyle={"dark-content"} />
      {/* <SafeAreaView> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.seasonInfo}>
          {/* <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 w-14 rounded-full ml-5 bg-white-500 absolute top-12 left-12"
            >
              <ChevronLeftIcon
                size={hp(3.5)}
                strokeWidth={4.5}
                color="#fbbf24"
              />
            </TouchableOpacity> */}
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
          <Recetas meals={filteredRecipes} />
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  seasonInfo: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    marginBottom: 16,
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
});

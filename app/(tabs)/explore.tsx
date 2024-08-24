import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";

import Recetas from "@/components/Recetas";

import { foodData, foodDataProps } from "@/data"; // Asegúrate de importar el arreglo de recetas

// import Loading from "../components/Loading";

// import { debounce } from "lodash";

import { debounce } from "lodash";
// import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SearchScreen = (props: any) => {
  const router = useRouter();

  const [results, setResults] = useState<foodDataProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [filteredRecipes, setFilteredRecipes] = useState<foodDataProps[]>([]);

  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      const filteredRecipes = foodData.filter((recipe) =>
        recipe.nombre_receta.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredRecipes);
    } else {
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <SafeAreaView className=" flex-1 pt-4">
        <View className="mx-4 pl-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ">
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Buscar Recetas"
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-6 text-base font-semibold text-yellow-500 tracking-wider flex-1 "
          />
          <TouchableOpacity
            onPress={() => {
              router.push("/(home)");
            }}
            className="rounded-full p-3 m-1 bg-neutral-500"
          >
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
        </View>

        {/* results */}

        {/* {loading ? (
        // <Loading />
        <View>
          <Text> Cargando </Text>
        </View>
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1 ">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/images/moviePoster2.png")}
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1 ">
                    {item?.title.length > 22
                      ? item?.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center ">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )} */}

        {results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1 ">
              Resultados ({results.length})
            </Text>
            <Recetas meals={results} />
          </ScrollView>
        ) : (
          <View className="flex-row justify-center ">
            <Image
              source={require("@/assets/images/logo.png")}
              className="h-96 w-96"
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

// crea los estilos
const styles = StyleSheet.create({
  logoContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;

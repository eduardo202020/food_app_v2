import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";

// import Loading from "../components/Loading";

// import { debounce } from "lodash";

import { debounce } from "lodash";
// import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const SearchScreen = (props: any) => {
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: any) => {
    console.log("value : ", value);
    // if (value && value.length > 2) {
    //   setLoading(true);
    //   searchMovies({
    //     query: value,
    //     include_adult: "false",
    //     language: "en-US",
    //     page: "1",
    //   }).then((data) => {
    //     setLoading(false);
    //     // console.log("got movies: ", data);
    //     if (data && data.results) {
    //       setResults(data.results);
    //     }
    //   });
    // } else {
    //   setLoading(false);
    //   setResults([]);
    // }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 pt-4">
      <View className="mx-4 pl-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Buscar Recetas"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 text-base font-semibold text-yellow-500 tracking-wider flex-1 "
        />
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home")}
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
      <View className="flex-row justify-center ">
        <Image
          source={require("../../assets/images/logo_Chef.png")}
          className="h-96 w-96"
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

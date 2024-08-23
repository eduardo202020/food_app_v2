import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { foodData, foodDataProps } from "@/data";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeftIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import YouTubeIframe from "react-native-youtube-iframe";

const RecipeDetail = () => {
  const { slug } = useLocalSearchParams();
  const recipe = foodData.find((r) => r.slug === slug);
  const [isFavourite, setIsFavourite] = useState(false);

  const router = useRouter();

  if (!recipe) {
    return (
      <View>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  const getYoutubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      <SafeAreaView>
        {/* <Stack.Screen
          options={{
            headerShown: true,
            title: recipe.nombre_receta,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#B89C00", // Cambia este valor por el color de tu app
            },
            headerTintColor: "#FFFFFF", // Color del texto del encabezado
          }}
        /> */}

        {/* Recipe image */}
        <View className="flex-row justify-center">
          <Image
            source={{ uri: recipe.media[0] }}
            style={{
              width: "100%",
              height: hp(25),
              borderRadius: 53,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              marginTop: 4,
              resizeMode: "cover",
            }}
          />
        </View>

        {/* Back and Favorite buttons */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-14"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full ml-5 bg-white"
          >
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            className="p-2 rounded-full mr-5 bg-white"
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavourite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Meal description */}
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* Name and Area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipe.nombre_receta}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipe.tipo}
            </Text>
          </Animated.View>

          {/* Miscellaneous information */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {Object.keys(recipe.ingredientes).map((key) => (
                <View key={key} className="space-y-1">
                  <Text
                    style={{ fontSize: hp(1.7) }}
                    className="font-bold text-neutral-700"
                  >
                    {key}
                  </Text>
                  {recipe.ingredientes[key].map((ingredient, i) => (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {ingredient}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            {Object.keys(recipe.preparacion).map((key) => (
              <View key={key} className="space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  {key}
                </Text>
                {recipe.preparacion[key].map((step, i) => (
                  <Text
                    key={i}
                    style={{ fontSize: hp(1.6) }}
                    className="text-neutral-700"
                  >
                    {step.texto}
                  </Text>
                ))}
              </View>
            ))}
          </Animated.View>

          {/* Recipe Video */}
          {recipe.media[1] && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                {/* <YouTubeIframe
                  videoId={getYoutubeVideoId(recipe.media[1])}
                  height={hp(30)}
                /> */}
              </View>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RecipeDetail;

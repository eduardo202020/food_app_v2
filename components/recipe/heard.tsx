import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import {
  ChevronLeftIcon,
  HeartIcon,
  BoltIcon,
  FireIcon,
  UsersIcon,
  Square3Stack3DIcon,
  TvIcon,
} from "react-native-heroicons/outline";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useRoute } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

type Props = {
  img: string;
};

const Heard = (props: Props) => {
  const router = useRouter();

  const [isFavourite, setIsFavourite] = React.useState(false);

  return (
    <>
      <View className="flex-row justify-center" style={{ flex: 1 }}>
        <Image
          source={{ uri: props.img }}
          style={{
            width: "100%",
            height: hp(25),
            borderRadius: 53,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
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
          className="p-2 rounded-full ml-5 bg-white "
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
    </>
  );
};

export default Heard;

const styles = StyleSheet.create({});

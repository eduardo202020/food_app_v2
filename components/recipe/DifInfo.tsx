import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BoltIcon } from "react-native-heroicons/outline";
import {
  recipeData as foodData,
  recipeProps as foodDataProps,
} from "@/data/recetario_test";

type Props = {
  recipe: foodDataProps;
};

const getNumberDificultad = (value: string): number => {
  switch (value) {
    case "Fácil":
      return 1;
    case "Intermedio":
      return 2;
    case "Avanzado":
      return 3;
    case "Desafiante":
      return 4;
    default:
      return 0; // Or throw an error if you prefer
  }
};

const DifInfo = ({ recipe }: Props) => {
  return (
    <View className="flex rounded-full bg-amber-300 p-2">
      <View
        style={{ height: hp(6.5), width: hp(6.5) }}
        className="bg-white rounded-full flex items-center justify-center"
      >
        <BoltIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
      </View>
      <View className="flex items-center py-2 space-y-1">
        <Text
          style={{ fontSize: hp(2) }}
          className="font-bold text-neutral-700"
        >
          {getNumberDificultad(recipe.nivel_complejidad)}/4
        </Text>
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-bold text-neutral-700"
        >
          {recipe.nivel_complejidad}
        </Text>
      </View>
    </View>
  );
};

export default DifInfo;

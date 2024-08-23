import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

interface dificultadesProps {
  tipo: string;
}

const dificultades: dificultadesProps[] = [
  { tipo: "Fácil" },
  { tipo: "Intermedio" },
  { tipo: "Avanzado" },
  { tipo: "Desafiante" },
];

export default function Dificultades({
  activeDificultad,
  handleChangeDificultad,
}: {
  activeDificultad: string;
  handleChangeDificultad: (category: string) => void;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {dificultades.map((dif: dificultadesProps, index: number) => {
          let isActive = dif.tipo === activeDificultad;
          let backgroundColor = isActive ? "#FF6347" : "#E0E0E0"; // Ejemplo de colores (rojo tomate y gris claro)

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeDificultad(dif.tipo)}
              style={styles.touchableOpacity}
            >
              <View
                style={[
                  styles.imageContainer,
                  { backgroundColor: backgroundColor },
                ]}
              >
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: hp(1.6), color: "#4c4c4c" }}
                >
                  {dif.tipo}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(100),
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50, // Hace que la vista sea redonda
    padding: 6,
  },
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: 50, // Hace que la imagen sea redonda
  },
});

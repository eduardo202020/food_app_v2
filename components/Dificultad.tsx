import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "@/hooks/useAppTheme";

interface dificultadesProps {
  tipo: string;
}

export const dificultades: dificultadesProps[] = [
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
  const { theme } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {dificultades.map((dif: dificultadesProps, index: number) => {
          let isActive = dif.tipo === activeDificultad;
          let backgroundColor = isActive
            ? "rgba(250, 204, 21, 0.92)"
            : theme.mode === "dark"
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.92)";
          let textColor = isActive ? theme.accentTextOn : theme.text;
          let borderColor = isActive ? "rgba(250, 204, 21, 0.35)" : theme.border;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeDificultad(dif.tipo)}
              style={styles.touchableOpacity}
            >
              <View
                style={[
                  styles.imageContainer,
                  {
                    backgroundColor: backgroundColor,
                    borderColor,
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <Text
                  className="text-neutral-600"
                  style={{ fontSize: hp(1.8), color: textColor, fontWeight: "700" }}
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
    gap: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50, // Hace que la vista sea redonda
    padding: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: 50, // Hace que la imagen sea redonda
  },
});

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { categorias, categoriasProps } from "../data/categorias";
import { useAppTheme } from "@/hooks/useAppTheme";

export default function Categorias({
  activeCategory,
  handleChangeCategory,
}: {
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}) {
  const { theme } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categorias.map((cat: categoriasProps, index: number) => {
          let isActive = cat.tipo === activeCategory;
          let backgroundColor = isActive
            ? theme.accent
            : theme.mode === "dark"
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.92)";
          let borderColor = isActive
            ? "rgba(250, 204, 21, 0.35)"
            : theme.mode === "dark"
              ? theme.border
              : "rgba(15, 23, 42, 0.08)";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.tipo)}
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
                <Image source={cat.imagen} style={styles.image} />
              </View>
              <Text style={{ fontSize: hp(1.7), color: theme.text }}>
                {cat.tipo}
              </Text>
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
    gap: 8,
    paddingBottom: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50, // Hace que la vista sea redonda
    padding: 6,
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
    backgroundColor: "transparent",
    resizeMode: "contain",
  },
});

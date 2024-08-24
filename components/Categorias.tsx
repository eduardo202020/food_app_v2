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
import { categorias, categoriasProps } from "../data/categorias";

export default function Categorias({
  activeCategory,
  handleChangeCategory,
}: {
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categorias.map((cat: categoriasProps, index: number) => {
          let isActive = cat.tipo === activeCategory;
          let backgroundColor = isActive ? "#E4A800" : "#E0E0E0"; // Ejemplo de colores (rojo tomate y gris claro)

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.tipo)}
              style={styles.touchableOpacity}
            >
              <View
                style={[
                  styles.imageContainer,
                  { backgroundColor: backgroundColor },
                ]}
              >
                <Image source={cat.imagen} style={styles.image} />
              </View>
              <Text style={{ fontSize: hp(1.7), color: "white" }}>
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

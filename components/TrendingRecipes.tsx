import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { foodDataProps } from "../data";

const { width, height } = Dimensions.get("window");

interface RecipeCardProps {
  item: foodDataProps;
  handleClick: () => void;
}

// Función para determinar el color del fondo según el tipo de receta
const getBackgroundColor = (type: string) => {
  switch (type) {
    case "Carne":
      return "#D32F2F";
    case "Entrada":
      return "#4CAF50";
    case "Internacional":
      return "#7B1FA2";
    case "Marisco":
      return "#1976D2";
    case "Vegetariano":
      return "#388E3C";
    case "Pastas y Arroces":
      return "#FFA000";
    case "Postre":
      return "#E91E63";
    default:
      return "#B89C00";
  }
};

const RecipeCard = ({ item, handleClick }: RecipeCardProps) => (
  <Pressable onPress={handleClick} style={{ paddingBottom: 15 }}>
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: getBackgroundColor(item.tipo) },
      ]}
    >
      <Image source={{ uri: item.media[0] }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nombre_receta}</Text>
        <Text style={styles.cardSubtitle}>{`Tipo: ${item.tipo}`}</Text>
        <Text
          style={styles.cardSubtitle}
        >{`Nivel: ${item.nivel_complejidad}`}</Text>
      </View>
    </View>
  </Pressable>
);

const TrendingRecipes = ({ data }: { data: foodDataProps[] }) => {
  const isCarousel = React.useRef(null);

  const handleClick = (item: foodDataProps) => {
    // navigation.navigate("RecipeDetail", item);
    // console.log(item);

    alert(item.media[0] + item.tipo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas Favoritas:</Text>

      <Carousel
        data={data}
        renderItem={({ item }: { item: foodDataProps }) => (
          <RecipeCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideScale={0.8}
        sliderWidth={width}
        itemWidth={width * 0.7}
        slideStyle={styles.slideStyle}
        vertical={false}
        ref={isCarousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    color: "black",
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#B89C00",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // marginRight: 6,
    // marginHorizontal: 15,
    // borderColor: "black",
    // borderWidth: 2,
    elevation: 14,
  },
  cardImage: {
    width: "110%",
    height: 140,
    resizeMode: "cover",
    position: "relative",
    // left: -80,
  },
  cardContent: {
    padding: 20,
    paddingBottom: 10,
    overflow: "hidden",
    position: "relative",
    paddingTop: 10,
    // borderWidth: 2, // Grosor del borde
    // borderColor: "red", // Color del borde
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "white",
    fontSize: 14,
  },
  slideStyle: {
    display: "flex",
    alignItems: "center",
    elevation: 5,
    marginHorizontal: 10,
    marginLeft: -8,
  },
});

export default TrendingRecipes;

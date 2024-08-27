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
// import { foodDataProps } from "../data";
import { recipeProps as foodDataProps } from "@/data/recetario_test";

import { tempProps, temporadas } from "@/data/temporadas";
import { router, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface RecipeCardProps {
  item: tempProps;
  handleClick: () => void;
}

const RecipeCard = ({ item, handleClick }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <Pressable onPress={handleClick} style={{ paddingBottom: 15 }}>
      <View style={[styles.cardContainer]}>
        <Image source={item.imagen} style={styles.cardImage} />
      </View>
    </Pressable>
  );
};

const TrendingRecipes = () => {
  const isCarousel = React.useRef(null);

  const handleClick = (item: tempProps) => {
    // alert(item.temporada);
    router.push({
      pathname: "/(home)/Temporadas/",
      params: { temporada: item.temporada },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temporadas:</Text>

      <Carousel
        data={temporadas}
        renderItem={({ item }: { item: tempProps }) => (
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
    color: "white",
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // marginRight: 6,
    // marginHorizontal: 15,
    borderColor: "black",
    borderWidth: 2,
    elevation: 20,
    width: width * 0.7,
    height: height * 0.3,
  },
  cardImage: {
    width: "100%",
    // height: "100%",
    // width: width * 0.7,
    height: height * 0.3,
    resizeMode: "cover",
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

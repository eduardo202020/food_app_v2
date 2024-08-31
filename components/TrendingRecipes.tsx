import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import { tempProps, temporadas } from "@/data/temporadas";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

interface RecipeCardProps {
  item: tempProps;
  onPress: () => void;
}

const RecipeCard = ({ item, onPress }: RecipeCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingBottom: 15 }}>
      <View style={[styles.cardContainer]}>
        <Image source={item.imagen} style={styles.cardImage} />
      </View>
    </TouchableOpacity>
  );
};

const TrendingRecipes = () => {
  const router = useRouter();
  const isCarousel = React.useRef(null);

  // Memorizar la función de click
  const handleClick = useCallback(
    (temporada: number) => {
      router.push({
        pathname: "/(home)/Temporadas/",
        params: { temporada },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temporadas:</Text>

      <Carousel
        data={temporadas}
        renderItem={({ item }: { item: tempProps }) => (
          <RecipeCard item={item} onPress={() => handleClick(item.temporada)} />
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
    borderColor: "black",
    borderWidth: 2,
    elevation: 20,
    width: width * 0.7,
    height: height * 0.3,
  },
  cardImage: {
    width: "100%",
    height: height * 0.3,
    resizeMode: "cover",
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

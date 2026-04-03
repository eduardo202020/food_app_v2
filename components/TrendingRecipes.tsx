import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import { tempProps, temporadas } from "@/data/temporadas";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

const { width, height } = Dimensions.get("window");

interface RecipeCardProps {
  item: tempProps;
  onPress: () => void;
  surfaceStyle?: object;
}

const RecipeCard = ({ item, onPress, surfaceStyle }: RecipeCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingBottom: 15 }}>
      <View style={[styles.cardContainer, surfaceStyle]}>
        <Image source={item.imagen} style={styles.cardImage} />
      </View>
    </TouchableOpacity>
  );
};

const TrendingRecipes = () => {
  const router = useRouter();
  const isCarousel = React.useRef(null);
  const { theme } = useAppTheme();

  // Memorizar la función de click
  const handleClick = useCallback(
    (temporada: number) => {
      router.push({
        pathname: "/(tabs)/(home)/Temporadas",
        params: { temporada },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>

      <Carousel
        data={temporadas}
        renderItem={({ item }: { item: tempProps }) => (
          <RecipeCard
            item={item}
            onPress={() => handleClick(item.temporada)}
            surfaceStyle={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            }}
          />
        )}
        firstItem={0}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={1}
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
    marginTop: 6,
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
    backgroundColor: "rgba(17, 24, 39, 0.45)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
    width: width * 0.7,
    height: Math.min(height * 0.28, 260),
  },
  cardImage: {
    width: "100%",
    height: Math.min(height * 0.28, 260),
    resizeMode: "cover",
  },
  slideStyle: {
    display: "flex",
    alignItems: "center",
    elevation: 2,
    marginHorizontal: 10,
    marginLeft: 0,
  },
});

export default TrendingRecipes;

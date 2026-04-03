import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import type { Recipe } from '@/types/recipe';
import { RecipeCard } from './RecipeCard';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function Recetas({ meals }: { meals: Recipe[] }) {
  const { theme } = useAppTheme();

  return (
    meals.length === 0 ? (
      <Text style={[styles.noRecipesText, { color: theme.textMuted }]}>
        Ninguna Receta Guardada.
      </Text>
    ) : (
      <MasonryList
        data={meals}
        keyExtractor={(item: Recipe) => item.slug}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item, i }: { item: unknown; i: number }) => (
          <RecipeCard item={item as Recipe} index={i} />
        )}
        onEndReachedThreshold={0.1}
      />
    )
  );
}

// export const RecipeCard = ({
//   item,
//   index,
// }: {
//   item: foodDataProps;
//   index: number;
// }) => {
//   const router = useRouter();
//   return (
//     <Animated.View
//       entering={FadeInDown.delay(index * 100)
//         .duration(600)
//         .springify()
//         .damping(12)}
//     >
//       <TouchableOpacity
//         style={styles.recipeCard}
//         onPress={() => {
//           router.push(`/(home)/${item.slug}`);
//         }}
//       >
//         <Image
//           cachePolicy="disk"
//           source={{ uri: item.media[0] }}
//           style={styles.recipeImage}
//           contentFit="cover"
//           placeholder={require("@/assets/images/action/plato.jpg")}
//           transition={1000}
//         />
//         <Text style={styles.recipeTitle}>{item.nombre_receta}</Text>
//         <View style={styles.containerText}>
//           <Text style={styles.recipeTipo}>
//             <Text style={{ color: "yellow", fontWeight: "bold" }}>Tipo: </Text>
//             {item.tipo}
//           </Text>
//           <Text style={styles.recipeDificultad}>
//             <Text style={{ color: "yellow", fontWeight: "bold" }}>Nivel: </Text>
//             {item.nivel_complejidad}
//           </Text>
//           <Text style={styles.recipeDificultad}>
//             <Text style={{ color: "yellow", fontWeight: "bold" }}>Ep: </Text>
//             {item.episodio}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

const styles = StyleSheet.create({
  content: {
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
    color: 'white',
  },
  noRecipesText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    fontSize: 18,
  },
  recipeCard: {
    flex: 1,
    marginBottom: 16,
    paddingBottom: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.60)',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    backgroundColor: '#0b1220',
  },
  recipeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
  },
  recipeTipo: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  recipeDificultad: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TrendingRecipes from '@/components/TrendingRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import Categorias from '@/components/Categorias';
import Dificultades from '@/components/Dificultad';

import { RecipeCard } from '@/components/RecipeCard';
import { getRecipes } from '@/lib/recipes-db';
import type { Recipe } from '@/types/recipe';

import * as SplashScreen from 'expo-splash-screen';

const HomeScreen = () => {
  const db = useSQLiteContext();
  const whatsappUrl = 'https://wa.me/51991004126';

  // Estado para la categoría activa y las recetas filtradas
  const [activeCategory, setActiveCategory] = useState<string>('Todo');

  // Estado para la dificultad activa y las recetas filtradas
  const [activeDificultad, setActiveDificultad] = useState<string>('Todo');

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  // Prevent the splash screen from hiding automatically
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Función para manejar el cambio de dificultad
  const handleDificultad = (dificultad: string) => {
    const newDificultad = activeDificultad === dificultad ? 'Todo' : dificultad;
    setActiveDificultad(newDificultad);
  };

  // Función para manejar el cambio de categoría
  const handleChangeCategory = (category: string) => {
    const newCategory = activeCategory === category ? 'Todo' : category;
    setActiveCategory(newCategory);
  };

  useEffect(() => {
    let isMounted = true;

    const loadRecipes = async () => {
      setIsLoadingRecipes(true);

      try {
        const recipes = await getRecipes(db, {
          category: activeCategory,
          difficulty: activeDificultad,
        });

        if (isMounted) {
          setFilteredRecipes(recipes);
        }
      } finally {
        if (isMounted) {
          setIsLoadingRecipes(false);
        }
      }
    };

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, activeDificultad, db]);

  useEffect(() => {
    const prepareScreen = async () => {
      await SplashScreen.hideAsync();
    };

    prepareScreen();
  }, []);

  const handleWhatsAppPress = async () => {
    const supported = await Linking.canOpenURL(whatsappUrl);

    if (supported) {
      await Linking.openURL(whatsappUrl);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/madera4.jpg')}
      style={{ flex: 1 }}
      width={100}
    >
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView>
        <View className="pb-4 flex-row justify-between items-center mx-4 border-solid border-b-stone-900 ">
          <TouchableOpacity onPress={handleWhatsAppPress}>
            <FontAwesome name="whatsapp" size={28} color="#25D366" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>E</Text>l{' '}
            <Text style={styles.text}>G</Text>ran{' '}
            <Text style={styles.text}>C</Text>hef
          </Text>
          <TouchableOpacity>
            <FontAwesome name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredRecipes}
          renderItem={({ item, index }) => (
            <RecipeCard
              item={item}
              index={index + item.episodio + item.temporada}
            />
          )}
          keyExtractor={(item) =>
            item.nombre_receta + item.temporada + item.episodio
          }
          ListHeaderComponent={
            <View>
              {/* Recetas filtradas */}
              <TrendingRecipes />

              {/* Dificultades */}
              <Dificultades
                activeDificultad={activeDificultad}
                handleChangeDificultad={handleDificultad}
              />

              {/* Categorías */}
              <Categorias
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />

              {isLoadingRecipes ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#facc15" size="large" />
                  <Text style={styles.loadingText}>Cargando recetas...</Text>
                </View>
              ) : null}
            </View>
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

// crea los estilos
const styles = StyleSheet.create({
  text: {
    color: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 12,
  },
});

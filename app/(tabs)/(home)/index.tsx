import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import TrendingRecipes from '@/components/TrendingRecipes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Categorias from '@/components/Categorias';
import Dificultades from '@/components/Dificultad';

import { RecipeCard } from '@/components/RecipeCard';
import { getRecipes } from '@/lib/recipes-db';
import type { Recipe } from '@/types/recipe';
import { AppBackground } from '@/components/AppBackground';
import { useAppTheme } from '@/hooks/useAppTheme';

const HomeScreen = () => {
  const db = useSQLiteContext();
  const portfolioUrl = 'https://portafolio-tech-eight.vercel.app/';
  const { mode, theme, toggleMode } = useAppTheme();

  // Estado para la categoría activa y las recetas filtradas
  const [activeCategory, setActiveCategory] = useState<string>('Todo');

  // Estado para la dificultad activa y las recetas filtradas
  const [activeDificultad, setActiveDificultad] = useState<string>('Todo');

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

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

  const handlePortfolioPress = async () => {
    const supported = await Linking.canOpenURL(portfolioUrl);

    if (supported) {
      await Linking.openURL(portfolioUrl);
    }
  };

  return (
    <AppBackground>
      <StatusBar barStyle={theme.statusBarStyle} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          className="flex-row justify-between items-center mx-4"
          style={[
            styles.headerSurface,
            {
              backgroundColor:
                theme.mode === 'light' ? 'rgba(255,255,255,0.92)' : theme.surface,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <TouchableOpacity onPress={handlePortfolioPress}>
            <FontAwesome name="whatsapp" size={28} color="#25D366" />
          </TouchableOpacity>
          <Text
            style={[styles.title, { color: theme.text }]}
          >
            <Text style={[styles.titleAccent, { color: theme.accent }]}>E</Text>l{' '}
            <Text style={[styles.titleAccent, { color: theme.accent }]}>G</Text>ran{' '}
            <Text style={[styles.titleAccent, { color: theme.accent }]}>C</Text>hef
          </Text>
          <TouchableOpacity onPress={toggleMode} accessibilityRole="button">
            <Ionicons
              name={mode === 'dark' ? 'sunny' : 'moon'}
              size={24}
              color={theme.text}
            />
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) =>
            item.nombre_receta + item.temporada + item.episodio
          }
          ListHeaderComponent={
            <View style={styles.listHeader}>
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
    </AppBackground>
  );
};

export default HomeScreen;

// crea los estilos
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    includeFontPadding: false,
  },
  titleAccent: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    includeFontPadding: false,
  },
  headerSurface: {
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    borderWidth: 0,
  },
  listHeader: {
    paddingTop: 10,
    paddingBottom: 6,
    gap: 10,
  },
  listContent: {
    paddingBottom: 110,
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

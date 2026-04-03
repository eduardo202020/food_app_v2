import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ImageBackground,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import {
  ChevronLeftIcon,
  BoltIcon,
  UsersIcon,
  TvIcon,
} from 'react-native-heroicons/outline';

import { HeartIcon } from 'react-native-heroicons/solid';

interface RecipeStep {
  title: string;
  stepNumber: number;
  totalSteps: number;
  texto: string;
  verbosClave: string[];
}

import { useIsRecipeLiked } from '@/hooks/useIsRecipeLiked';
import { useLikedRecipes } from '@/hooks/useLikedRecipes';

import { categorias } from '@/data/categorias';

import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { WebView } from 'react-native-webview';

import { glosario } from '@/data/glosario';
import { getRecipeBySlug } from '@/lib/recipes-db';
import type { Recipe } from '@/types/recipe';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const getNumberDificultad = (value: string): number => {
  switch (value) {
    case 'Fácil':
      return 1;
    case 'Intermedio':
      return 2;
    case 'Avanzado':
      return 3;
    case 'Desafiante':
      return 4;
    default:
      return 0;
  }
};

const getCategoryImage = (value: string): any => {
  const category = categorias.find((cat) => cat.tipo === value);
  return category ? category.imagen : categorias[6].imagen;
};

const RecipeDetail = () => {
  const db = useSQLiteContext();
  const { slug } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleGlosary, setModalVisibleGlosary] = useState(false);

  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<
    string | null
  >(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(
    null
  );
  const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadRecipe = async () => {
      if (typeof slug !== 'string') {
        if (isMounted) {
          setRecipe(null);
          setIsLoadingRecipe(false);
        }
        return;
      }

      setIsLoadingRecipe(true);

      try {
        const loadedRecipe = await getRecipeBySlug(db, slug);

        if (isMounted) {
          setRecipe(loadedRecipe);
        }
      } finally {
        if (isMounted) {
          setIsLoadingRecipe(false);
        }
      }
    };

    loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [db, slug]);

  const handleGlossaryClick = (term: string) => {
    const definition = glosario.find((item) => item[term]);
    if (definition) {
      setSelectedGlossaryTerm(term);
      setSelectedDefinition(definition[term]);
      setModalVisibleGlosary(true);
    }
  };

  const colorStatusBar = modalVisible || modalVisibleGlosary ? '#00000080' : '';

  const handleOpenSteps = () => {
    if (!recipe) {
      return;
    }

    const stepsArray: any = [];
    Object.keys(recipe.preparacion).forEach((key) => {
      recipe.preparacion[key].forEach((step, index) => {
        stepsArray.push({
          title: key,
          texto: step,
          stepNumber: index + 1,
          totalSteps: recipe.preparacion[key].length,
        });
      });
    });
    setRecipeSteps(stepsArray);
    setCurrentStep(0);
    setModalVisible(true);
  };
  const handleNextStep = () => {
    if (currentStep < recipeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // manejo de favoritos
  const { likeRecipe, unlikeRecipe } = useLikedRecipes();
  const isInitiallyLiked = useIsRecipeLiked(recipe?.nombre_receta ?? '');

  // Estado para manejar si la receta está en favoritos
  const [isLiked, setIsLiked] = useState(false);

  // Efecto para actualizar `isLiked` cuando cambie la lista de recetas que te gustan
  useEffect(() => {
    setIsLiked(isInitiallyLiked);
  }, [isInitiallyLiked]);

  const handleLiked = () => {
    if (!recipe) {
      return;
    }

    if (isLiked) {
      unlikeRecipe(recipe.nombre_receta);
    } else {
      likeRecipe(recipe.nombre_receta);
    }
    setIsLiked(!isLiked); // Actualiza el estado local inmediatamente
  };

  if (isLoadingRecipe) {
    return (
      <ImageBackground
        source={require('@/assets/images/madera4.jpg')}
        style={{ flex: 1 }}
        width={100}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator color="#facc15" size="large" />
          <Text style={styles.loadingText}>Cargando receta...</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (!recipe) {
    return (
      <ImageBackground
        source={require('@/assets/images/madera4.jpg')}
        style={{ flex: 1 }}
        width={100}
      >
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No se encontraron recetas.</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/images/madera4.jpg')}
      style={{ flex: 1 }}
      width={100}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          // className="bg-white flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <StatusBar backgroundColor={colorStatusBar} />

          {/* Meal image */}
          <View className="flex-row justify-center" style={{ flex: 1 }}>
            <Image
              source={{ uri: recipe.media[0] }}
              style={{
                width: '100%',
                height: hp(25),
                borderRadius: 53,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                resizeMode: 'cover',
              }}
              cachePolicy={'disk'}
              contentFit="cover"
              placeholder={require('@/assets/images/action/plato.jpg')}
              transition={1000}
            />
          </View>
          {/* Back and Favorite buttons */}
          <Animated.View
            entering={FadeIn.delay(200).duration(1000)}
            className="w-full absolute flex-row justify-between items-center pt-14"
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full ml-5 bg-white "
            >
              <ChevronLeftIcon
                size={hp(3.5)}
                strokeWidth={4.5}
                color="#fbbf24"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLiked()}
              className="p-2 rounded-full mr-5 bg-white"
            >
              <HeartIcon
                size={hp(3.5)}
                strokeWidth={4.5}
                color={isLiked ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Meal description */}
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* Name and Area */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              className="space-y-2"
            >
              <Text
                style={{ fontSize: hp(3.6) }}
                className="font-bold flex-1 text-white"
              >
                {recipe.nombre_receta}
              </Text>
            </Animated.View>

            {/* Miscellaneous information */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <BoltIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    {getNumberDificultad(recipe.nivel_complejidad)}/4
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.5) }}
                    className="font-bold text-neutral-700"
                  >
                    {recipe.nivel_complejidad}
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    04
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.5) }}
                    className="font-bold text-neutral-700"
                  >
                    Porciones
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Image
                    source={getCategoryImage(recipe.tipo)}
                    style={styles.image}
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-bold text-neutral-700"
                  >
                    {recipe.tipo.slice(0, 8)}
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <TvIcon size={hp(5)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Temporada
                  </Text>
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    {recipe.temporada}
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Ingredients */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4 "
            >
              <Text
                style={{ fontSize: hp(3.2) }}
                className="font-bold flex-1 text-white"
              >
                Ingredientes:
              </Text>
              <View className="space-y-2 ml-3 mb-4 ">
                {Object.keys(recipe.ingredientes).map((key) => (
                  <View key={key} className="space-y-1">
                    <Text
                      style={{ fontSize: hp(2.5), paddingBottom: 4 }}
                      className="font-bold text-white"
                    >
                      {key == 'ingredientes' ? '' : key}
                    </Text>
                    {recipe.ingredientes[key].map((ingredient, i) => (
                      <View key={i} className="flex-row space-x-4 ">
                        <View
                          style={{ height: hp(1.5), width: hp(1.5) }}
                          className="bg-amber-300 rounded-full"
                        />
                        <Text
                          style={{ fontSize: hp(2.2) }}
                          className="font-medium text-white"
                        >
                          {ingredient}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </Animated.View>

            {/* Instructions */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(3.2) }}
                className="font-bold flex-1 text-white"
              >
                Instrucciones:
              </Text>
              {Object.keys(recipe.preparacion).map((key) => (
                <View
                  key={key}
                  className="space-y-1"
                  style={{
                    borderRadius: 8,
                    backgroundColor: 'rgba(10, 10, 10, 0.4)',
                    paddingHorizontal: 4,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: hp(2.5) }}
                    className="font-bold text-white"
                  >
                    {key == 'pasos' ? '' : key}
                  </Text>
                  {recipe.preparacion[key].map((step, i) => (
                    <Text
                      key={i}
                      style={{ fontSize: hp(2.2), marginBottom: 4 }}
                      className="text-white"
                    >
                      {/* {step.texto} */}
                      {step}
                    </Text>
                  ))}
                </View>
              ))}
            </Animated.View>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(500)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  style={{ fontSize: hp(3) }}
                  className="font-bold flex-1 text-white"
                >
                  Tips:
                </Text>
                <View style={styles.tipCard}>
                  {recipe.tips.map((tip, index) => (
                    <View key={index} style={styles.bulletPointContainerTips}>
                      <View style={styles.bulletPointTips} />
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}

            {/* Glosario */}

            {/* Glossary Section */}
            {recipe.glosario.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  style={{ fontSize: hp(3.2) }}
                  className="font-bold flex-1 text-white"
                >
                  Glosario:
                </Text>
                <View className="space-y-2" style={{ width: '100%' }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                  >
                    {recipe.glosario.map((term, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleGlossaryClick(term)}
                        style={styles.touchableOpacity}
                      >
                        <View style={[styles.imageContainer]}>
                          <Text
                            className="text-neutral-600"
                            style={{ fontSize: hp(1.8), color: '#007AFF' }}
                          >
                            {term}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Animated.View>
            )}

            {/* Recipe Videos */}
            {recipe.media.length > 1 && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  style={{ fontSize: hp(3.1) }}
                  className="font-bold flex-1 text-white"
                >
                  Videos
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                >
                  {recipe.media.slice(1).map((url, index) => {
                    // const videoId = extractVideoId(url);

                    if (!url) return null;

                    const embedUrl = `https://www.youtube.com/embed/${url}`;
                    return (
                      <View key={index} style={styles.videoContainer}>
                        <WebView
                          style={styles.webView}
                          javaScriptEnabled={true}
                          source={{ uri: embedUrl }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </Animated.View>
            )}
          </View>
          {/* Modal */}
          {/* Glossary Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleGlosary}
            onRequestClose={() => setModalVisibleGlosary(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedGlossaryTerm}</Text>
                <Text style={styles.modalText}>{selectedDefinition}</Text>
                <TouchableOpacity
                  onPress={() => setModalVisibleGlosary(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            const firstPreparationKey = Object.keys(recipe.preparacion)[0];
            const stepsArray = recipe.preparacion[firstPreparationKey];
            handleOpenSteps();
          }}
        >
          <Image
            source={require('@/assets/images/cook.png')}
            style={{ width: 45, height: 45, padding: 10 }}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {recipeSteps[currentStep]?.title == 'pasos'
                  ? 'Instrucciones:'
                  : recipeSteps[currentStep]?.title}
              </Text>
              <Text style={styles.modalTextTitle}>
                Paso {recipeSteps[currentStep]?.stepNumber} de{' '}
                {recipeSteps[currentStep]?.totalSteps}
              </Text>
              <Text style={styles.modalText}>
                {recipeSteps[currentStep]?.texto ||
                  'No hay información disponible'}
              </Text>
              <View style={styles.stepNavigation}>
                <TouchableOpacity
                  onPress={handlePreviousStep}
                  disabled={currentStep === 0}
                  style={[
                    styles.stepButton,
                    currentStep === 0 && styles.disabledButton,
                  ]}
                >
                  <Text style={styles.stepButtonText}>Anterior</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleNextStep}
                  disabled={currentStep === recipeSteps.length - 1}
                  style={[
                    styles.stepButton,
                    currentStep === recipeSteps.length - 1 &&
                      styles.disabledButton,
                  ]}
                >
                  <Text style={styles.stepButtonText}>Siguiente</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: hp(2.2),
    marginTop: 12,
  },
  videoContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    marginRight: 10,
  },
  webView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipCard: {
    backgroundColor: 'rgba(96, 32, 32, 0.5)',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  tipText: {
    fontSize: hp(2),
    color: 'white',
  },

  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50,
    padding: 6,
    backgroundColor: '#E0E0E0',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#fbbf24',
    width: 65,
    height: 65,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: hp(2.2),
    marginBottom: 20,
    textAlign: 'left',
  },
  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  stepButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  stepButtonText: {
    color: 'white',
    fontSize: hp(2),
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: hp(2),
  },
  modalTextTitle: {
    fontSize: hp(2),
    marginBottom: 10,
  },

  verbosClaveContainer: {
    marginTop: 15,
    marginBottom: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bulletPointContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
    alignContent: 'space-between',
    marginBottom: 8,
  },

  verbosClaveText: {
    fontSize: hp(2),
    color: '#525252',
    marginBottom: 8,
  },
  bulletPoint: {
    width: hp(1),
    height: hp(1),
    borderRadius: 50,
    backgroundColor: '#007AFF',
    top: 8,
    marginRight: 4,
  },
  bulletPointContainerTips: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPointTips: {
    width: hp(1),
    height: hp(1),
    borderRadius: 50,
    backgroundColor: '#007AFF',
    top: 8,
    marginRight: 4,
  },
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: 50,
  },
});

export default RecipeDetail;

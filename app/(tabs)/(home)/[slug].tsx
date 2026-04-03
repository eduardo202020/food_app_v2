import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BoltIcon,
  UsersIcon,
  TvIcon,
  PlayIcon,
} from 'react-native-heroicons/outline';

import { HeartIcon } from 'react-native-heroicons/solid';
import { AppBackground } from '@/components/AppBackground';
import { useAppTheme } from '@/hooks/useAppTheme';

interface RecipeStep {
  title: string;
  stepNumber: number;
  totalSteps: number;
  texto: string;
  verbosClave: string[];
}

const formatTimer = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return `${mins}:${secs}`;
};

function getYouTubeVideoId(input: string): string | null {
  if (!input) return null;

  const trimmed = input.trim();

  // Already a YouTube id
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // YouTube thumbnail URL: https://img.youtube.com/vi/<id>/...
  const thumbMatch = trimmed.match(/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]{11})\//);
  if (thumbMatch?.[1]) return thumbMatch[1];

  // youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch?.[1]) return shortMatch[1];

  // youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch?.[1]) return watchMatch[1];

  // youtube.com/embed/<id> or /shorts/<id>
  const pathMatch = trimmed.match(
    /youtube\.com\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/
  );
  if (pathMatch?.[2]) return pathMatch[2];

  return null;
}

import { useIsRecipeLiked } from '@/hooks/useIsRecipeLiked';
import { useLikedRecipes } from '@/hooks/useLikedRecipes';

import { categorias } from '@/data/categorias';

import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import YoutubePlayer from 'react-native-youtube-iframe';

import { glosario } from '@/data/glosario';
import { getRecipeBySlug, getRelatedRecipes } from '@/lib/recipes-db';
import type { Recipe } from '@/types/recipe';
import { useKeepAwake } from 'expo-keep-awake';
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

const SectionCard = ({
  title,
  subtitle,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        {
          backgroundColor: theme.surfaceStrong,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={[
          styles.sectionHeader,
          {
            borderBottomColor: theme.border,
            borderBottomWidth: isExpanded ? 1 : 0,
          },
        ]}
      >
        <View style={styles.sectionHeaderText}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View
          style={[
            styles.sectionIconWrap,
            {
              backgroundColor:
                theme.mode === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(15,23,42,0.06)',
              borderColor: theme.border,
            },
          ]}
        >
          {isExpanded ? (
            <ChevronUpIcon size={hp(2.4)} color={theme.accent} />
          ) : (
            <ChevronDownIcon size={hp(2.4)} color={theme.accent} />
          )}
        </View>
      </TouchableOpacity>
      {isExpanded ? <View style={styles.sectionBody}>{children}</View> : null}
    </View>
  );
};

const RecipeDetail = () => {
  const db = useSQLiteContext();
  const { theme } = useAppTheme();
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
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [cookTimerSeconds, setCookTimerSeconds] = useState(0);
  const [isCookTimerRunning, setIsCookTimerRunning] = useState(false);
  const [cookScrollViewHeight, setCookScrollViewHeight] = useState(0);
  const [cookScrollContentHeight, setCookScrollContentHeight] = useState(0);
  const [cookScrollOffsetY, setCookScrollOffsetY] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    ingredients: true,
    instructions: false,
    tips: false,
    glossary: false,
    videos: false,
    related: true,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  useKeepAwake(modalVisible ? 'cook-mode' : undefined);

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

  useEffect(() => {
    let isMounted = true;

    const loadRelatedRecipes = async () => {
      if (!recipe) {
        if (isMounted) {
          setRelatedRecipes([]);
        }
        return;
      }

      const related = await getRelatedRecipes(db, recipe, 8);

      if (isMounted) {
        setRelatedRecipes(related);
      }
    };

    loadRelatedRecipes();

    return () => {
      isMounted = false;
    };
  }, [db, recipe]);

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
    setCookTimerSeconds(0);
    setIsCookTimerRunning(false);
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

  const toggleSection = (
    section:
      | 'ingredients'
      | 'instructions'
      | 'tips'
      | 'glossary'
      | 'videos'
      | 'related'
  ) => {
    setExpandedSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  };

  useEffect(() => {
    if (!modalVisible || !isCookTimerRunning) {
      return;
    }

    const interval = setInterval(() => {
      setCookTimerSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isCookTimerRunning, modalVisible]);

  // manejo de favoritos
  const { likeRecipe, unlikeRecipe } = useLikedRecipes();
  const isInitiallyLiked = useIsRecipeLiked(recipe?.slug ?? '');

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
      unlikeRecipe(recipe.slug);
    } else {
      likeRecipe(recipe.slug);
    }
    setIsLiked(!isLiked); // Actualiza el estado local inmediatamente
  };

  const cookHasOverflow =
    cookScrollContentHeight > 0 && cookScrollContentHeight > cookScrollViewHeight;
  const cookScrollTrackHeight = Math.max(cookScrollViewHeight - 12, 0);
  const cookScrollThumbHeight = cookHasOverflow
    ? Math.max(
        (cookScrollViewHeight / cookScrollContentHeight) * cookScrollTrackHeight,
        48
      )
    : 0;
  const cookScrollMaxOffset = Math.max(
    cookScrollContentHeight - cookScrollViewHeight,
    1
  );
  const cookScrollThumbOffset = cookHasOverflow
    ? Math.min(
        (cookScrollOffsetY / cookScrollMaxOffset) *
          Math.max(cookScrollTrackHeight - cookScrollThumbHeight, 0),
        Math.max(cookScrollTrackHeight - cookScrollThumbHeight, 0)
      )
    : 0;

  if (isLoadingRecipe) {
    return (
      <AppBackground>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator color="#facc15" size="large" />
          <Text style={styles.loadingText}>Cargando receta...</Text>
        </SafeAreaView>
      </AppBackground>
    );
  }

  if (!recipe) {
    return (
      <AppBackground>
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No se encontraron recetas.</Text>
        </SafeAreaView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          // className="bg-white flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <StatusBar
            backgroundColor={colorStatusBar}
            style={theme.mode === 'dark' ? 'light' : 'dark'}
          />

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
                style={{ fontSize: hp(3.6), color: theme.text }}
                className="font-bold flex-1"
              >
                {recipe.nombre_receta}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(50).duration(700).springify().damping(12)}
              style={styles.quickActionsRow}
            >
              <TouchableOpacity
                onPress={handleOpenSteps}
                style={[
                  styles.quickActionButton,
                  {
                    backgroundColor: theme.accent,
                    borderColor: 'rgba(250, 204, 21, 0.35)',
                    shadowColor: theme.shadow,
                  },
                ]}
              >
                <PlayIcon size={hp(2.2)} color={theme.accentTextOn} />
                <Text
                  style={[
                    styles.quickActionPrimaryText,
                    { color: theme.accentTextOn },
                  ]}
                >
                  Modo cocinar
                </Text>
              </TouchableOpacity>
              {recipe.media.length > 1 ? (
                <TouchableOpacity
                  onPress={() => toggleSection('videos')}
                  style={[
                    styles.quickActionButton,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                      shadowColor: theme.shadow,
                    },
                  ]}
                >
                  <Text style={[styles.quickActionText, { color: theme.text }]}>
                    Ver videos
                  </Text>
                </TouchableOpacity>
              ) : null}
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

            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
            >
              <SectionCard
                title="Ingredientes"
                subtitle={`${Object.values(recipe.ingredientes).flat().length} items`}
                isExpanded={expandedSections.ingredients}
                onToggle={() => toggleSection('ingredients')}
              >
                <View className="space-y-2 ml-3">
                  {Object.keys(recipe.ingredientes).map((key) => (
                    <View key={key} className="space-y-1">
                      <Text
                        style={{
                          fontSize: hp(2.4),
                          paddingBottom: 4,
                          fontWeight: '800',
                          color: theme.text,
                        }}
                      >
                        {key == 'ingredientes' ? '' : key}
                      </Text>
                      {recipe.ingredientes[key].map((ingredient, i) => (
                        <View key={i} className="flex-row space-x-4 ">
                          <View
                            style={{ height: hp(1.4), width: hp(1.4) }}
                            className="bg-amber-300 rounded-full"
                          />
                          <Text
                            style={{
                              fontSize: hp(2.1),
                              fontWeight: '600',
                              color: theme.text,
                            }}
                          >
                            {ingredient}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </SectionCard>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(260)
                .duration(700)
                .springify()
                .damping(12)}
            >
              <SectionCard
                title="Instrucciones"
                subtitle={`${recipeSteps.length || Object.values(recipe.preparacion).flat().length} pasos`}
                isExpanded={expandedSections.instructions}
                onToggle={() => toggleSection('instructions')}
              >
                <TouchableOpacity
                  onPress={handleOpenSteps}
                  style={[styles.inlineCookButton, { backgroundColor: theme.accent }]}
                >
                  <PlayIcon size={hp(2)} color={theme.accentTextOn} />
                  <Text
                    style={[
                      styles.inlineCookButtonText,
                      { color: theme.accentTextOn },
                    ]}
                  >
                    Abrir modo cocinar
                  </Text>
                </TouchableOpacity>
                {Object.keys(recipe.preparacion).map((key) => (
                  <View
                    key={key}
                    style={[
                      styles.instructionsGroup,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={{ fontSize: hp(2.4), color: theme.text }}
                      className="font-bold"
                    >
                      {key == 'pasos' ? '' : key}
                    </Text>
                    {recipe.preparacion[key].map((step, i) => (
                      <Text
                        key={i}
                        style={{
                          fontSize: hp(2.1),
                          marginBottom: 6,
                          color: theme.textMuted,
                        }}
                      >
                        {step}
                      </Text>
                    ))}
                  </View>
                ))}
              </SectionCard>
            </Animated.View>

            {recipe.tips && recipe.tips.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(320)
                  .duration(700)
                  .springify()
                  .damping(12)}
              >
                <SectionCard
                  title="Tips"
                  subtitle={`${recipe.tips.length} consejos`}
                  isExpanded={expandedSections.tips}
                  onToggle={() => toggleSection('tips')}
                >
                  <View
                    style={[
                      styles.tipCard,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                        shadowColor: theme.shadow,
                      },
                    ]}
                  >
                    {recipe.tips.map((tip, index) => (
                      <View key={index} style={styles.bulletPointContainerTips}>
                        <View style={styles.bulletPointTips} />
                        <Text style={[styles.tipText, { color: theme.textMuted }]}>
                          {tip}
                        </Text>
                      </View>
                    ))}
                  </View>
                </SectionCard>
              </Animated.View>
            )}

            {recipe.glosario.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(380)
                  .duration(700)
                  .springify()
                  .damping(12)}
              >
                <SectionCard
                  title="Glosario"
                  subtitle={`${recipe.glosario.length} términos`}
                  isExpanded={expandedSections.glossary}
                  onToggle={() => toggleSection('glossary')}
                >
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
                </SectionCard>
              </Animated.View>
            )}

            {recipe.media.length > 1 && (
              <Animated.View
                entering={FadeInDown.delay(440)
                  .duration(700)
                  .springify()
                  .damping(12)}
              >
                <SectionCard
                  title="Videos"
                  subtitle={`${recipe.media.length - 1} clips`}
                  isExpanded={expandedSections.videos}
                  onToggle={() => toggleSection('videos')}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 4 }}
                  >
                    {recipe.media.slice(1).map((url, index) => {
                      if (!url) return null;

                      const videoId = getYouTubeVideoId(url);
                      if (!videoId) {
                        return null;
                      }

                      return (
                        <View key={index} style={styles.videoContainer}>
                          <YoutubePlayer
                            height={200}
                            videoId={videoId}
                            webViewProps={{
                              allowsFullscreenVideo: true,
                              javaScriptEnabled: true,
                              domStorageEnabled: true,
                            }}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </SectionCard>
              </Animated.View>
            )}

            {relatedRecipes.length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(500)
                  .duration(700)
                  .springify()
                  .damping(12)}
              >
                <SectionCard
                  title="Recetas parecidas"
                  subtitle="Misma categoria o dificultad"
                  isExpanded={expandedSections.related}
                  onToggle={() => toggleSection('related')}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.relatedScrollContent}
                  >
                    {relatedRecipes.map((relatedRecipe) => (
                      <TouchableOpacity
                        key={`${relatedRecipe.slug}-${relatedRecipe.temporada}-${relatedRecipe.episodio}`}
                        style={styles.relatedCard}
                        onPress={() => {
                          router.push(`/(home)/${relatedRecipe.slug}`);
                        }}
                      >
                        <Image
                          source={{ uri: relatedRecipe.media[0] }}
                          style={styles.relatedImage}
                          cachePolicy={'disk'}
                          contentFit="cover"
                          placeholder={require('@/assets/images/action/plato.jpg')}
                          transition={800}
                        />
                        <View style={styles.relatedBody}>
                          <Text style={styles.relatedBadge}>
                            {relatedRecipe.tipo} · T{relatedRecipe.temporada}
                          </Text>
                          <Text numberOfLines={2} style={styles.relatedTitle}>
                            {relatedRecipe.nombre_receta}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </SectionCard>
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
            <View
              style={[
                styles.cookModalContainer,
                {
                  backgroundColor: theme.surfaceStrong,
                  borderColor: theme.border,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={styles.cookModalTopRow}>
                <View>
                  <Text style={[styles.cookLabel, { color: theme.accent }]}>
                    Modo cocinar
                  </Text>
                  <Text style={[styles.cookTitle, { color: theme.text }]}>
                    {recipeSteps[currentStep]?.title == 'pasos'
                      ? 'Instrucciones'
                      : recipeSteps[currentStep]?.title || 'Paso actual'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[
                    styles.cookCloseIcon,
                    {
                      backgroundColor:
                        theme.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(15,23,42,0.06)',
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text style={[styles.cookCloseIconText, { color: theme.text }]}>
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.cookModalScroll}
                contentContainerStyle={styles.cookModalScrollContent}
                showsVerticalScrollIndicator={false}
                onLayout={(event) => {
                  setCookScrollViewHeight(event.nativeEvent.layout.height);
                }}
                onContentSizeChange={(_, height) => {
                  setCookScrollContentHeight(height);
                }}
                onScroll={(event) => {
                  setCookScrollOffsetY(event.nativeEvent.contentOffset.y);
                }}
                scrollEventThrottle={16}
              >
                <View style={styles.cookProgressWrap}>
                  <View
                    style={[
                      styles.cookProgressTrack,
                      {
                        backgroundColor:
                          theme.mode === 'dark'
                            ? 'rgba(255,255,255,0.10)'
                            : 'rgba(15,23,42,0.08)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.cookProgressFill,
                        {
                          backgroundColor: theme.accent,
                          width: `${
                            recipeSteps.length > 0
                              ? ((currentStep + 1) / recipeSteps.length) * 100
                              : 0
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.modalTextTitle, { color: theme.textMuted }]}>
                    Paso {recipeSteps[currentStep]?.stepNumber} de{' '}
                    {recipeSteps[currentStep]?.totalSteps}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cookTimerCard,
                    {
                      backgroundColor:
                        theme.mode === 'dark'
                          ? 'rgba(255,255,255,0.06)'
                          : '#fff',
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text style={[styles.cookTimerLabel, { color: theme.textMuted }]}>
                    Temporizador
                  </Text>
                  <Text style={[styles.cookTimerValue, { color: theme.text }]}>
                    {formatTimer(cookTimerSeconds)}
                  </Text>
                  <View style={styles.cookTimerActions}>
                    <TouchableOpacity
                      onPress={() => setIsCookTimerRunning((running) => !running)}
                      style={[
                        styles.timerActionButton,
                        styles.timerActionPrimary,
                        { backgroundColor: theme.accent },
                      ]}
                    >
                      <Text
                        style={[
                          styles.timerActionPrimaryText,
                          { color: theme.accentTextOn },
                        ]}
                      >
                        {isCookTimerRunning ? 'Pausar' : 'Iniciar'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setCookTimerSeconds(0);
                        setIsCookTimerRunning(false);
                      }}
                      style={[
                        styles.timerActionButton,
                        {
                          backgroundColor:
                            theme.mode === 'dark'
                              ? 'rgba(255,255,255,0.08)'
                              : '#efe1cf',
                        },
                      ]}
                    >
                      <Text style={[styles.timerActionText, { color: theme.text }]}>
                        Reiniciar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.cookBodyText, { color: theme.text }]}>
                  {recipeSteps[currentStep]?.texto ||
                    'No hay información disponible'}
                </Text>
                <Text style={[styles.cookHint, { color: theme.textMuted }]}>
                  La pantalla permanecerá activa mientras este modo esté abierto.
                </Text>
              </ScrollView>
              {cookHasOverflow ? (
                <View style={styles.cookScrollbarTrack} pointerEvents="none">
                  <View
                    style={[
                      styles.cookScrollbarThumb,
                      {
                        height: cookScrollThumbHeight,
                        transform: [{ translateY: cookScrollThumbOffset }],
                      },
                    ]}
                  />
                </View>
              ) : null}
              <View
                style={[
                  styles.stepNavigation,
                  {
                    borderTopColor: theme.border,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={handlePreviousStep}
                  disabled={currentStep === 0}
                  style={[
                    styles.cookStepButton,
                    {
                      backgroundColor:
                        currentStep === 0
                          ? '#A0A0A0'
                          : theme.mode === 'dark'
                            ? 'rgba(255,255,255,0.08)'
                            : '#efe1cf',
                    },
                    currentStep === 0 && styles.disabledButton,
                  ]}
                >
                  <Text style={[styles.stepButtonText, { color: theme.text }]}>
                    Anterior
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleNextStep}
                  disabled={currentStep === recipeSteps.length - 1}
                  style={[
                    styles.cookStepButton,
                    {
                      backgroundColor:
                        currentStep === recipeSteps.length - 1
                          ? '#A0A0A0'
                          : theme.accent,
                    },
                    currentStep === recipeSteps.length - 1 &&
                      styles.disabledButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.stepButtonText,
                      {
                        color:
                          currentStep === recipeSteps.length - 1
                            ? '#fff'
                            : theme.accentTextOn,
                      },
                    ]}
                  >
                    Siguiente
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </AppBackground>
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
  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  quickActionPrimary: {
    backgroundColor: '#fbbf24',
  },
  quickActionText: {
    color: '#fff',
    fontSize: hp(1.8),
    fontWeight: '700',
  },
  quickActionPrimaryText: {
    color: '#3a2200',
    fontSize: hp(1.8),
    fontWeight: '800',
  },
  sectionCard: {
    backgroundColor: 'rgba(44, 18, 14, 0.58)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionHeaderText: {
    flex: 1,
    paddingRight: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: hp(2.6),
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#fde68a',
    fontSize: hp(1.6),
    marginTop: 2,
  },
  sectionIconWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderRadius: 16,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  relatedScrollContent: {
    paddingHorizontal: 4,
    paddingRight: 14,
  },
  relatedCard: {
    backgroundColor: 'rgba(0,0,0,0.24)',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    width: wp(56),
  },
  relatedImage: {
    height: hp(14),
    width: '100%',
  },
  relatedBody: {
    padding: 12,
  },
  relatedBadge: {
    color: '#fde68a',
    fontSize: hp(1.5),
    fontWeight: '700',
    marginBottom: 6,
  },
  relatedTitle: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: '800',
    lineHeight: hp(2.4),
  },
  inlineCookButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fbbf24',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inlineCookButtonText: {
    color: '#3a2200',
    fontSize: hp(1.7),
    fontWeight: '800',
  },
  instructionsGroup: {
    backgroundColor: 'rgba(10, 10, 10, 0.24)',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    backgroundColor: 'rgba(17, 24, 39, 0.60)',
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
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
    backgroundColor: 'rgba(0,0,0,0.95)',
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
  cookModalContainer: {
    width: '88%',
    backgroundColor: '#fff8ef',
    borderRadius: 22,
    padding: 20,
    maxHeight: '88%',
    borderWidth: 1,
  },
  cookModalScroll: {
    flexGrow: 0,
    paddingRight: 16,
  },
  cookModalScrollContent: {
    paddingBottom: 8,
  },
  cookScrollbarTrack: {
    position: 'absolute',
    top: 86,
    right: 10,
    bottom: 82,
    width: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.28)',
    overflow: 'hidden',
  },
  cookScrollbarThumb: {
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  cookModalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cookLabel: {
    color: '#b45309',
    fontSize: hp(1.6),
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  cookTitle: {
    color: '#3a2200',
    fontSize: hp(3),
    fontWeight: '800',
    marginTop: 4,
  },
  cookCloseIcon: {
    width: 34,
    height: 34,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1e4d2',
    borderWidth: 1,
  },
  cookCloseIconText: {
    color: '#7c2d12',
    fontSize: hp(2),
    fontWeight: '800',
  },
  cookProgressWrap: {
    marginBottom: 16,
  },
  cookProgressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ead9c5',
    overflow: 'hidden',
  },
  cookProgressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#f59e0b',
  },
  cookTimerCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    padding: 16,
    borderWidth: 1,
  },
  cookTimerLabel: {
    color: '#9a3412',
    fontSize: hp(1.8),
    fontWeight: '700',
  },
  cookTimerValue: {
    color: '#3a2200',
    fontSize: hp(4.6),
    fontWeight: '900',
    marginVertical: 8,
  },
  cookTimerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  timerActionButton: {
    backgroundColor: '#efe1cf',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  timerActionPrimary: {
    backgroundColor: '#fbbf24',
  },
  timerActionText: {
    color: '#7c2d12',
    fontSize: hp(1.8),
    fontWeight: '800',
  },
  timerActionPrimaryText: {
    color: '#3a2200',
    fontSize: hp(1.8),
    fontWeight: '900',
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
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  cookBodyText: {
    color: '#3a2200',
    fontSize: hp(2.6),
    lineHeight: hp(3.5),
  },
  cookHint: {
    color: '#92400e',
    fontSize: hp(1.7),
    marginTop: 10,
  },
  cookStepButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    minWidth: '47%',
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

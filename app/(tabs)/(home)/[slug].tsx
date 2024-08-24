import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { foodData, foodDataProps } from "@/data";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeftIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";

import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import YouTubeIframe from "react-native-youtube-iframe";

import { WebView } from "react-native-webview";

import { glosario, glosarioProps } from "@/data/glosario";

import { acciones, accionesProps } from "@/data/action";

const RecipeDetail = () => {
  const { slug } = useLocalSearchParams();
  const recipe = foodData.find((r) => r.slug === slug);
  const [isFavourite, setIsFavourite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleGlosary, setModalVisibleGlosary] = useState(false);

  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<
    string | null
  >(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(
    null
  );
  const [recipeSteps, setRecipeSteps] = useState<
    { texto: string; verbos_clave: string[] }[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  if (!recipe) {
    return (
      <View>
        <Text>No se encontraron recetas</Text>
      </View>
    );
  }

  const handleGlossaryClick = (term: string) => {
    const definition = glosario.find((item) => item[term]);
    if (definition) {
      setSelectedGlossaryTerm(term);
      setSelectedDefinition(definition[term]);
      setModalVisibleGlosary(true);
    }
  };

  const colorStatusBar = modalVisible || modalVisibleGlosary ? "#00000080" : "";

  const handleOpenSteps = () => {
    const stepsArray: any = [];
    Object.keys(recipe.preparacion).forEach((key) => {
      recipe.preparacion[key].forEach((step, index) => {
        stepsArray.push({
          title: key,
          texto: step.texto,
          stepNumber: index + 1,
          totalSteps: recipe.preparacion[key].length,
          verbosClave: step.verbos_clave,
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBar backgroundColor={colorStatusBar} />

        {/* <Stack.Screen
          options={{
            headerShown: true,
            title: recipe.nombre_receta,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#B89C00", // Cambia este valor por el color de tu app
            },
            headerTintColor: "#FFFFFF", // Color del texto del encabezado
          }}
        /> */}

        {/* Recipe image */}
        <View className="flex-row justify-center">
          <Image
            source={{ uri: recipe.media[0] }}
            style={{
              width: "100%",
              height: hp(25),
              borderRadius: 53,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              resizeMode: "cover",
            }}
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
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            className="p-2 rounded-full mr-5 bg-white"
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavourite ? "red" : "gray"}
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
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipe.nombre_receta}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipe.tipo}
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
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
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
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
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
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredientes:
            </Text>
            <View className="space-y-2 ml-3">
              {Object.keys(recipe.ingredientes).map((key) => (
                <View key={key} className="space-y-1">
                  <Text
                    style={{ fontSize: hp(1.7) }}
                    className="font-bold text-neutral-700"
                  >
                    {key}
                  </Text>
                  {recipe.ingredientes[key].map((ingredient, i) => (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
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
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instrucciones:
            </Text>
            {Object.keys(recipe.preparacion).map((key) => (
              <View key={key} className="space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  {key}
                </Text>
                {recipe.preparacion[key].map((step, i) => (
                  <Text
                    key={i}
                    style={{ fontSize: hp(1.6) }}
                    className="text-neutral-700"
                  >
                    {step.texto}
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
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Tips:
              </Text>
              <View style={styles.tipCard}>
                {recipe.tips.map((tip, index) => (
                  <View key={index} style={styles.bulletPointContainer}>
                    <View style={styles.bulletPoint} />
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
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Glosario:
              </Text>
              <View className="space-y-2 ml-3">
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
                          style={{ fontSize: hp(1.6), color: "#007AFF" }}
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
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
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
        {/* </SafeAreaView> */}
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
        {/* <PlusIcon size={30} color="white" /> */}

        <Image
          source={require("@/assets/images/cook.png")}
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
              {recipeSteps[currentStep]?.title}
            </Text>
            <Text style={styles.modalTextTitle}>
              Paso {recipeSteps[currentStep]?.stepNumber} de{" "}
              {recipeSteps[currentStep]?.totalSteps}
            </Text>
            <Text style={styles.modalText}>
              {recipeSteps[currentStep]?.texto ||
                "No hay información disponible"}
            </Text>

            {/* Display verbos_clave as a bullet list */}
            <View style={styles.verbosClaveContainer}>
              {recipeSteps[currentStep]?.verbosClave.map((verbo, index) => (
                <View key={index} style={styles.bulletPointContainer}>
                  <Image
                    source={acciones.find((a) => a.tipo === verbo)?.imagen}
                    style={{ width: hp(12), height: hp(12) }}
                  />
                </View>
              ))}
            </View>

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
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: 200,
    marginRight: 10,
  },
  webView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tipCard: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  tipText: {
    fontSize: hp(2),
    color: "#525252",
  },

  touchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  imageContainer: {
    borderRadius: 50, // Hace que la vista sea redonda
    padding: 6,
    backgroundColor: "#E0E0E0",
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#fbbf24",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: hp(2),
    marginBottom: 20,
    textAlign: "center",
  },
  stepNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  stepButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  stepButtonText: {
    color: "white",
    fontSize: hp(2),
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: hp(2),
  },
  modalTextTitle: {
    fontSize: hp(2),
    marginBottom: 10,
  },

  verbosClaveContainer: {
    marginTop: 15,
    marginBottom: 20,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "gray",
    justifyContent: "space-around",
    // width: "100%",
  },
  bulletPointContainer: {
    display: "flex",
    justifyContent: "center",
  },

  verbosClaveText: {
    fontSize: hp(2),
    color: "#525252",
  },
});

export default RecipeDetail;

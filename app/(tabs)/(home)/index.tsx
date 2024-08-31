import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  Button,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import TrendingRecipes from "@/components/TrendingRecipes";
import {
  recipeProps as foodDataProps,
  recipeData as foodData,
} from "@/data/recetario";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Categorias from "@/components/Categorias";
import Dificultades from "@/components/Dificultad";

import { RecipeCard } from "@/components/Recetas";
import { claves } from "@/data/encript";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SplashScreen from "expo-splash-screen";

const index = () => {
  const router = useRouter();

  // Estado para la categoría activa y las recetas filtradas
  const [activeCategory, setActiveCategory] = useState<string>("Todo");

  // Estado para la dificultad activa y las recetas filtradas
  const [activeDificultad, setActiveDificultad] = useState<string>("Todo");

  const [filteredRecipes, setFilteredRecipes] =
    useState<foodDataProps[]>(foodData);

  // Estado para la verificación del código
  const [modalVisible, setModalVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // Prevent the splash screen from hiding automatically
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Función para actualizar las recetas filtradas
  const updateFilteredRecipes = (category: string, dificultad: string) => {
    let updatedRecipes = foodData;

    if (category !== "Todo") {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.tipo === category
      );
    }

    if (dificultad !== "Todo") {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.nivel_complejidad === dificultad
      );
    }

    setFilteredRecipes(updatedRecipes);
  };

  // Función para manejar el cambio de dificultad
  const handleDificultad = (dificultad: string) => {
    const newDificultad = activeDificultad === dificultad ? "Todo" : dificultad;
    setActiveDificultad(newDificultad);
    updateFilteredRecipes(activeCategory, newDificultad);
  };

  // Función para manejar el cambio de categoría
  const handleChangeCategory = (category: string) => {
    const newCategory = activeCategory === category ? "Todo" : category;
    setActiveCategory(newCategory);
    updateFilteredRecipes(newCategory, activeDificultad);
  };

  // Verifica si el código ya ha sido validado antes
  useEffect(() => {
    const checkVerification = async () => {
      const verified = await AsyncStorage.getItem("isVerified");
      if (verified === "true") {
        setModalVisible(false);
      } else {
        const randomIndex = Math.floor(Math.random() * claves.length);
        const selectedPair = claves[randomIndex];
        setSelectedKey(Object.keys(selectedPair)[0]);
        setSelectedValue(Object.values(selectedPair)[0]);
        setModalVisible(true);
      }
      // Hide the splash screen once everything is ready
      await SplashScreen.hideAsync();
    };

    checkVerification();
  }, []);

  // Validar la entrada del usuario y guardar el estado de verificación
  const handleValidation = async () => {
    if (inputValue === selectedValue) {
      await AsyncStorage.setItem("isVerified", "true");
      setModalVisible(false);
    } else {
      alert("Código incorrecto. Inténtalo de nuevo.");
    }
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = "+51936364807"; // Reemplaza con tu número de teléfono incluyendo el código de país
    const message = `Hola, necesito la clave para acceder a la app.\nMi código actual es:\n${selectedKey}`; // Mensaje a enviar
    // Mensaje a enviar
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch(() => {
      alert("Asegúrate de tener WhatsApp instalado en tu dispositivo");
    });
  };

  // borrar lo que haya en mi asyncSorage
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage ha sido borrado.");
    } catch (error) {
      console.error("Error al borrar AsyncStorage:", error);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    >
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView>
        {/* Modal de verificación */}
        {modalVisible && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Introduce el código correspondiente a la clave:
                </Text>
                <Text style={styles.modalKey}>{selectedKey}</Text>
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  placeholder="Introduce el valor"
                  placeholderTextColor="gray"
                />
                <View style={{ display: "flex" }}>
                  <Button title="Validar" onPress={handleValidation} />
                  <TouchableOpacity
                    style={styles.whatsappButton}
                    onPress={handleWhatsAppPress}
                  >
                    <FontAwesome name="whatsapp" size={24} color="white" />
                    <Text style={styles.whatsappButtonText}>
                      Contactar por WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        <View className="pb-4 flex-row justify-between items-center mx-4 border-solid border-b-stone-900 ">
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>E</Text>l{" "}
            <Text style={styles.text}>G</Text>ran{" "}
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
            </View>
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default index;

// crea los estilos
const styles = StyleSheet.create({
  text: {
    color: "yellow",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  modalKey: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366", // Color de WhatsApp
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  whatsappButtonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
  },
});

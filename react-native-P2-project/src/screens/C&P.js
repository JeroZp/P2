import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Bubble from "../components/Bubble";
import NavBar from "../components/NavBar";
import { getConsumptions, getProductions } from "../services/consumptionProductionService";

export default function CP() {
  const [mode, setMode] = useState("Consumo");
  const [data, setData] = useState({
    Consumo: {
      totalActual: "0.00 Wh",
      totalAnterior: "0.00 Wh",
      promedioDiario: "0.00 Wh",
      promedioMensual: "0.00 Wh",
      promedioHora: "0.00 Wh",
    },
    Producción: {
      totalActual: "0.00 Wh",
      totalAnterior: "0.00 Wh",
      promedioDiario: "0.00 Wh",
      promedioMensual: "0.00 Wh",
      promedioHora: "0.00 Wh",
    },
  });

  const titles = {
    totalActual: `${mode} total del mes actual`,
    totalAnterior: `${mode} total del mes anterior`,
    promedioDiario: `${mode} promedio diario`,
    promedioMensual: `${mode} promedio mensual`,
    promedioHora: `${mode} promedio por hora`,
  };

  const dispositivos = {
    Consumo: [
      { nombre: "Horno microondas", porcentaje: "12%" },
      { nombre: "Computadora", porcentaje: "11%" },
      { nombre: "Calefactor eléctrico", porcentaje: "11%" },
      { nombre: "Televisor", porcentaje: "12%" },
      { nombre: "Lavadora", porcentaje: "14%" },
      { nombre: "Secadora", porcentaje: "16%" },
    ],
    Producción: [
      { nombre: "Panel Solar 1", porcentaje: "25%" },
      { nombre: "Panel Solar 2", porcentaje: "20%" },
      { nombre: "Panel Solar 3", porcentaje: "18%" },
      { nombre: "Panel Solar 4", porcentaje: "15%" },
      { nombre: "Panel Solar 5", porcentaje: "12%" },
      { nombre: "Panel Solar 6", porcentaje: "10%" },
    ],
  };

  // Obtener datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === "Consumo") {
          const consumptions = await getConsumptions();
          setData(prevData => ({
            ...prevData,
            Consumo: {
              totalActual: consumptions.totalActual,
              totalAnterior: consumptions.totalAnterior,
              promedioDiario: consumptions.promedioDiario,
              promedioMensual: consumptions.promedioMensual,
              promedioHora: consumptions.promedioHora,
            },
          }));
        } else {
          const productions = await getProductions();
          setData(prevData => ({
            ...prevData,
            Producción: {
              totalActual: productions.totalActual,
              totalAnterior: productions.totalAnterior,
              promedioDiario: productions.promedioDiario,
              promedioMensual: productions.promedioMensual,
              promedioHora: productions.promedioHora,
            },
          }));
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Error al cargar los datos. Por favor, inténtalo de nuevo.');
      }
    };

    fetchData();
  }, [mode]);

  return (
    <View style={styles.container}>
      {/* Barra de estado transparente */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Contenedor de burbujas (fondo fijo) */}
      <View style={styles.bubblesContainer}>
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: -90 }} />
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: 150 }} />
        <Bubble size={330} color="#1E8449" position={{ top: -275, left: 40 }} />
      </View>

      {/* Botones de Consumo y Producción */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setMode("Consumo")}
          style={[styles.toggleButton, mode === "Consumo" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Consumo" && styles.toggleTextActive]}>
            Consumo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("Producción")}
          style={[styles.toggleButton, mode === "Producción" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Producción" && styles.toggleTextActive]}>
            Producción
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Object.keys(data[mode]).map((key, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{titles[key]}</Text>
            <Text style={styles.cardValue}>{data[mode][key]}</Text>
          </View>
        ))}

        {/* Contenedor general de dispositivos con fondo */}
        <View style={styles.devicesWrapper}>
          {/* Título con modo en negrilla */}
          <Text style={styles.footerText}>
            <Text style={styles.boldText}>{mode}</Text> total por dispositivo:
          </Text>

          {/* Lista de dispositivos con su porcentaje */}
          {dispositivos[mode].map((item, index) => (
            <View key={index} style={styles.deviceContainer}>
              <Text style={styles.deviceText}>{item.nombre}: <Text style={styles.boldText}>{item.porcentaje}</Text></Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación fija */}
      <NavBar style={{ backgroundColor: "#1E8449" }} />
    </View>
  );
}

// Estilos (deben ir en el otro archivo...)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  bubblesContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    alignItems: "center",
    zIndex: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 85,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: "#D0ECD8",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: "center",
    shadowColor: "transparent", // Sin sombra por defecto
  },
  toggleButtonActive: {
    backgroundColor: "#1E8449",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 6, // Efecto de sombra en Android
  },
  toggleText: {
    color: "#1E8449",
    fontFamily: "MontserratAlternates-SemiBold",
    fontSize: 14,
  },
  toggleTextActive: {
    color: "white",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "MontserratAlternates-Medium",
  },
  cardValue: {
    fontSize: 25,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#4F4F4F",
  },
  footerText: {
    fontSize: 16,
    fontFamily: "MontserratAlternates-SemiBold",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  devicesWrapper: {
    backgroundColor: "rgba(255, 183, 77, 0.13)",  // Color de fondo
    borderRadius: 15,  // Bordes redondeados
    padding: 15,  // Espaciado interno
    marginTop: 10,  // Espacio superior
    marginBottom: 20,  // Espacio inferior
  },
  deviceContainer: {
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  deviceText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "MontserratAlternates-Medium",
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1E8449",
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  separator: {
    height: 1, // Grosor de la línea
    backgroundColor: '#ddd',
    width: '50%',
    alignSelf: 'center',
  },
});
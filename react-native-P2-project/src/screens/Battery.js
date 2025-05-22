import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
  StyleSheet,

} from "react-native";
import Bubble from "../components/Bubble";
import NavBar from "../components/NavBar";
import LoadingDots from "../components/LoadingDots";
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";


const { width: screenWidth } = Dimensions.get("window");

export default function Battery() {

  const [loading, setLoading] = useState(true); // estado de carga

  const [infoVisible, setInfoVisible] = useState(false);

  const [unit, setUnit] = useState("Wh");

  const [storage, setStorage] = useState({
    capacityKW: 13.5,
    availableKW: 2,
    historyKW: [2, 5, 3, 6, 4, 7, 10],   // datos para la gráfica en Wh
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  });

  // porcentaje de nivel actual
  const levelPercent = (storage.availableKW / storage.capacityKW) * 100;

  // convierte cada punto histórico a %
  const historyPct = storage.historyKW.map(
    v => (v / storage.capacityKW) * 100
  );


  // Cada vez que cambie la unidad, ajustamos los datos de la gráfica
  const chartData = {
    labels: storage.labels,
    datasets: [{
      data: unit === "%" ? historyPct : storage.historyKW,
      strokeWidth: 2,
    }],
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [unit]);

  return (
    <View style={batteryStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Burbujas de fondo */}
      <View style={batteryStyles.bubblesContainer}>
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: -90 }} />
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: 150 }} />
        <Bubble size={330} color="#1E8449" position={{ top: -275, left: 40 }} />
      </View>

      {loading ? (
        <View style={batteryStyles.loaderContainer}>
          <LoadingDots />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={batteryStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Tarjetas de Nivel, Capacidad y Disponible */}
          <View style={batteryStyles.cardsContainer}>

            <View style={batteryStyles.card}>
              <FontAwesome5
                name="battery-full"
                size={20}
                color="#2D9CDB"
                marginBottom={5}
              />
              <Text style={batteryStyles.cardTitle}>Capacidad de Batería </Text>
              <Text style={batteryStyles.cardValue}>
                {unit === "%"
                  ? `${storage.capacityKW.toFixed(1)} Wh`
                  : `${storage.capacityKW.toFixed(1)} Wh`}
              </Text>
            </View>

            {unit === "%" && (
              <View style={batteryStyles.card}>
                <FontAwesome5 name="tachometer-alt" size={20} color="#EB5757" style={batteryStyles.iconAbove} />
                <Text style={batteryStyles.cardTitle}>Nivel de Batería</Text>
                <Text style={batteryStyles.cardValue}>
                  {`${levelPercent.toFixed(1)} %`}
                </Text>
              </View>
            )}

            {/* → Si estoy en Wh: muestro Disponible */}
            {unit === "Wh" && (
              <View style={batteryStyles.card}>
                <FontAwesome5 name="bolt" size={20} color="#FFA500" style={batteryStyles.iconAbove} />
                <Text style={batteryStyles.cardTitle}>Energía Disponible</Text>
                <Text style={batteryStyles.cardValue}>
                  {`${storage.availableKW.toFixed(1)} Wh`}
                </Text>
              </View>
            )}
          </View>

          {/* Botones de Alternar Unidad */}
          <View style={batteryStyles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setUnit("Wh")}
              style={[
                batteryStyles.toggleButton,
                unit === "Wh" && batteryStyles.toggleButtonActive
              ]}
            >
              <Text style={[
                batteryStyles.toggleText,
                unit === "Wh" && batteryStyles.toggleTextActive
              ]}>
                Mostrar en Wh
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnit("%")}
              style={[
                batteryStyles.toggleButton,
                unit === "%" && batteryStyles.toggleButtonActive
              ]}
            >
              <Text style={[
                batteryStyles.toggleText,
                unit === "%" && batteryStyles.toggleTextActive
              ]}>
                Mostrar en %
              </Text>
            </TouchableOpacity>
          </View>

          {/* Gráfica de Línea */}
          <ScrollView contentContainerStyle={batteryStyles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={batteryStyles.chartContainer}>
              <TouchableOpacity
                onPress={() => setInfoVisible(true)}
                style={{ alignSelf: 'center', marginBottom: 8 }}
              >
                <FontAwesome5 name="info-circle" size={20} color="#666" />
              </TouchableOpacity>
              <LineChart
                data={chartData}
                width={screenWidth * 0.9}
                height={250}
                // activa líneas internas y desactiva bordes exteriores
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLines={true}
                withHorizontalLines={true}
                // dibuja sombra y puntos
                withShadow={true}
                withDots={true}
                bezier
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  // sombreado degradado
                  fillShadowGradientFrom: "#D35400",
                  fillShadowGradientFromOpacity: 0.2,
                  fillShadowGradientTo: "#D35400",
                  fillShadowGradientToOpacity: 0.0,
                  decimalPlaces: 0,
                  // color de línea y etiquetas
                  color: (opacity = 1) => `rgba(211,84,0, ${opacity})`,
                  labelColor: () => `rgba(0,0,0,0.7)`,
                  // puntos
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff",
                    fill: "#D35400",
                  },
                  // grid punteado
                  propsForBackgroundLines: {
                    stroke: "#CCCCCC",
                    strokeDasharray: "4,4",
                  },
                }}
                style={{
                  marginVertical: 8,
                  marginBottom: 50,
                  borderRadius: 16,
                }}
              />


            </View>
            {/* Modal de Información */}
            <Modal
              visible={infoVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setInfoVisible(false)}
            >
              <View style={batteryStyles.modalOverlay}>
                <View style={batteryStyles.infoModal}>
                  <Text style={batteryStyles.modalTitle}>¿Para qué sirve esta gráfica?</Text>
                  <Text style={batteryStyles.modalText}>
                    Muestra la evolución del nivel de carga de la batería durante la última semana.
                    Cambia la unidad para ver datos en Wh o en porcentaje.
                  </Text>
                  <TouchableOpacity
                    onPress={() => setInfoVisible(false)}
                    style={batteryStyles.closeButton}
                  >
                    <Text style={batteryStyles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </ScrollView>
        </ScrollView>

      )}


      <NavBar style={{ backgroundColor: "#1E8449" }} />
    </View>
  );
}


const batteryStyles = StyleSheet.create({
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
  cardsContainer: {
    marginTop: 100,
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 40,
    alignItems: "center",
    shadowColor: "rgba(211, 84, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "MontserratAlternates-Medium",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#4F4F4F",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  toggleButton: {
    backgroundColor: "#D0ECD8",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#1E8449",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 6,
  },
  toggleText: {
    color: "#1E8449",
    fontFamily: "MontserratAlternates-SemiBold",
    fontSize: 14,
  },
  toggleTextActive: {
    color: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 30,
  },
  chartContainer: {
    marginTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#2D9CDB',
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
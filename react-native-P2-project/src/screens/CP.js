import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
  Dimensions,
  //ActivityIndicator, 
} from "react-native";

import Bubble from "../components/Bubble";
import NavBar from "../components/NavBar";
import LoadingDots from '../components/LoadingDots';

import { FontAwesome5 } from '@expo/vector-icons';
import { PieChart } from "react-native-chart-kit";
import { showMessage } from "react-native-flash-message";
import { getConsumptions, getProductions } from "../services/consumptionProductionService";


const { width: screenWidth } = Dimensions.get("window");

export default function CP() {

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState(true);
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

  // Cuando cambie el modo, resetea selección y trae datos
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (mode === "Consumo") {
          const consumptions = await getConsumptions();
          setData(prev => ({ ...prev, Consumo: consumptions }));
        } else {
          const productions = await getProductions();
          setData(prev => ({ ...prev, Producción: productions }));
        }
      } catch {
        showMessage({
          message: "ERROR",
          description: "No obtuvo la información correctamente.",
          type: "danger",
          icon: "auto",
          duration: 5500,
        });
      } finally {
          setLoading(false);
      }
    })();
    setSelectedIndex(null);
  }, [mode]);
 
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

  const [infoVisible, setInfoVisible] = useState(false);

  const COLORS = ['#1E8449','#6FCF97','#F2C94C','#EB5757','#2D9CDB','#9B51E0'];

  // Prepara los datos con color/leyenda según selección
  const chartData = dispositivos[mode].map((d, i) => ({
    name: d.nombre,
    population: parseFloat(d.porcentaje),
    porcentaje: d.porcentaje,
    color: selectedIndex === null
      ? COLORS[i]
      : (i === selectedIndex ? COLORS[i] : "#e0e0e0"),
    legendFontColor: i === selectedIndex ? "#000" : "#333",
    legendFontSize: 16,
  }));

  const titles = {
    totalActual: `${mode} total del mes actual`,
    totalAnterior: `${mode} total del mes anterior`,
    promedioDiario: `${mode} promedio diario`,
    promedioMensual: `${mode} promedio mensual`,
    promedioHora: `${mode} promedio por hora`,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.bubblesContainer}>
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: -90 }} />
        <Bubble size={330} color="#6FCF97" position={{ top: -260, left: 150 }} />
        <Bubble size={330} color="#1E8449" position={{ top: -275, left: 40 }} />
      </View>

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

      {/* <View style={styles.separator} /> */}

      {loading ? (
        <LoadingDots />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {Object.keys(data[mode]).map((key, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardTitle}>{titles[key]}</Text>
              <Text style={styles.cardValue}>{data[mode][key]}</Text>
            </View>
          ))}

          
          <View style={[
              styles.devicesWrapper,
              { backgroundColor:
                  mode === "Consumo"
                    ? "rgba(255,183,77,0.13)"
                    : "rgba(211,84,0,0.1)"
              }
          ]}>
           
           <TouchableOpacity
            onPress={() => setInfoVisible(true)}
            style={{ alignSelf: 'center' }}
          >
            <FontAwesome5 name="info-circle" size={20} color="#666" />
          </TouchableOpacity>

            <Text style={styles.footerText}>

              <Text style={styles.boldText}>{mode}</Text> total por dispositivo  <FontAwesome5
            name="bolt"          // o "sun" para sol
            size={20}
            color="#FFA500"
            
          />
            
              
            </Text>
            

            <View style={styles.legendContainer}>
              {chartData.map((slice, i) => {
                const isSel = i === selectedIndex;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSelectedIndex(isSel ? null : i)}
                    style={[styles.legendItem, isSel && styles.legendItemActive]}
                  >
                    <View style={[styles.legendColor, { backgroundColor: slice.color }]} />
                    <Text style={[styles.legendText, isSel && styles.legendTextActive]}>
                      {slice.name}: <Text style={styles.boldText}>{slice.porcentaje}</Text>
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.chartContainer}>
              {showChart && (

                <View
                style={{
                  width: screenWidth * 0.8,
                  height: screenWidth * 0.8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >

                <PieChart
                  data={chartData}
                  width={screenWidth * 0.8}
                  height={screenWidth * 0.8}
                  chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: () => `rgba(255,255,255,1)`,
                    labelColor: () => `rgba(255,255,255,1)`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  absolute
                  hasLegend={false}
                  paddingLeft={`${screenWidth * 0.2}`}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: screenWidth * 0.4,
                    height: screenWidth * 0.4,
                    borderRadius: (screenWidth * 0.4) / 2,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                


                </View>
  )}
</View>
             
          </View>
        </ScrollView>
        )}

        <Modal
        visible={infoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModal}>
            <Text style={styles.modalTitle}>¿Para qué sirve esta gráfica?</Text>
            <Text style={styles.modalText}>
              Muestra el porcentaje de consumo o producción de energía por cada dispositivo. Úsalo para identificar qué aparatos consumen más y optimizar tu uso.
            </Text>
            <TouchableOpacity onPress={() => setInfoVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


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
    shadowColor: "rgba(211, 84, 0, 0.1)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6, // Efecto de sombra en Android
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
    borderRadius: 30,  // Bordes redondeados
    padding: 30,  // Espaciado interno
    marginTop: 25,  // Espacio superior
    marginBottom: 45,  // Espacio inferior
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
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  legendContainer: {
    marginTop: 10, 
    width: "100%" 
  },
  legendContainer: {
    marginTop: 10,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    padding: 4,
  },
  legendItemActive: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: "MontserratAlternates-Medium",
    color: "#333",
  },
  legendTextActive: {
    color: "#000",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
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
  backgroundColor: '#FFA500',
  borderRadius: 20,
},
closeButtonText: {
  color: 'white',
  fontWeight: '600',
},

});
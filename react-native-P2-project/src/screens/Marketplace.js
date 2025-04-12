import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Modal, TextInput, CheckBox } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import NavBar from "../components/NavBar"; 
import Bubble from "../components/Bubble"; 


export default function Marketplace() {
  const [mode, setMode] = useState("Ordenes");
  const [orders, setOrders] = useState([
    { id: 1, name: "Jerónimo Perez Baquero", kWh: "20.00 kWh", price: "$5.0", status: "Aprobado" },
    { id: 2, name: "Juan Jose Cañón", kWh: "350.70 kWh", price: "$20.0", status: "Multado" }
  ]);
  const [sales, setSales] = useState([
    { id: 1, name: "Jerónimo", kWh: "20.00 kWh", price: "$5.0", status: "Procesando", date: "09/02/2025" }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Barra de estado */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Encabezado con las burbujas */}
      <View style={styles.bubblesContainer}>
        <Bubble size={330} color="#AED6F1" position={{ top: -260, left: -90 }} />
        <Bubble size={330} color="#AED6F1" position={{ top: -260, left: 150 }} />
        <Bubble size={330} color="#1F4E78" position={{ top: -275, left: 40 }} />
      </View>

      
      <View style={styles.buttonContainer}>

      <TouchableOpacity 
          onPress={() => setMode("Compra de Energía")}
          style={[styles.toggleButton, mode === "Compra de Energía" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Compra de Energía" && styles.toggleTextActive]}>Compra de Energía</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setMode("Ordenes")}
          style={[styles.toggleButton, mode === "Ordenes" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Ordenes" && styles.toggleTextActive]}>Órdenes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setMode("Ventas")}
          style={[styles.toggleButton, mode === "Ventas" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Ventas" && styles.toggleTextActive]}>Venta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

   
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mode === "Ordenes" && orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <Text style={styles.cardTitle}>{order.name}</Text>
            <Text style={styles.cardValue}>{order.kWh} {order.price}</Text>
            <Text style={[styles.cardStatus, order.status === "Aprobado" ? styles.approved : styles.rejected]}>
              Estado: {order.status}
            </Text>
          </View>
        ))}

        {mode === "Ventas" && (
          <>
           
            
           
            <View style={styles.createOfferContainer}>
              <TouchableOpacity style={styles.createOfferButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.createOfferText}>¡Crear nueva Oferta!</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

             <Text style={styles.salesTitle}>Ventas Realizadas:</Text>

        
            {sales.map((sale) => (
              <View key={sale.id} style={styles.card}>
                <Text style={styles.cardTitle}>Vendido A: {sale.name}</Text>
                <Text style={styles.cardValue}>{sale.kWh} {sale.price}</Text>
                <Text style={[styles.cardStatus, sale.status === "Procesando" ? styles.processing : styles.completed]}>
                  Estado: {sale.status}
                </Text>
                <Text style={styles.saleDate}>Fecha de venta: {sale.date}</Text>
              </View>
            ))}
          </>
        )}
        
        {mode === "Compra de Energía" && (
          <>
            
            {orders.map((order) => (
              <View key={order.id} style={styles.card}>
                <Text style={styles.cardTitle}>{order.name}</Text>
                <Text style={styles.cardValue}>{order.kWh} {order.price}</Text>
                <TouchableOpacity style={styles.obtainButton}>
                  <Text style={styles.obtainText}>Obtener</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

      </ScrollView>

         {/* Modal para crear nueva oferta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
          <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Cerrar el modal
            >
              <FontAwesome5 name="times" size={24} color="#D35400" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Crear nueva Oferta</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad de Energía (kWh)"
            />
            <TextInput
              style={styles.input}
              placeholder="Precio por Unidad"
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Expiración"
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Transferencia"
            />
            {/* <View style={styles.checkboxContainer}>
              
              <Text style={styles.checkboxText}>Acepto los términos</Text>
            </View> */}
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>¡Poner en venta!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      <NavBar style={{ backgroundColor: "#1F4E78" }} />
    </View>
  );
}


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
  buttonContainer: {
    flexDirection: "column",  
    justifyContent: "center",
    marginTop: 80,  
    marginBottom: 20,
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#D7EFFF",
    paddingVertical: 5,
    paddingHorizontal: 25,

    borderRadius: 30,
    marginVertical: 5, 
    alignItems: "center",
    
  },
  toggleButtonActive: {
    backgroundColor: "#3498DB",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#1F4E78",
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
    borderRadius: 30,
    marginTop: 20,
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
    fontFamily: "MontserratAlternates-Medium",
    textAlign: "center",
  },
  cardValue: {
    fontSize: 25,
   
    fontFamily: "MontserratAlternates-Bold",
    color: "#4F4F4F",
    marginVertical: 10,
  },
  cardStatus: {
    fontSize: 14,
    fontFamily: "MontserratAlternates-Bold",
  },
  approved: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  processing: {
    color: "orange",
  },
  completed: {
    color: "green",
  },
  saleDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontFamily: "MontserratAlternates-Medium",
  },
  createOfferContainer: {
    marginBottom: 60,
    marginTop: 60,
    alignItems: "center",
  },
  createOfferButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  createOfferText: {
    color: "white",
    fontFamily: "MontserratAlternates-SemiBold",
    fontSize: 18,
  },
  salesTitle: {
    fontSize: 25,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#4F4F4F",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 20,
  },
  separator: {
    height: 1, // Grosor de la línea
    backgroundColor: '#ddd',
    width: '70%',
    alignSelf: 'center',
  },
  obtainButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  obtainText: {
    color: "white",
    fontFamily: "MontserratAlternates-SemiBold",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#D35400",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "MontserratAlternates-Bold",
    color: "#D35400",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily: "MontserratAlternates-Medium",
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 5,
    fontFamily: "MontserratAlternates-Medium",
    color: "#666",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#D35400",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});


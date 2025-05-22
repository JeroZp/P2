import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Animated, StyleSheet, Modal, TextInput, CheckBox, TouchableWithoutFeedback, } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import Bubble from "../components/Bubble";
import Checkbox from 'expo-checkbox';
import LoadingDots from '../components/LoadingDots';
import { showMessage } from 'react-native-flash-message';
import { getMarketOffers, getMyOffers, createOffer, deleteOffer, getMyPurchases, getMySales, purchaseOffer, acceptContract, rejectContract } from "../services/marketplaceService";
import { CONTRACT_STATES, STATE_LABELS, OFFER_STATE } from '../constants/contractStates';


export default function Marketplace() {
  const [mode, setMode] = useState("Compra de Energía");
  const [showPassword, setShowPassword] = useState(false);

  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleObtainPress = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };



  // animado para el carrito
  const cartAnim = useRef(new Animated.Value(0)).current;
  const hasProcessingSale = sales.some(s => s.status === CONTRACT_STATES.PENDING);

  useEffect(() => {
    if (hasProcessingSale && mode === "Ventas") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cartAnim, {
            toValue: 8,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(cartAnim, {
            toValue: -8,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      cartAnim.stopAnimation();
      cartAnim.setValue(0);
    }
  }, [hasProcessingSale, mode]);


  // Datos del formulario de oferta

  const [offerForm, setOfferForm] = useState({
    quantity: '',
    price: '',
    expirationDate: '',
    transferDate: '',
  });


  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteOffer(offerId);
      // Actualización optimista del estado
      setSales(prevSales => prevSales.filter(offer => offer.id !== offerId));

      showMessage({
        message: 'Oferta eliminada',
        type: 'success',
        duration: 3000,
      });
    } catch (e) {
      showMessage({
        message: 'Error eliminando oferta',
        description: e.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };

  // Cargar datos según el modo
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (mode === "Compra de Energía") {
          const offers = await getMarketOffers();
          setOrders(offers.map(offer => ({
            id: offer.id,
            name: `${offer.names} ${offer.surnames}`.trim(),
            kWh: `${offer.quantity} kWh`,
            price: `$${offer.value}`,
            status: "Disponible"
          })));
        } else if (mode === "Ordenes") {
          // Para compras:
          const purchases = await getMyPurchases();
          setOrders(purchases.map(purchase => ({
            id: purchase.id,
            name: `${purchase.seller_names} ${purchase.seller_surnames}`.trim(),
            kWh: `${purchase.quantity} kWh`,
            price: `$${purchase.agreed_price}`,
            status: purchase.status,
            statusLabel: STATE_LABELS[purchase.status] || purchase.status,
            date: new Date(purchase.created_at).toLocaleDateString(),
            isContractAvailable: !!purchase.contract_pdf_path
          })));
        } else if (mode === "Ventas") {
          // Para ventas:
          const [myOffers, mySales] = await Promise.all([
            getMyOffers(),
            getMySales()
          ]);

          // Mapear ofertas propias (disponibles)
          const offersData = myOffers.map(offer => ({
            id: offer.id,
            type: 'offer',
            name: "Oferta disponible",
            kWh: `${offer.quantity} kWh`,
            price: `$${offer.value}`,
            status: OFFER_STATE.ACTIVE,
            statusLabel: 'Disponible',
            date: offer.offerDate ? new Date(offer.offerDate).toLocaleDateString() : 'Fecha no disponible',
            isMine: true
          }));

          // Mapear ventas concretadas
          const salesData = mySales.map(sale => ({
            id: sale.id,
            type: 'sale',
            name: `${sale.buyer_names} ${sale.buyer_surnames}`.trim() || "Comprador",
            kWh: `${sale.quantity} kWh`,
            price: `$${sale.agreed_price}`,
            status: sale.status || CONTRACT_STATES.PENDING,
            statusLabel: STATE_LABELS[sale.status] || 'Pendiente',
            date: sale.created_at ? new Date(sale.created_at).toLocaleDateString() : 'Fecha no disponible',
            isContractAvailable: !!sale.contract_pdf_path
          }));

          // Combinar y ordenar por fecha
          setSales([...offersData, ...salesData].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
          ));
        }
      } catch (error) {
        showMessage({
          message: 'Error cargando datos',
          description: error.message,
          type: 'danger',
          icon: 'auto',
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mode]);

  // Manejar creación de nueva oferta
  const handleCreateOffer = async () => {
    try {
      const rawPrice = parseInt(
        offerForm.price.replace(/\D/g, ""), // quita todo lo que no es dígito
        10
      );
      await createOffer({
        quantity: parseFloat(offerForm.quantity),
        value: rawPrice,
        offerdate: new Date().toISOString()
      });

      setShowCreateModal(false);
      setOfferForm({
        quantity: '',
        price: '',
        expirationDate: '',
        transferDate: ''
      });

      // Recargar ofertas
      if (mode === "Ventas") {
        const myOffers = await getMyOffers();
        setSales(myOffers.map(offer => ({
          id: offer.id,
          name: "Comprador",
          kWh: `${offer.quantity} kWh`,
          price: `$${offer.value}`,
          status: "Disponible",
          date: new Date(offer.offerdate).toLocaleDateString()
        })));
      }
    } catch (error) {
      showMessage({
        message: 'Error creando oferta',
        description: error,
        type: 'danger',
        icon: 'auto',
        duration: 3000,
      });
    }
  };

  // compra de oferta
  const handlePurchase = async (offerId) => {
    try {
      setShowDetailsModal(false);
      const result = await purchaseOffer(offerId);

      showMessage({
        message: 'Compra exitosa',
        description: 'La oferta ha sido comprada con éxito',
        type: 'success',
        icon: 'auto',
        duration: 3000,
      });

      // Actualizar la lista de ofertas
      const offers = await getMarketOffers();
      setOrders(offers.map(offer => ({
        id: offer.id,
        name: `${offer.names} ${offer.surnames}`.trim(),
        kWh: `${offer.quantity} kWh`,
        price: `$${offer.value}`,
        status: "Disponible"
      })));

    } catch (error) {
      showMessage({
        message: 'Error en la compra',
        description: error.message,
        type: 'danger',
        icon: 'auto',
        duration: 3000,
      });
    }
  };

  const handleAcceptSale = async (contractId) => {
    try {
      setLoading(true);
      // Actualización optimista primero
      setSales(prev => prev.map(item =>
        item.id === contractId
          ? { ...item, status: CONTRACT_STATES.COMPLETED, statusLabel: STATE_LABELS[CONTRACT_STATES.COMPLETED] }
          : item
      ));

      // Llamada a la API
      await acceptContract(contractId);

      showMessage({
        message: 'Venta aceptada',
        description: 'Has confirmado la transacción exitosamente',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      // Revertir en caso de error
      setSales(prev => prev.map(item =>
        item.id === contractId
          ? { ...item, status: CONTRACT_STATES.PENDING, statusLabel: STATE_LABELS[CONTRACT_STATES.PENDING] }
          : item
      ));

      showMessage({
        message: 'Error al aceptar venta',
        description: error.message,
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRejectSale = async (contractId) => {
    try {
      setLoading(true);
      // Actualización optimista primero
      setSales(prev => prev.map(item =>
        item.id === contractId
          ? { ...item, status: CONTRACT_STATES.CANCELLED, statusLabel: STATE_LABELS[CONTRACT_STATES.CANCELLED] }
          : item
      ));

      // Llamada a la API
      await rejectContract(contractId);

      showMessage({
        message: 'Venta rechazada',
        description: 'Has cancelado esta transacción',
        type: 'warning',
        duration: 3000,
      });
    } catch (error) {
      // Revertir en caso de error
      setSales(prev => prev.map(item =>
        item.id === contractId
          ? { ...item, status: CONTRACT_STATES.PENDING, statusLabel: STATE_LABELS[CONTRACT_STATES.PENDING] }
          : item
      ));

      showMessage({
        message: 'Error al rechazar venta',
        description: error.message,
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatToCOP = (input = "") => {
    // quita todo menos dígitos
    const digits = input.replace(/\D/g, "");
    if (!digits) return "";
    // convierte a entero
    const num = parseInt(digits, 10);
    // añade separadores de miles
    const withThousands = num
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ` ${withThousands}`;
  };

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
          <Text style={[styles.toggleText, mode === "Compra de Energía" && styles.toggleTextActive]}>Tienda de Energía</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("Ordenes")}
          style={[styles.toggleButton, mode === "Ordenes" && styles.toggleButtonActive]}
        >
          <Text style={[styles.toggleText, mode === "Ordenes" && styles.toggleTextActive]}>Ordenes y Compras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("Ventas")}
          style={[
            styles.toggleButton,
            mode === "Ventas" && styles.toggleButtonActive
          ]}
        >
          {/* Texto del botón */}
          <Text style={[
            styles.toggleText,
            mode === "Ventas" && styles.toggleTextActive
          ]}>
            Ventas y Pedidos



            {hasProcessingSale && mode === "Ventas" && (
              <Animated.View
                style={{
                  marginLeft: 30,
                  transform: [{ translateX: cartAnim }]
                }}
              >
                <FontAwesome5 name="shopping-cart" size={14} color="#fff" />
              </Animated.View>
            )}
          </Text>


        </TouchableOpacity>
      </View>

      {/* <View style={styles.separator} /> */}

      {loading ? (
        <View style={styles.loaderContainer}>
          <LoadingDots />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {mode === "Compra de Energía" && (
            <>

              {orders.map((order) => (
                <View key={order.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{order.name}</Text>
                  <Text style={styles.cardValue}>{order.kWh} {order.price}</Text>
                  <TouchableOpacity
                    style={styles.obtainButton}
                    onPress={() => handleObtainPress(order)}
                  >
                    <Text style={styles.obtainText}>Obtener</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}


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


              <View style={styles.createContainer}>
                <View style={styles.createOfferContainer}>
                  <TouchableOpacity
                    style={styles.createOfferButton}
                    onPress={() => setShowCreateModal(true)}
                  >
                    <Text style={styles.createOfferText}>¡Crear nueva Oferta!</Text>
                  </TouchableOpacity>
                </View>
              </View>



              <Text style={styles.salesTitle}>Lista de Ventas:</Text>


              {sales.map((sale) => {
                switch (sale.status) {
                  case CONTRACT_STATES.COMPLETED:
                    return (
                      <View key={sale.id} style={styles.card}>
                        <Text style={styles.cardTitle}>Venta completada a: {sale.name}</Text>
                        <Text style={styles.cardValue}>{sale.kWh} {sale.price}</Text>
                        <Text style={[styles.cardStatus, styles.completed]}>
                          Estado: {sale.statusLabel}
                        </Text>
                      </View>
                    );

                  case OFFER_STATE.ACTIVE:
                    return (
                      <View key={sale.id} style={styles.card}>
                        <Text style={styles.cardTitle}>Oferta disponible</Text>
                        <Text style={styles.cardValue}>{sale.kWh} {sale.price}</Text>
                        <Text style={[styles.cardStatus, styles.available]}>
                          Estado: {sale.statusLabel}
                        </Text>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDeleteOffer(sale.id)}
                        >
                          <FontAwesome5 name="trash-alt" size={20} color="#DC3545" />
                        </TouchableOpacity>
                      </View>
                    );

                  case CONTRACT_STATES.PENDING:
                    return (
                      <View key={sale.id} style={styles.card}>
                        <Text style={styles.cardTitle}>Venta pendiente a: {sale.name}</Text>
                        <Text style={styles.cardValue}>{sale.kWh} {sale.price}</Text>
                        <Text style={[styles.cardStatus, styles.pending]}>
                          Estado: {sale.statusLabel}
                        </Text>
                        <View style={styles.actionButtons}>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.acceptButton]}
                            onPress={() => handleAcceptSale(sale.id)}
                            disabled={loading}
                          >
                            <Text style={styles.actionButtonText}>Aceptar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.rejectButton]}
                            onPress={() => handleRejectSale(sale.id)}
                            disabled={loading}
                          >
                            <Text style={styles.actionButtonText}>Rechazar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );

                  case CONTRACT_STATES.CANCELLED:
                    return (
                      <View key={sale.id} style={styles.card}>
                        <Text style={styles.cardTitle}>Venta cancelada</Text>
                        <Text style={styles.cardValue}>{sale.kWh} {sale.price}</Text>
                        <Text style={[styles.cardStatus, styles.cancelled]}>
                          Estado: {sale.statusLabel}
                        </Text>
                      </View>
                    );

                  default:
                    return null;
                }
              })}
            </>
          )}


        </ScrollView>
      )}

      {/* — Modal de DETALLES de Orden — */}

      <Modal
        animationType="slide"
        transparent
        visible={showDetailsModal}
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDetailsModal(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDetailsModal(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>

                {selectedOrder && (
                  <>
                    <Text style={styles.modalTitle}>Detalles de la Orden</Text>
                    <Text style={styles.modalText}>
                      Nombre del Vendedor: {selectedOrder.name}
                    </Text>
                    <Text style={styles.modalText}>
                      Energía: {selectedOrder.kWh}
                    </Text>
                    <Text style={styles.modalText}>
                      Precio: {selectedOrder.price}
                    </Text>
                  </>
                )}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    handlePurchase(selectedOrder.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <Text style={styles.submitButtonText}>¡Comprar!</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* — Modal de CREAR OFERTA — */}
      <Modal
        animationType="slide"
        transparent
        visible={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCreateModal(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>

                {/* aquí tu formulario */}
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad de Energía (Wh)"
                  placeholderTextColor="#888"
                  value={offerForm.quantity}
                  onChangeText={t => setOfferForm({ ...offerForm, quantity: t })}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Precio por la energía ($)"
                  placeholderTextColor="#888"
                  value={offerForm.price}
                  onChangeText={t => {
                    const formatted = formatToCOP(t);
                    setOfferForm({ ...offerForm, price: formatted });
                  }}
                  keyboardType="numeric"
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={async () => {
                    await handleCreateOffer();
                    setShowCreateModal(false);
                  }}
                >
                  <Text style={styles.submitButtonText}>¡Poner en venta!</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    justifyContent: "center",
    borderRadius: 30,
    marginVertical: 5,
    alignItems: "center",
    textAlignVertical: "center",
    flexDirection: "row",

  },
  toggleButtonActive: {
    backgroundColor: "#3498DB",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "MontserratAlternates-SemiBold",
    color: "#1F4E78",
    textAlignVertical: "center",
  },
  toggleTextActive: {
    color: "white",
    textAlignVertical: "center",
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
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "MontserratAlternates-Medium",
    textAlign: "center",
  },
  cardValue: {
    fontSize: 25,
    textAlign: "center",
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
  createContainer: {
    backgroundColor: "rgba(255,183,77,0.13)",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
  },
  createOfferContainer: {
    margin: 40,
    alignItems: "center",
  },
  createOfferButton: {
    backgroundColor: "#FFA500",
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
    backgroundColor: "#FFA500",
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
  modalText: {
    fontSize: 16,
    fontFamily: "MontserratAlternates-Medium",
    color: "#666",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
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
    fontFamily: "MontserratAlternates-SemiBold",
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "38%",
  },
  acceptButton: {
    backgroundColor: "#68a765", // Verde para aceptar
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: "#ef8989", // Rojo para rechazar
  },
  actionButtonText: {
    color: "white",
    fontFamily: "MontserratAlternates-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,  // para no solaparse con el NavBar
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: "#FDEDEC",
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
});


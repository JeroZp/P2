import { StyleSheet } from 'react-native';

const cpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  bubblesContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    alignItems: "center",
    zIndex: -1,
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
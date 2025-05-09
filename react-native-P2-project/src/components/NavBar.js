import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({ style }) => {
  const navigation = useNavigation();

  // Mapeo de nombres de ruta a claves de pestaña
  const routeToTab = {
    Login: null,
    Registro: null,
    CP: "CP",
    Marketplace: "Marketplace",
  };

  // Obtenemos el estado del router y la ruta activa
  const navState = navigation.getState();
  const activeRouteName = navState?.routes[navState.index]?.name;
  const selectedTab = routeToTab[activeRouteName] || "CP";

  const tabs = [
    { screen: "CP", tab: "CP", icon: "bars", label: "Dashboard" },
    { screen: null, tab: "Light", icon: "lightbulb", label: "Light" },
    { screen: "Marketplace", tab: "Marketplace", icon: "shopping-cart", label: "Marketplace" },
    { screen: null, tab: "User", icon: "user", label: "User" }
  ];

  return (
    <View style={[styles.navBar, style]}>
      {tabs.map(({ screen, tab, icon, label }) => (
        <TouchableOpacity
          key={tab}
          style={styles.navItem}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => screen && navigation.navigate(screen)}
        >
          <FontAwesome5
            name={icon}
            size={22}
            color={selectedTab === tab ? "#FFFFFF" : "rgba(255,255,255,0.6)"}
          />
          {selectedTab === tab && <Text style={styles.navText}>{label}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 25,
    //backgroundColor: "#1E8449",
    //backgroundColor: "#1F4E78",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  navItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  navText: {
    fontSize: 10,
    color: "white",
    fontFamily: "MontserratAlternates-Bold",
    marginTop: 4, // Espaciado entre icono y texto
  },

});

export default NavBar;

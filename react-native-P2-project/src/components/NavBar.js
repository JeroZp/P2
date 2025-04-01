import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Dashboard"); // Inicialmente muestra "Dashboard"

  const handlePress = (screen, tab) => {
    setSelectedTab(tab);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navBar}>
      {/* Opción de Dashboard */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("CP", "Dashboard")}
      >
        <FontAwesome5 name="bars" size={18} color="white" />
        {selectedTab === "Dashboard" && <Text style={styles.navText}>Dashboard</Text>}
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="chart-line" size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="lightbulb" size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="shopping-cart" size={22} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome5 name="user" size={22} color="white" />
      </TouchableOpacity>
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
     paddingVertical: 15,
     backgroundColor: "#1E8449",
     borderTopLeftRadius: 25,
     borderTopRightRadius: 25,
   },
   navItem: {
     alignItems: "center",
   },
   navText: {
     fontSize: 10,
     color: "white",
     fontFamily: "MontserratAlternates-Bold",
     marginTop: 4, // Espaciado entre icono y texto
   },

   });

export default NavBar;

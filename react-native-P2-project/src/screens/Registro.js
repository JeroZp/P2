import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import registerStyles from '../../assets/styles/registerStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bubble from '../components/Bubble';

export default function Registro() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // Margen seguro dinámico

  // Estados de los inputs
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cedula, setCedula] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Animación de opacidad
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Escuchar eventos del teclado con animación
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 0, // Se desvanece
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      Animated.timing(fadeAnim, {
        toValue: 1, // Reaparece
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fadeAnim]);

  return (
    <SafeAreaView style={[registerStyles.safeArea, { paddingBottom: insets.bottom, flex: 1 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[registerStyles.container, { paddingBottom: insets.bottom }]}>

          {/* Bolitas decorativas */}
          <Bubble size={330} color="#AED6F1" position={{ top: -240, left: -90 }} />
          <Bubble size={330} color="#1F4E78" position={{ top: -265, left: 70 }} />

          <Animated.View style={{ opacity: fadeAnim }}>
            <Bubble size={270} color="#AED6F1" position={{ top: 440, left: 110 }} />
            <Bubble size={330} color="#1F4E78" position={{ top: 550, left: -60 }} />
          </Animated.View>

          {/* Botón de "Inicia sesión" con animación */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={registerStyles.registerButton}>
              <Text style={registerStyles.registerText}>Inicia sesión</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Logo con animación */}
          <Animated.View style={{ opacity: fadeAnim }}>
                       <Text style={registerStyles.logo}>ENERGÍA COMUNIDAD</Text>
                    </Animated.View>

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={registerStyles.title}>Registro</Text>
          </Animated.View>

          {/* Contenedor de los inputs */}
          <View style={registerStyles.inputWrapper}>
            <View style={registerStyles.inputContainer}>

              {/* Usuario */}
              <View style={[registerStyles.inputField, registerStyles.inputWithBorder]}>
                <FontAwesome5 name="user" size={18} color="#666" style={registerStyles.inputIcon} />
                <TextInput
                  style={registerStyles.input}
                  placeholder="Nombre"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#666"
                  keyboardType="default"
                  returnKeyType="next"
                />
              </View>

              <View style={registerStyles.separator} />

              {/* Apellidos */}
              <View style={[registerStyles.inputField, registerStyles.inputWithBorder]}>
                <FontAwesome5 name="user" size={18} color="#666" style={registerStyles.inputIcon} />
                <TextInput
                  style={registerStyles.input}
                  placeholder="Apellidos"
                  value={lastname}
                  onChangeText={setLastname}
                  placeholderTextColor="#666"
                  keyboardType="default"
                  returnKeyType="next"
                />
              </View>

              <View style={registerStyles.separator} />

              {/* Correo Electrónico */}
              <View style={[registerStyles.inputField, registerStyles.inputWithBorder]}>
                <FontAwesome5 name="envelope" size={18} color="#666" style={registerStyles.inputIcon} />
                <TextInput
                  style={registerStyles.input}
                  placeholder="Correo"
                  value={correo}
                  onChangeText={setCorreo}
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>

              <View style={registerStyles.separator} />

              {/* Contraseña */}
              <View style={registerStyles.inputField}>
                <FontAwesome5 name="lock" size={18} color="#666" style={registerStyles.inputIcon} />
                <TextInput
                  style={registerStyles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  value={contraseña}
                  onChangeText={setContraseña}
                  placeholderTextColor="#666"
                  returnKeyType="done"
                />
              </View>

              <View style={registerStyles.separator} />

              {/* Identificación */}
              <View style={registerStyles.inputField}>
                <FontAwesome5 name="address-card" size={18} color="#666" style={registerStyles.inputIcon} />
                <TextInput
                  style={registerStyles.input}
                  placeholder="Cédula"
                  value={cedula}
                  onChangeText={setCedula}
                  placeholderTextColor="#666"
                  returnKeyType="done"
                />
              </View>

              {/* Botón de Registro  */}
              <TouchableOpacity style={registerStyles.loginButton}>
                <FontAwesome5 name="arrow-right" size={20} color="white" />
              </TouchableOpacity>


            </View>
          </View>



        </View>


      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import registerStyles from '../../assets/styles/registerStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bubble from '../components/Bubble';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signupUser } from '../services/authService';

export default function Registro() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Estados de los inputs
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cedula, setCedula] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [showPassword, setShowPassword] = useState(false);

  // Animación del teclado
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  const handleSignup = async () => {
    // Validaciones
    if (!name.trim() || !lastname.trim() || !correo.trim() || !contraseña.trim() || !cedula.trim()) {
      showMessage({
        message: '¡Ups!',
        description: 'Todos los campos son obligatorios.',
        type: 'warning',
        icon: 'auto',
        duration: 2500,
      });
      return;
    }
    if (contraseña.length < 6) {
      showMessage({
        message: '¡Ups!',
        description: 'La contraseña debe tener al menos 6 caracteres.',
        type: 'warning',
        icon: 'auto',
        duration: 2500,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      showMessage({
        message: '¡Ups!',
        description: 'El correo no tiene un formato válido.',
        type: 'warning',
        icon: 'auto',
        duration: 2500,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await signupUser(name, lastname, correo, contraseña, 'Residencial', cedula);
      await AsyncStorage.setItem('userToken', response.token);
      navigation.navigate('C&P');
    } catch (error) {
      showMessage({
        message: '¡Error!',
        description: 'No se pudo registrar el usuario. Intenta de nuevo.',
        type: 'danger',
        icon: 'auto',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[registerStyles.safeArea, { paddingBottom: insets.bottom, flex: 1 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[registerStyles.container, { paddingBottom: insets.bottom }]}>

          {/* Bolitas decorativas */}
          <Bubble size={330} color="#AED6F1" position={{ top: -262, left: -90 }} />
          <Bubble size={330} color="#1F4E78" position={{ top: -280, left: 70 }} />

          

          {/* Botón de "Inicia sesión" con animación */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={registerStyles.registerButton}>
              <Text style={registerStyles.registerText}>¡Inicia sesión!</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Logo con animación */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={registerStyles.logo}>ENERGÍA COMUNIDAD</Text>
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
                  secureTextEntry={!showPassword}
                  value={contraseña}
                  onChangeText={setContraseña}
                  placeholderTextColor="#666"
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ marginRight: 20 }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={18} color="#666" />
                </TouchableOpacity>
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
              <TouchableOpacity
              style={[
                registerStyles.loginButton,
                isLoading && { opacity: 0.5 }
              ]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading
                ? <ActivityIndicator size="large" color="#fff" />
                : <FontAwesome5 name="arrow-right" size={20} color="white" />
              }
            </TouchableOpacity>


            </View>
          </View>

          <Animated.View style={{ opacity: fadeAnim }}>
            <Bubble size={270} color="#AED6F1" position={{ top: -70, left: 110 }} />
            <Bubble size={330} color="#1F4E78" position={{ top: 25, left: -60 }} />
          </Animated.View>

        </View>

      
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

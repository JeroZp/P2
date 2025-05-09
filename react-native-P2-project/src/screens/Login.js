import {  Alert, } from 'react-native'; // alertas -> backend
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import loginStyles from '../../assets/styles/loginStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bubble from '../components/Bubble';
import { loginUser } from '../services/authService'; // Importar el servicio de autenticación -> backend
import { storeToken } from '../utils/storage'; // Importar la utilidad para almacenar el token -> backend


export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // Cambiar de "usuario" a "email" -> backend
  const [password, setPassword] = useState(''); // Cambiar de "contraseña" a "password" -> backend
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Estado del teclado
  const insets = useSafeAreaInsets(); // Margen seguro dinámico
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animación de opacidad
  const fadeAnim = useRef(new Animated.Value(1)).current; // Inicia visible

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
  }, []);

  // Manejar el inicio de sesión -> backend
  const handleLogin = async () => {
    
    if (!email.trim() || !password.trim()) {
      showMessage({
        message: '¡Ups!',
        description: 'Por favor ingresa correo y contraseña.',
        type: 'warning',
        icon: 'auto',
        duration: 5500,
      });
      return;
    } 
    setIsLoading(true);
    try {
      const { token } = await loginUser(email, password);
      await storeToken(token);
      navigation.navigate('CP');
      
    } catch (error) {
      
      showMessage({
        message: '¡Ups! No pudimos iniciar sesión',
        description: 'Revisa tu correo y contraseña e inténtalo de nuevo.',
        type: 'danger',
        icon: 'auto',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <SafeAreaView style={[loginStyles.safeArea, { paddingBottom: insets.bottom, flex: 1 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[loginStyles.container, { paddingBottom: insets.bottom }]}>

          <Bubble size={330} color="#6FCF97" position={{ top: -240, left: -90 }} />
          <Bubble size={330} color="#1E8449" position={{ top: -265, left: 70 }} />

          {/* Bolitas decorativas */}
          <Animated.View style={{ opacity: fadeAnim }}>

            <Bubble size={270} color="#6FCF97" position={{ top: 440, left: 110 }} />
            <Bubble size={330} color="#1E8449" position={{ top: 550, left: -60 }} />
          </Animated.View>

          {/* Fondo decorativo */}
          <View style={loginStyles.topBackground} />
          <View style={loginStyles.bottomBackground} />

          {/* Logo (Desaparece con el teclado) */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={loginStyles.logo}>ENERGÍA COMUNIDAD</Text>

          </Animated.View>

          <Text style={loginStyles.title}>Iniciar sesión</Text>

          {/* Contenedor de los inputs */}
          <View style={loginStyles.inputWrapper}>
            <View style={loginStyles.inputContainer}>
              {/* Usuario */}
              <View style={[loginStyles.inputField, loginStyles.inputWithBorder]}>
                <FontAwesome5 name="user" size={18} color="#666" style={loginStyles.inputIcon} />
                <TextInput
                  style={loginStyles.input}
                  placeholder="Correo" // cambio usario por correo -> backend
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#666"
                  keyboardType="email-address" // teclado para email -> backend
                  returnKeyType="next"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>

              <View style={loginStyles.separator} />

              {/* Contraseña */}
              <View style={loginStyles.inputField}>
                <FontAwesome5 name="lock" size={18} color="#666" style={loginStyles.inputIcon} />
                <TextInput
                  style={loginStyles.input}
                  placeholder="Contraseña"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#666"
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ marginRight: 40 }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <FontAwesome5 name={showPassword ? 'eye' : 'eye-slash'} size={18} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Botón de inicio */}
              <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading
                ? (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                  />
                )
                : (
                  <FontAwesome5
                    name="arrow-right"
                    size={20}
                    color="white"
                  />
                )
              }
            </TouchableOpacity>
            </View>
          </View>

          {/* Recuperación */}
          <TouchableOpacity>
            <Text style={loginStyles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Registro (Desaparece con el teclado) */}
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={loginStyles.registerButton}>
              <Text style={loginStyles.registerText}>Registro</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

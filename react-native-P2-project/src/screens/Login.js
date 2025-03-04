import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import loginStyles from '../../assets/styles/loginStyles';

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Cierra el teclado al tocar fuera */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={loginStyles.container}>

          {/* Fondo decorativo */}
          <View style={loginStyles.topBackground} />
          <View style={loginStyles.bottomBackground} />

          {/* Logo  */}
          <Text style={loginStyles.logo}>ENERGÍA COMUNIDAD</Text>
          <Text style={loginStyles.title}>Iniciar sesión</Text>

          {/* Contenedor de los inputs */}
          <View style={loginStyles.inputWrapper}>
            <View style={loginStyles.inputContainer}>
            
              {/* Usuario */}
              <View style={[loginStyles.inputField, loginStyles.inputWithBorder]}>
                <FontAwesome5 name="user" size={18} color="#666" style={loginStyles.inputIcon} />
                <TextInput
                  style={loginStyles.input}
                  placeholder="Usuario"
                  value={usuario}
                  onChangeText={setUsuario}
                  placeholderTextColor="#666"
                  keyboardType="default"
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
                  secureTextEntry
                  value={contraseña}
                  onChangeText={setContraseña}
                  placeholderTextColor="#666"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
              </View>

              {/* Botón de inicio */}
              <TouchableOpacity style={loginStyles.loginButton}>
                <FontAwesome5 name="arrow-right" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recuperación */}
          <TouchableOpacity>
            <Text style={loginStyles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Registro */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={loginStyles.registerButton}>
            <Text style={loginStyles.registerText}>Registro</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}



import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Bubble from '../components/Bubble';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { updateUserEmail } from '../services/authService'; // Importa la función para actualizar el email

export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    photoURL:
      'https://media.istockphoto.com/id/1389348844/es/foto/foto-de-estudio-de-una-hermosa-joven-sonriendo-mientras-est%C3%A1-de-pie-sobre-un-fondo-gris.jpg?s=612x612&w=0&k=20&c=kUufmNoTnDcRbyeHhU1wRiip-fNjTWP9owjHf75frFQ=',
    email: 'userTest@test.com',
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false);

  const invoices = [
    { id: 'F001', date: '2025-04-01', amount: '$120,000' },
    { id: 'F002', date: '2025-03-01', amount: '$115,500' },
    { id: 'F003', date: '2025-02-01', amount: '$130,200' },
  ];

  const toggleNotifications = (value) =>
    setUser((prev) => ({ ...prev, notifications: value }));

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const startEditEmail = () => {
    setEmailInput(user.email);
    setIsEditingEmail(true);
  };

  const saveEmail = async () => {
    // Validación básica del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    try {
      // Llamar al servicio real
      const response = await updateUserEmail(emailInput);

      // Actualizar el estado local si la llamada fue exitosa
      setUser({ ...user, email: emailInput });
      setIsEditingEmail(false);

      Alert.alert('Éxito', 'Email actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo actualizar el email');
      console.error('Error updating email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEditEmail = () => {
    setIsEditingEmail(false);
  };

  const handleEditPhoto = () => {
    // Placeholder for image picker
    alert('Funcionalidad de editar foto no implementada.');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Bubble size={330} color="#6FCF97" position={{ top: -260, left: -90 }} />
      <Bubble size={330} color="#6FCF97" position={{ top: -260, left: 150 }} />
      <Bubble size={330} color="#1E8449" position={{ top: -275, left: 40 }} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditPhoto}>
              <FontAwesome5 name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.fullName}>Grid Community</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <FontAwesome5 name="envelope" size={18} color="#4F4F4F" />
            {isEditingEmail ? (
              <TextInput
                style={styles.inputField}
                value={emailInput}
                onChangeText={setEmailInput}
                keyboardType="email-address"
                autoFocus
              />
            ) : (
              <Text style={styles.infoText}>{user.email}</Text>
            )}
            {isEditingEmail ? (
              <>
                <TouchableOpacity onPress={saveEmail} style={styles.editConfirmButton}>
                  <FontAwesome5 name="check" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelEditEmail} style={styles.editCancelButton}>
                  <FontAwesome5 name="times" size={16} color="#fff" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={startEditEmail} style={styles.editButton}>
                <FontAwesome5 name="edit" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>


          {/* <View style={styles.infoRow}>
            <FontAwesome5 name="id-card" size={18} color="#4F4F4F" />
            <Text style={styles.infoText}>ID Cliente: {user.clientId}</Text>
          </View> */}

          <View style={styles.infoRow}>
            <FontAwesome5 name="bell" size={18} color="#4F4F4F" />
            <Text style={styles.infoText}>Notificaciones</Text>
            <Switch
              value={user.notifications}
              onValueChange={toggleNotifications}
            />
          </View>


          {/* <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Últimas Facturas</Text>
          {invoices.map((inv) => (
            <View key={inv.id} style={styles.invoiceRow}>
              <Text style={styles.invoiceText}>{inv.id} - {inv.date}</Text>
              <Text style={styles.invoiceAmount}>{inv.amount}</Text>
            </View>
          ))} */}


        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={18} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBar style={{ backgroundColor: '#1E8449' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { paddingTop: 100, paddingBottom: 80, alignItems: 'center' },
  profileCard: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    marginTop: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E8449',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: { fontSize: 16, fontFamily: 'MontserratAlternates-SemiBold', color: '#4F4F4F' },
  fullName: { fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F', marginBottom: 8 },
  divider: { width: '80%', height: 1, backgroundColor: '#ddd', marginVertical: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  infoText: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F' },
  inputField: { flex: 1, marginLeft: 8, borderBottomWidth: 1, borderBottomColor: '#1E8449', fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F', paddingVertical: 2 },
  sectionTitle: { fontSize: 14, fontFamily: 'MontserratAlternates-SemiBold', color: '#4F4F4F', marginTop: 12, marginBottom: 6 },
  invoiceRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 4, paddingHorizontal: 10 },
  invoiceText: { fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F' },
  invoiceAmount: { fontSize: 14, fontFamily: 'MontserratAlternates-SemiBold', color: '#2D9CDB' },
  communityAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  editButton: { backgroundColor: '#1E8449', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  editConfirmButton: { backgroundColor: '#28A745', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  editCancelButton: { backgroundColor: '#EB5757', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EB5757', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignSelf: 'center', marginTop: 20 },
  logoutText: { color: 'white', fontSize: 16, fontFamily: 'MontserratAlternates-SemiBold' },
});

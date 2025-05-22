import React, { useState } from 'react';
import {
  View,
  Text,
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

export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    photoURL: 'https://…jpg',
    username: 'Luisa Posada Hernandez',
    fullName: 'Luisa Posada Hernandez',
    email: 'LuipH@gmail.com',
    clientId: 'CL-2025-005',
    notifications: true,
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(user.email);

  const tips = [
    'Revisa tu consumo diario para detectar picos inesperados.',
    'Activa notificaciones para recibir alertas de tarifa.',
    'Participa en el Mercado Energético y maximiza tus ingresos.',
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
  const saveEmail = () => {
    setUser({ ...user, email: emailInput });
    setIsEditingEmail(false);
  };
  const cancelEditEmail = () => {
    setIsEditingEmail(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Bubble size={330} color="#6FCF97" position={{ top: -260, left: -90 }} />
      <Bubble size={330} color="#6FCF97" position={{ top: -260, left: 150 }} />
      <Bubble size={330} color="#1E8449" position={{ top: -275, left: 40 }} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.fullName}>Grid Community</Text>
          <View style={styles.divider} />

          {/* Email */}
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

          {/* Client ID */}
          {/* <View style={styles.infoRow}>
            <FontAwesome5 name="id-card" size={18} color="#4F4F4F" />
            <Text style={styles.infoText}>ID Cliente: {user.clientId}</Text>
          </View> */}

          {/* Notificaciones */}
          <View style={styles.infoRow}>
            <FontAwesome5 name="bell" size={18} color="#4F4F4F" />
            <Text style={styles.infoText}>Notificaciones</Text>
            <Switch
              value={user.notifications}
              onValueChange={toggleNotifications}
            />
          </View>
        </View>

        {/* Accesos rápidos */}
        

        {/* Consejos útiles */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Consejos útiles</Text>
          {tips.map((t, i) => (
            <View key={i} style={styles.tipRow}>
              <FontAwesome5 name="lightbulb" size={16} color="#F2C94C" />
              <Text style={styles.tipText}>{t}</Text>
            </View>
          ))}
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
    borderRadius: 20,
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
  fullName: { fontSize: 18, fontFamily: 'MontserratAlternates-SemiBold', color: '#4F4F4F', marginBottom: 8 },
  divider: { width: '80%', height: 1, backgroundColor: '#ddd', marginVertical: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  infoText: { flex: 1, marginLeft: 8, fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F' },
  inputField: { flex: 1, marginLeft: 8, borderBottomWidth: 1, borderBottomColor: '#1E8449', fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F', paddingVertical: 2 },
  editButton: { backgroundColor: '#1E8449', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  editConfirmButton: { backgroundColor: '#28A745', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  editCancelButton: { backgroundColor: '#EB5757', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  quickLinks: { width: '90%', marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontFamily: 'MontserratAlternates-SemiBold', color: '#333', marginBottom: 8 },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between' },
  linkButton: { flex: 1, backgroundColor: '#D0ECD8', padding: 12, marginHorizontal: 4, borderRadius: 20, alignItems: 'center' },
  linkText: { marginTop: 4, fontSize: 12, fontFamily: 'MontserratAlternates-Medium', color: '#1E8449' },
  tipsContainer: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },
  tipRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  tipText: { marginLeft: 8, fontSize: 14, fontFamily: 'MontserratAlternates-Medium', color: '#4F4F4F' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EB5757', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignSelf: 'center', marginTop: 20 },
  logoutText: { color: 'white', fontSize: 16, fontFamily: 'MontserratAlternates-SemiBold' },
});

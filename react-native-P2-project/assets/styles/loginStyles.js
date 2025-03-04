import { StyleSheet, StatusBar } from 'react-native';

const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight, // Evita que el contenido se superponga con la barra de estado
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    fontSize: 32,
    fontFamily: 'Xirod',
    color: '#006600',
    marginBottom: 15,
    textAlign: 'center',
  },

  title: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 30,
    marginBottom: 50,
    color: '#000',
  },

  separator: {
    height: 1.5, // Grosor de la línea
    backgroundColor: '#ddd', // Color de la línea
    width: '90%', // Que no llegue a los bordes completamente
    alignSelf: 'center',
  },

  inputWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: -50,
  },

  inputContainer: {
    backgroundColor: 'white',
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    minHeight: 50,
    width: '100%',
    paddingLeft: 20,
  },

  inputIcon: {
    marginRight: 15,
    marginLeft: 15,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: '100%',
    lineHeight: 60,
    paddingTop: 0,
    paddingBottom: 0,
  },

  loginButton: {
    backgroundColor: '#3498DB',
    borderRadius: 50,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -30,
    top: '55%',
    transform: [{ translateY: -27.5 }],
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  forgotPassword: {
    color: '#A9A9A9',
    fontSize: 14,
    marginTop: 15,
    fontFamily: 'MontserratAlternates-SemiBold',
    alignSelf: 'flex-start',
    marginLeft: -50,
  },

  registerButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,

    marginTop: 80,
    alignSelf: 'flex-start',
    width: '35%',
    marginLeft: -40,
  },

  registerText: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Bold',
    color: '#1F4E78',
    textAlign: 'center',
  },
});

export default loginStyles;
import { StyleSheet, StatusBar, Dimensions  } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const loginStyles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingTop: StatusBar.currentHeight,
    },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: screenHeight,
    },

  logo: {
    fontSize: 28,
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
    width: '105%', // Que no llegue a los bordes completamente
    alignSelf: 'center',
  },

  inputWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: -50,
  },

  inputContainer: {
    backgroundColor: 'white',
    width: '85%',
    paddingVertical: 10,
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
    paddingVertical: 20,
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
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: '100%',
    lineHeight: 60,
    paddingTop: 2,
    paddingBottom: 2,
  },

  loginButton: {
    backgroundColor: '#3498DB',
    borderRadius: 50,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -40,
    top: '45%',
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

    marginTop: 60,
    alignSelf: 'flex-start',
    width: '37%',
    marginLeft: -208,
  },

  registerText: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Bold',
    color: '#1F4E78',
    textAlign: 'center',
  },
});

export default loginStyles;
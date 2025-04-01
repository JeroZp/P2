import { StyleSheet, StatusBar, Dimensions  } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const registerStyles = StyleSheet.create({
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
    color: '#000066',
    marginBottom: 15,
    textAlign: 'center',
  },

  title: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: 30,
    marginBottom: 30,
    color: '#000',
  },

  separator: {
    height: 1.5, // Grosor de la línea
    backgroundColor: '#ddd',
    width: '105%',
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
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
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
    paddingVertical: 15,
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
    paddingTop: 0,
    paddingBottom: 0,
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
    top: '46%',
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
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,

    marginTop: -120,
    marginBottom: 30,
    alignSelf: 'flex-start',
    width: '50%',
    marginLeft: 240,
  },

  registerText: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Bold',
    color: '#1E8449',
    textAlign: 'center',
  },
});

export default registerStyles;
import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const vw = (v) => SCREEN_W * (v / 100);
const vh = (v) => SCREEN_H * (v / 100);

const registerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(0),
  },

  logo: {
    fontSize: vw(8),
    fontFamily: 'Xirod',
    color: '#000066',
    marginBottom: vh(2),
    textAlign: 'center',
  },

  title: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: vw(7),
    marginBottom: vh(3),
    color: '#000',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    marginVertical: vh(2),
  },

  inputWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },

  inputContainer: {
    backgroundColor: '#fff',
    width: vw(80),
    paddingVertical: vh(0),
    paddingHorizontal: vw(4),
    borderTopRightRadius: vw(15),
    borderBottomRightRadius: vw(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(2),
    minHeight: vh(7),
    width: '100%',
    paddingLeft: vw(4),
  },

  inputIcon: {
    marginHorizontal: vw(2),
  },

  input: {
    flex: 1,
    fontSize: vw(4),
    fontFamily: 'MontserratAlternates-SemiBold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: vh(2.5),
  },

  loginButton: {           // botón de enviar registro (flecha)
    backgroundColor: '#3498DB',
    borderRadius: vw(12),
    width: vw(18),
    height: vw(18),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -vw(10),
    top: vh(26),
    transform: [{ translateY: -vw(9) }],
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: vh(0.4) },
    elevation: 5,
  },

  forgotPassword: {
    color: '#A9A9A9',
    fontSize: vw(3.5),
    marginTop: vh(2),
    fontFamily: 'MontserratAlternates-SemiBold',
    alignSelf: 'flex-start',
  },

  registerButton: {        // botón “Volver” o link complementario
    backgroundColor: '#fff',
    paddingVertical: vh(2),
    paddingHorizontal: vw(4),
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: vw(8),
    borderBottomLeftRadius: vw(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: vh(4),
    alignSelf: 'flex-end',
    width: vw(50),
  },

  registerText: {
    fontSize: vw(5),
    fontFamily: 'MontserratAlternates-Bold',
    color: '#1E8449',
    textAlign: 'center',
  },
});

export default registerStyles;

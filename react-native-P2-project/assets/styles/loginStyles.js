import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Helpers para escalar (opcional)
const vh = v => SCREEN_H * (v / 100);
const vw = v => SCREEN_W * (v / 100);

const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(0),     // antes: padding: 20
  },

  logo: {
    fontSize: vw(8),              // antes: 28
    fontFamily: 'Xirod',
    color: '#006600',
    marginBottom: vh(2),          // antes: 15
    textAlign: 'center',
  },

  title: {
    fontFamily: 'MontserratAlternates-SemiBold',
    fontSize: vw(7),              // antes: 30
    marginBottom: vh(5),          // antes: 50
    color: '#000',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
  },

  inputWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    // ya no usamos marginLeft fijo
  },

  inputContainer: {
    backgroundColor: '#fff',
    width: vw(75),                // antes: '85%'
    paddingVertical: vh(0.5),     // antes: 10
    paddingHorizontal: vw(),     // antes: 15
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    // Shadow permanece
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(2),       // antes: 20
    minHeight: vh(7),             // antes: 50
    width: '100%',
    paddingLeft: vw(4),           // antes: 20
  },

  inputIcon: {
    marginHorizontal: vw(2),      // antes: 15
  },

  input: {
    flex: 1,
    fontSize: vw(4),            // antes: 18
    fontFamily: 'MontserratAlternates-SemiBold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: '100%',
    lineHeight: vh(3),            // antes: 60
  },

  loginButton: {
    backgroundColor: '#3498DB',
    borderRadius: vw(12),         // antes: 50
    width: vw(18),                // antes: 90
    height: vw(18),               // antes: 90
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -vw(10),               // antes: -40
    top: vh(7.5),                  // antes: '45%'
    // ajustar el translateY para centrar:
    transform: [{ translateY: -vw(9) }],
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  forgotPassword: {
    color: '#A9A9A9',
    fontSize: vw(3.5),            // antes: 14
    marginTop: vh(2),             // antes: 15
    fontFamily: 'MontserratAlternates-SemiBold',
    alignSelf: 'flex-start',
  },

  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: vh(2),       // antes: 15
    paddingHorizontal: vw(4),     // antes: 20
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: vh(6),             // antes: 60
    alignSelf: 'flex-start',
    width: vw(35),                // antes: '37%'
  },

  registerText: {
    fontSize: vw(5),              // antes: 20
    fontFamily: 'MontserratAlternates-Bold',
    color: '#1F4E78',
    textAlign: 'center',
  },
});

export default loginStyles;

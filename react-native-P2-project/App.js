import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import { Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
// import Marketplace from './src/screens/Marketplace'; 


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({

      // Tipografía Roboto
        'Roboto-Regular': require('./assets/fonts/Roboto/static/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto/static/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./assets/fonts/Roboto/static/Roboto-Italic.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto/static/Roboto-Black.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto/static/Roboto-Thin.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto/static/Roboto-Light.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto/static/Roboto-Medium.ttf'),
        'Roboto-ExtraBold': require('./assets/fonts/Roboto/static/Roboto-ExtraBold.ttf'),
        'Roboto-SemiBold': require('./assets/fonts/Roboto/static/Roboto-SemiBold.ttf'),
        'Roboto-Condensed': require('./assets/fonts/Roboto/static/Roboto_Condensed-Regular.ttf'),
        'Roboto-Condensed-Bold': require('./assets/fonts/Roboto/static/Roboto_Condensed-Bold.ttf'),
        'Roboto-Condensed-Italic': require('./assets/fonts/Roboto/static/Roboto_Condensed-Italic.ttf'),
        'Roboto-ThinItalic': require('./assets/fonts/Roboto/static/Roboto-ThinItalic.ttf'),
        'Roboto-LightItalic': require('./assets/fonts/Roboto/static/Roboto-LightItalic.ttf'),
        'Roboto-MediumItalic': require('./assets/fonts/Roboto/static/Roboto-MediumItalic.ttf'),
        'Roboto-BoldItalic': require('./assets/fonts/Roboto/static/Roboto-BoldItalic.ttf'),
        'Roboto-BlackItalic': require('./assets/fonts/Roboto/static/Roboto-BlackItalic.ttf'),

        // Tipografía Xirod
        'Xirod': require('./assets/fonts/xirod/Xirod.otf'),


        // Tipografía Montserrat Alternates
        'MontserratAlternates-Black': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Black.ttf'),
        'MontserratAlternates-BlackItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-BlackItalic.ttf'),
        'MontserratAlternates-Bold': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf'),
        'MontserratAlternates-BoldItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-BoldItalic.ttf'),
        'MontserratAlternates-ExtraBold': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraBold.ttf'),
        'MontserratAlternates-ExtraBoldItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraBoldItalic.ttf'),
        'MontserratAlternates-ExtraLight': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraLight.ttf'),
        'MontserratAlternates-ExtraLightItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-ExtraLightItalic.ttf'),
        'MontserratAlternates-Italic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Italic.ttf'),
        'MontserratAlternates-Light': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Light.ttf'),
        'MontserratAlternates-LightItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-LightItalic.ttf'),
        'MontserratAlternates-Medium': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf'),
        'MontserratAlternates-MediumItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-MediumItalic.ttf'),
        'MontserratAlternates-Regular': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Regular.ttf'),
        'MontserratAlternates-SemiBold': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-SemiBold.ttf'),
        'MontserratAlternates-SemiBoldItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-SemiBoldItalic.ttf'),
        'MontserratAlternates-Thin': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-Thin.ttf'),
        'MontserratAlternates-ThinItalic': require('./assets/fonts/Montserrat_Alternates/MontserratAlternates-ThinItalic.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#34A853" />
      </View>
    );
  }

 return (
//   <NavigationContainer>
//   <Stack.Navigator>
//     <Stack.Screen name="Marketplace" component={Marketplace} options={{ headerShown: false }} />
//   </Stack.Navigator>
// </NavigationContainer>
     <AppNavigator />
   );;
}

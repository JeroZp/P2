import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingDots = () => (
  <View style={styles.loaderContainer}>
    <LottieView
      source={require('../../assets/loading/energy.json')}
      autoPlay
      loop
      style={{ width: 350, height: 350 }}
    />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
});

export default LoadingDots;

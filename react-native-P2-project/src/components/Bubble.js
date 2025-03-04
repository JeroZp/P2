import React from 'react';
import { View, StyleSheet } from 'react-native';

const Bubble = ({ size, color, position }) => {
  return (
    <View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
          ...position,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
  },
});

export default Bubble;

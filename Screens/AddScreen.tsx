import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AddScreen() {
  return (
    <View style={styles.container}>
      <Text >This is the Add Screen</Text>
    </View>
  );
}

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
});
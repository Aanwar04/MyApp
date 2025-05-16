import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapScreen from '../components/MapScreen';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeScreen;
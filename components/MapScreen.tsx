import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Alert, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export default function UserMap() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert("Permission denied", "Cannot access location.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });
      
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        accuracy: loc.coords.accuracy || 0,
      });
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Error fetching location');
      Alert.alert("Error", "Failed to get location.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Fetching location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={50} color="red" />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity 
          style={styles.tryAgainButton} 
          onPress={getCurrentLocation}
        >
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View >
        <View style={styles.home}>
        <Text style={styles.title}>Home</Text>
        </View>
      
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="blue"
              title="You are here"
              description={location.accuracy ? `Accuracy: ${Math.round(location.accuracy)}m` : 'Location found'}
            />
          </MapView>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={getCurrentLocation}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to fetch location.</Text>
          <TouchableOpacity 
            style={styles.tryAgainButton} 
            onPress={getCurrentLocation}
          >
            <Text style={styles.tryAgainText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  map: {
    width: '100%',
    height: '100%', 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  tryAgainButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tryAgainText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  home:{
      height: '7%',
  width: '100%',
  position: 'absolute' as const,
  top: 0,
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff', // Optional: clean white background
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  elevation: 3, // for Android shadow
  shadowColor: '#000', // for iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,

  },
    title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
  },
});

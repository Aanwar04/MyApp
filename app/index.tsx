import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TabNavigation from '@/navigation/TabNavigation';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <>
    <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
      <StatusBar style="dark"  />
      <TabNavigation />
      </SafeAreaView>
    </>
  );
}

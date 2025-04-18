import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TabNavigation from '@/navigation/TabNavigation';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <TabNavigation />
    </>
  );
}

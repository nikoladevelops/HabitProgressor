import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Header from "./Components/Header.js"
import Settings from './Components/Settings.js';
import React from 'react';
import { AllHabitsContextProvider, useHabitsState } from './Contexts/AllHabitsContext.js';

export default function App() {
  return (
      <ScrollView style={styles.container}>
        <AllHabitsContextProvider>
          <Settings/>
          <Header/>
          <AllHabitButtons/>
        </AllHabitsContextProvider>

        <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#000",
    flex:1
  },
});

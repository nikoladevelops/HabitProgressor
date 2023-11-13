import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Header from "./Components/Header.js"
import Settings from './Components/Settings.js';
import React from 'react';
import { AllHabitsContextProvider } from './Contexts/AllHabitsContext.js';
import { TopVisibleProvider } from './Contexts/TopVisibleContext.js';

import { useCustomFonts } from './Utility/CustomFont.js';

export default function App() {
  const {fontsLoaded} = useCustomFonts()

  if(!fontsLoaded){
    return null
  }
  
  return (
      <ScrollView style={styles.container}>
        <AllHabitsContextProvider>
        <TopVisibleProvider>
          <Settings/>
          <Header/>
        </TopVisibleProvider>
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

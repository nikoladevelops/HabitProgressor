import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Nav from "./Components/Nav.js"

import Settings from './Components/Settings.js';

import {initTables, insertTestData} from "./db/db.js"
import React,{ useEffect } from 'react';

export default function App() {
  useEffect(()=>{
     initTables()
     insertTestData()
  },
  []);

  return (
    <ScrollView style={styles.container}>
      <Settings/>
      <Nav/>
      <AllHabitButtons/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

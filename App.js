import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import Content from './Components/Content.js';
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
      <Content/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

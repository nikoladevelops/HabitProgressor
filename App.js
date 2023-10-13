import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import Content from './Components/Content.js';
import Settings from './Components/Settings.js';

import {initDatabase, insertTestData} from "./db/db.js"

// When opening the app, ensure that the database has been created.
initDatabase(()=>{
  insertTestData();
}); 


export default function App() {
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

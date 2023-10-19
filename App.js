import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Header from "./Components/Header.js"
import Settings from './Components/Settings.js';
import {initTables, insertTestData, getAllHabits} from "./db/db.js"
import React,{ useEffect, createContext, useState } from 'react';

import AllHabitsContext from './Contexts/AllHabitsContext.js';

export default function App() {
  var [habitData, setHabitData] = useState([])
  var [inEditState, setInEditState] = useState(false)
  var [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
     initTables()
     insertTestData()

     getAllHabits((result) => {
      setHabitData(result)
      setIsLoading(false)
     })

  },
  []);
  return (
    <ScrollView style={styles.container}>
      <AllHabitsContext.Provider value={{habitData, setHabitData, inEditState, setInEditState}}>
        <Settings/>
        <Header/>
        {isLoading?
        <View style={{flex:1, minHeight:500, backgroundColor:"white", justifyContent:"center", alignItems:"center"}}>
          <Text style={{color:'black', fontSize:33}}>Loading...</Text>
        </View> : <AllHabitButtons/>}
      </AllHabitsContext.Provider>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

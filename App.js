import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Header from "./Components/Header.js"
import Settings from './Components/Settings.js';
import {initTables, getAllHabitsAsync} from "./db/db.js"
import React,{ useEffect, useState } from 'react';

import AllHabitsContext from './Contexts/AllHabitsContext.js';

export default function App() {
  var [habitData, setHabitData] = useState([])
  var [inEditState, setInEditState] = useState(false)
  var [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    async function initialize(){
      await initTables()
      var allHabits = await getAllHabitsAsync()
      setHabitData(allHabits)
      setIsLoading(false)
    }
    initialize()
  },
  []);
  return (
      <ScrollView style={styles.container}>
        <AllHabitsContext.Provider value={{habitData, setHabitData, inEditState, setInEditState}}>
          <Settings/>
          <Header/>
          {isLoading?
          <View style={{flex:1, minHeight:500, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'#fff', fontSize:33}}>Loading...</Text>
          </View> : <AllHabitButtons/>}
        </AllHabitsContext.Provider>
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

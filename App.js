import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import AllHabitButtons from './Components/AllHabitButtons.js';
import Header from "./Components/Header.js"
import Settings from './Components/Settings.js';
import {initTables, checkHabitsCountAsync, createManyHabitsAsync, getAllHabitsAsync, dropHabitsAsync} from "./db/db.js"
import React,{ useEffect, useState } from 'react';

import AllHabitsContext from './Contexts/AllHabitsContext.js';

export default function App() {
  var [habitData, setHabitData] = useState([])
  var [inEditState, setInEditState] = useState(false)
  var [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    async function initialize(){
      await dropHabitsAsync()
      await initTables()
      const countHabits = await checkHabitsCountAsync()
      if (countHabits === 0){
        const todayDate = new Date().toISOString()
        const testData = [
          {
            description: "Exercise for 30 minutes",
            streakCount: 3,
            lastCompletedDate: todayDate,
          },
          {
            description: "Read 20 pages",
            streakCount: 5,
            lastCompletedDate: null, // this means it has yet to be marked as completed
          },
          {
            description: "Meditate for 10 minutes",
            streakCount: 7,
            lastCompletedDate: todayDate,
          }
        ];
        await createManyHabitsAsync(testData)
      }

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

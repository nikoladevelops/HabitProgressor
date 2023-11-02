import React, { useState, useEffect } from "react";
import { View } from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";
import { useHabitsState } from "../Contexts/AllHabitsContext";
import {initTables, getAllHabitsAsync, endStreaksOfHabitsAsync} from "../db/db.js"
import Loading from "./HelperComponents/Loading";
import NoHabitsFound from "./HelperComponents/NoHabitsFound";

const AllHabitButtons = ()=>{
    const {habitData, setHabitData} = useHabitsState()
    
    // Is the app still loading the habits
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      const initialize = async ()=>{
          try {
              await initTables()
              await endStreaksOfHabitsAsync()
              const allHabits = await getAllHabitsAsync()
              setHabitData(allHabits)
              setIsLoading(false)
              
          } catch (error) {
              console.log(error)
          }
      }
      initialize()
    }
    ,[])

    return (
      isLoading ? (
        <Loading/>
      ) : (
        <View>
          {habitData.length === 0 ? (
            <NoHabitsFound/>
          ) : (
            <GenerateHabitButtons data={habitData}/>
          )}
        </View>
      )
    );
}

export default AllHabitButtons;
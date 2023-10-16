import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";

import {getAllHabits} from "../db/db.js"

const AllHabitButtons = ()=>{
    var [habitData, setHabitData] = useState([])
    var [isLoading, setIsLoading] = useState(1)

    useEffect(()=>{
        getAllHabits((res)=>{
            setHabitData(res)
            setIsLoading(0)
        })
    },[])

    if (isLoading){
        return (
            <View style={{flex:1, minHeight:500, backgroundColor:"white", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'black', fontSize:33}}>Loading...</Text>
            </View>
            )
    }
    return (
        <GenerateHabitButtons data={habitData}/>
      );
}

export default AllHabitButtons;
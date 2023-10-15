import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";

import StreakCounter from "./StreakCounter";
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

const Nav = ()=>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headingText}>HabitProgressor</Text>
                </View>
                <StreakCounter/>
            </View>
            <AllHabitButtons/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"black"
    },
    header:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"white",
        borderStyle: "dashed",
        paddingTop:"5%",
        paddingBottom:"5%",
        gap:5,
        alignItems:"center"
    },
    titleContainer:{
        color:"#fff"
    },
    headingText:{
        color:"#fff",
        fontSize:25
    }
});

export default Nav;
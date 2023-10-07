import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";


const AllHabitButtons = ()=>{
    var textData = [
        "test",
        "test2",
        "test3",
        "my custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes heremy custom habit goes heremy custom habit goes heremy custom habit goes heremy custom habit goes heremy custom habit goes heremy custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes here",
        "my custom habit goes here"
    ]

    return (
        <GenerateHabitButtons data={textData}/>
      );
}

const Nav = ()=>{
    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.heading}>Habit Progressor</Text>
            </View>
            <AllHabitButtons/>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    titleContainer:{
        flex:0.8,
        flexDirection:'row',
        backgroundColor:'black',
        justifyContent:"center",
        color:"#fff",
        paddingTop:"5%",
        paddingBottom:"5%",
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"white",
        borderStyle: "dashed"
    },
    heading:{
        color:"#fff",
        fontSize:25
    }
});

export default Nav;
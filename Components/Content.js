import React from "react";
import { StyleSheet, View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";

import StreakCounter from "./StreakCounter";

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
import React from "react";
import { StyleSheet, View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";

import FlameSvgIcon from "../icons/flame.svg" ;

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
                <View style={styles.streakContainer}>
                    <FlameSvgIcon width="32" height="32"/>
                    <Text style={styles.streakContainerText}>5</Text>
                </View>
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
    },
    streakContainer:{
        flexDirection:"row",
        gap:5,
        alignItems:"flex-end"
    },
    streakContainerText:{
        color:"white",
        fontSize:15
    }
});

export default Nav;
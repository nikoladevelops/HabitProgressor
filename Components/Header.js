import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { useTopVisibleState } from "../Contexts/TopVisibleContext";

const Header = ()=>{
    const {isVisible} = useTopVisibleState()

    return(
        isVisible ?
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headingText}>HabitProgressor</Text>
                </View>
            </View>
        </View>:<></>
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
        fontSize:25,
        fontFamily:"Lato-Regular"
    }
});

export default React.memo(Header);
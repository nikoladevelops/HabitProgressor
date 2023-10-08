import React from "react"
import {StyleSheet, View, Text} from "react-native"
import FlameSvgIcon from "../icons/flame.svg" ;

const StreakCounter = ({width="32", height="32", streakValue=0})=>{
    return (
        <View style={styles.streakContainer}>
            <FlameSvgIcon width={width} height={height}/>
            <Text style={styles.streakContainerText}>{streakValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
export default StreakCounter
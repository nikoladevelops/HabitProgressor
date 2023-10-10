import React from "react"
import {StyleSheet, View, Text} from "react-native"
import FlameSvgIcon from "../icons/flame.svg" ;

const StreakCounter = ({width="32", height="32", streakValue=0, fontSize=20})=>{
    return (
        <View style={styles.streakContainer}>
            <FlameSvgIcon width={width} height={height}/>
            <Text style={{fontSize:fontSize, ...styles.streakContainerText}}>{streakValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    streakContainer:{
        flexDirection:"row",
        alignItems:"flex-end",
        gap:5
    },
    streakContainerText:{
        color:"white",
    }
});
export default StreakCounter
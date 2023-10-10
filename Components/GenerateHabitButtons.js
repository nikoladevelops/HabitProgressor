import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet} from "react-native";

import StreakCounter from "./StreakCounter";

const HabitButton = ({data})=>{
    const [buttonBackgroundColors, setButtonBackgroundColors] = useState(
        data.map(()=>"#F3061A")
    )

    const btnClicked = (index)=>{
        const newColors = [...buttonBackgroundColors]

        newColors[index] = newColors[index] == "#F3061A" ? "#0EC64B" : "#F3061A"

        setButtonBackgroundColors(newColors)
    }

    return(
        <View style={styles.allHabitBtnContainer}>
          {data.map((textData, index) => (
            <TouchableOpacity key={index} onPress={btnClicked.bind(null, index)} style={{...styles.button, backgroundColor:buttonBackgroundColors[index]}}>
                <View style={styles.buttonContent}>
                    <Text style={styles.text}>{textData}</Text>
                    <View style={{alignSelf:"flex-start"}}>
                        <StreakCounter width={15} height={15} streakValue={4554} fontSize={10}/>
                    </View>
                </View>
            </TouchableOpacity>
          ))}
        </View>
    );
}

var styles = StyleSheet.create({
    button:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        minHeight:45,
        borderRadius:18,
        padding:10
    },
    text:{
        flex:1,
        alignSelf:"center",
        color:"#fff",
        fontSize:19,
    },
    allHabitBtnContainer:{
        flex:1,
        flexDirection:"column",
        gap:5,
        backgroundColor:"black",
        padding:10,
    },
    buttonContent:{
        flex:1,
        flexDirection:"column"
    }
});
export default HabitButton;
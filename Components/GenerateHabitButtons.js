import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet} from "react-native";

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
                <Text style={styles.text}>{textData}</Text>
            </TouchableOpacity>
          ))}
        </View>
    );
}

var styles = StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
        minHeight:45,
        borderRadius:18,
        padding:10
    },
    text:{
        color:"#fff",
        fontSize:19
    },
    allHabitBtnContainer:{
        flexDirection:"column",
        gap:5,
        backgroundColor:"black",
        padding:10,
    },
});
export default HabitButton;
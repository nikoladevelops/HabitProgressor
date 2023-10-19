import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity, Text, View, StyleSheet} from "react-native";

import StreakCounter from "./StreakCounter";
import AllHabitsContext from "../Contexts/AllHabitsContext";

const GenerateHabitButtons = ({data, openDeleteModal})=>{
    if (data.length === 0){
        return <View><Text>No data available. Try creating some habits.</Text></View>
    }

    const {inEditState} = useContext(AllHabitsContext)

    const [buttonBackgroundColors, setButtonBackgroundColors] = useState(
        data.map((habit)=> habit.doneToday ? "#0EC64B" : "#F3061A")
    )
    
    useEffect(() => {
        if (inEditState) {
          setButtonBackgroundColors(data.map(() => "#505050"));
        } else {
          // Change button colors based on habit status
          setButtonBackgroundColors(data.map(habit => habit.doneToday ? "#0EC64B" : "#F3061A"));
        }
      }, [data, inEditState]); // match the amount of colors with the amount of data/ when inEditState color the buttons in gray, otherwise color them according to their .doneToday prop.

    const btnClicked = (index)=>{
        if (inEditState){
            return
        }
        const newColors = [...buttonBackgroundColors]

        newColors[index] = newColors[index] == "#F3061A" ? "#0EC64B" : "#F3061A"

        setButtonBackgroundColors(newColors)
    }

    return(
        <View style={styles.allHabitBtnContainer}>
          {data.map((habit, index) => (
            <TouchableOpacity key={index} onPress={btnClicked.bind(null, index)} style={{...styles.button, backgroundColor:buttonBackgroundColors[index]}}>
                <View style={styles.buttonContent}>
                    <Text style={styles.text}>{habit.description}</Text>
                    <View style={styles.habitDetails}>
                        <StreakCounter width={15} height={15} streakValue={habit.streakCount} fontSize={10}/>
                        {inEditState ? 
                        <View style={styles.deleteView}>
                            <TouchableOpacity onPress={openDeleteModal.bind(null, habit.id)}>
                                <Text style={styles.deleteBtnText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        :<></>}
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
    },
    habitDetails:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    deleteView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        marginRight:15
    },
    deleteBtnText:{
        color:"#F3061A",
        textShadowColor: 'black',
        textShadowRadius:3,
        textShadowOffset:{width:1,height:2}
    }
});
export default GenerateHabitButtons;
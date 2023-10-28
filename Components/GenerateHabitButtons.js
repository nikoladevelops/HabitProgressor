import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity, Text, View, StyleSheet} from "react-native";

import StreakCounter from "./StreakCounter";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import { markHabitAsCompletedTodayAsync } from "../db/db";

const GenerateHabitButtons = ({data, refreshData, openDeleteModal, openEditModal})=>{
    const {inEditState} = useContext(AllHabitsContext)

    const [buttonBackgroundColors, setButtonBackgroundColors] = useState([])
    
    const checkIfDateISOIsToday = (habitDateISO)=>{
        if (habitDateISO === null || habitDateISO === ""){
            return false
        }

        const habitDate = new Date(habitDateISO)
        const todayDate = new Date()

        return habitDate.toDateString() === todayDate.toDateString()
    }

    useEffect(() => {
        if (inEditState) {
          setButtonBackgroundColors(data.map(() => "#505050"));
        } else {
          // Change button colors based on habit status
          setButtonBackgroundColors(data.map((habit) => checkIfDateISOIsToday(habit.lastCompletedDate) ? "#0EC64B" : "#F3061A" ))
        }
      }, [data, inEditState]); // match the amount of colors with the amount of data/ when inEditState color the buttons in gray, otherwise color them according to their lastCompletedDate

    const btnClicked = async (index, habit)=>{
        // If in the edit state or if the lastCompletedDate is equal to today, don't do anything.
        if (inEditState || checkIfDateISOIsToday(habit.lastCompletedDate)){
            return
        }

        try {
            await markHabitAsCompletedTodayAsync(habit.id, habit.streakCount)
            const newColors = [...buttonBackgroundColors]
            newColors[index] = "#0EC64B"
            refreshData()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styles.allHabitBtnContainer}>
          {data.map((habit, index) => (
            <TouchableOpacity key={index} onPress={()=>btnClicked(index, habit)} style={{...styles.button, backgroundColor:buttonBackgroundColors[index]}}>
                <View style={styles.buttonContent}>
                    <Text style={styles.text}>{habit.description}</Text>
                    <View style={styles.habitDetails}>
                        <StreakCounter width={15} height={15} streakValue={habit.streakCount} fontSize={10}/>
                        {inEditState ? 
                        <View style={styles.deleteView}>
                            <TouchableOpacity onPress={openEditModal.bind(null, habit.id, habit.description)}>
                                <Text style={styles.editBtnText}>Edit</Text>
                            </TouchableOpacity>
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
        minHeight:65,
        borderRadius:18,
        padding:10
    },
    text:{
        flex:1,
        alignSelf:"center",
        color:"#fff",
        fontSize:19,
        textAlign:"center"
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
        alignItems:"center",
        minHeight:19
    },
    deleteView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        marginRight:15,
        gap:15
    },
    deleteBtnText:{
        color:"#F3061A",
        textShadowColor: 'black',
        textShadowRadius:3,
        textShadowOffset:{width:1,height:2}
    },
    editBtnText:{
        color:"yellow",
        textShadowColor: 'black',
        textShadowRadius:3,
        textShadowOffset:{width:1,height:2}
    }
});
export default GenerateHabitButtons;
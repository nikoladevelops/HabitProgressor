import React, { useEffect, useState, useCallback, useMemo } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import StreakCounter from "./StreakCounter";
import DeleteHabitModal from "../Modals/DeleteHabitModal";
import EditHabitModal from "../Modals/EditHabitModal";
import { useHabitsState } from "../Contexts/AllHabitsContext";
import { markHabitAsCompletedTodayAsync, getAllHabitsAsync } from "../db/db";


const HabitButton = ({ habit, buttonBackgroundColor, btnClicked, inEditState, openEditModal, openDeleteModal }) => {
  return (
    <TouchableOpacity
      key={habit.id}
      onPress={() => btnClicked(habit)}
      style={{ ...styles.button, backgroundColor: buttonBackgroundColor }}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.text}>{habit.description}</Text>
        <View style={styles.habitDetails}>
          <StreakCounter width={15} height={15} streakValue={habit.streakCount} fontSize={10} />
          {inEditState && (
            <View style={styles.deleteView}>
              <TouchableOpacity onPress={() => openEditModal(habit)}>
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openDeleteModal(habit)}>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const GenerateHabitButtons = ({ data }) => {
  const { inEditState, setHabitData } = useHabitsState();

  const [buttonBackgroundColors, setButtonBackgroundColors] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [habit, setHabit] = useState(null);

  const refreshData = useCallback(async () => {
    setHabitData(await getAllHabitsAsync());
  }, []);

  const checkIfDateISOIsToday = useCallback((habitDateISO) => {
    if (!habitDateISO || habitDateISO === "") {
      return false;
    }
  
    const habitDate = new Date(habitDateISO);
    const todayDate = new Date();
  
    return habitDate.toDateString() === todayDate.toDateString();
  },[]);

  useEffect(() => {
    if (inEditState) {
      setButtonBackgroundColors(data.map(() => "#505050"));
    } else {
      setButtonBackgroundColors(data.map((habit) => (checkIfDateISOIsToday(habit.lastCompletedDate) ? "#0EC64B" : "#F3061A")));
    }
  }, [data, inEditState]);

  const btnClicked = useCallback(async (habit) => {
    if (inEditState || checkIfDateISOIsToday(habit.lastCompletedDate)) {
      return;
    }

    try {
      await markHabitAsCompletedTodayAsync(habit.id, habit.streakCount);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }, [inEditState]);

  const openDeleteModal = useCallback((habit) => {
    setHabit(habit);
    setIsDeleteModalVisible(true);
  }, []);

  const openEditModal = useCallback((habit) => {
    setHabit(habit);
    setIsEditModalVisible(true);
  }, []);

  const habitComponents = useMemo(() => {
    return data.map((habit, index) => (
      <HabitButton
        key={habit.id}
        habit={habit}
        buttonBackgroundColor={buttonBackgroundColors[index]}
        btnClicked={btnClicked}
        inEditState={inEditState}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    ));
  }, [data, buttonBackgroundColors, inEditState, btnClicked]); // Don't re-generate the buttons unless these change

  return (
    <View style={styles.allHabitBtnContainer}>
      {habitComponents}
      {habit === null ? ( // when the state is null don't render things that depend on its values
        <></>
      ) : (
        <View>
          <DeleteHabitModal isVisible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)} habitId={habit.id} />
          <EditHabitModal isVisible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)} habit={habit} />
        </View>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
    button:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        minHeight:66,
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
import React, { useContext, useState } from "react";
import { View } from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import DeleteModal from "../Modals/DeleteModal.js"

const AllHabitButtons = ()=>{
    const {habitData, setHabitData} = useContext(AllHabitsContext)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [habitId, setHabitId] = useState()
    return (
      <View>
        <GenerateHabitButtons data={habitData} openDeleteModal = {(id)=> 
          {
            setHabitId(id)
            setIsDeleteModalVisible(true)
          }}/>
        <DeleteModal isVisible = {isDeleteModalVisible} onClose={()=>setIsDeleteModalVisible(false)} habitId={habitId} />
      </View>
      );
}

export default AllHabitButtons;
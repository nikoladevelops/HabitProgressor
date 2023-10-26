import React, { useContext, useState } from "react";
import { View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import DeleteModal from "../Modals/DeleteModal.js"

import { getAllHabitsAsync } from "../db/db";

const AllHabitButtons = ()=>{
    const {habitData, setHabitData} = useContext(AllHabitsContext)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [habitId, setHabitId] = useState()
    return (
      <View>
        {habitData.length === 0 ?
          <View style={{flex:1, minHeight:500, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'#fff', fontSize:23}}>No habits found.</Text>
          </View> 
          :
          <GenerateHabitButtons data={habitData} refreshData={async ()=>setHabitData(await getAllHabitsAsync())} openDeleteModal = {(id)=> 
            {
              setHabitId(id)
              setIsDeleteModalVisible(true)
            }}/>
        }
        <DeleteModal isVisible = {isDeleteModalVisible} onClose={()=>setIsDeleteModalVisible(false)} habitId={habitId} />
        </View>
      );
}

export default AllHabitButtons;
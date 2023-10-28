import React, { useContext, useState } from "react";
import { View, Text} from "react-native";
import GenerateHabitButtons from "./GenerateHabitButtons";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import DeleteHabitModal from "../Modals/DeleteHabitModal"

import { getAllHabitsAsync } from "../db/db";
import EditHabitModal from "../Modals/EditHabitModal";

const AllHabitButtons = ()=>{
    const {habitData, setHabitData} = useContext(AllHabitsContext)

    // State needed for DeleteHabitModal
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    
    // State needed for EditHabitModal
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [habitDescription, setHabitDescription] = useState("")
    
    // State needed for both
    const [habitId, setHabitId] = useState()
    // your todo is to instead add the edit habitasync functionality and also make sure to always disable the button when an operation is performed to avoid bugs.
    return (
      <View>
        {habitData.length === 0 ?
          <View style={{flex:1, minHeight:500, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'#fff', fontSize:23}}>No habits found.</Text>
          </View> 
          :
          <GenerateHabitButtons data={habitData}
            refreshData={async ()=>setHabitData(await getAllHabitsAsync())}
            openDeleteModal = {(id)=> 
              {
                setHabitId(id)
                setIsDeleteModalVisible(true)
              }
            }
            openEditModal={(id, desc)=>{
              console.log('just testing')
                setHabitId(id)
                setHabitDescription(desc)
                setIsEditModalVisible(true)
              }
            }
          />
        } 
        
        <DeleteHabitModal isVisible = {isDeleteModalVisible} onClose={()=>setIsDeleteModalVisible(false)} habitId={habitId} />
        <EditHabitModal isVisible={isEditModalVisible} onClose={()=>setIsEditModalVisible(false)} habitId={habitId} habitDescription={habitDescription}/>
        </View>
      );
}

export default AllHabitButtons;
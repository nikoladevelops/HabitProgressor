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
    
    // The current habit trying to edit/delete
    const [habit, setHabit] = useState(null)
    
    return (
      <View>
        {habitData.length === 0 ?
          <View style={{flex:1, minHeight:500, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:'#fff', fontSize:23}}>No habits found.</Text>
          </View> 
          :
          <GenerateHabitButtons data={habitData}
            refreshData={async ()=>setHabitData(await getAllHabitsAsync())}
            openDeleteModal = {(habit)=> 
              {
                setHabit(habit)
                setIsDeleteModalVisible(true)
              }
            }
            openEditModal={(habit)=>{
                setHabit(habit)
                setIsEditModalVisible(true)
              }
            }
          />
        } 
        {habit === null ? <></> : 
        <View>
          <DeleteHabitModal isVisible={isDeleteModalVisible} onClose={()=>setIsDeleteModalVisible(false)} habitId={habit.id} />
          <EditHabitModal isVisible={isEditModalVisible} onClose={()=>setIsEditModalVisible(false)} habit={habit}/>
        </View>
        }
        </View>
      );
}

export default AllHabitButtons;
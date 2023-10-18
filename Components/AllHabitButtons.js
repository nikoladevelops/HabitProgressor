import React, { useContext } from "react";
import GenerateHabitButtons from "./GenerateHabitButtons";
import AllHabitsContext from "../Contexts/AllHabitsContext";

const AllHabitButtons = ()=>{
    var {habitData, setHabitData} = useContext(AllHabitsContext)
    
    return (
        <GenerateHabitButtons data={habitData}/>
      );
}

export default AllHabitButtons;
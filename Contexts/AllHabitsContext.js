import { createContext, useContext, useCallback, useState, useEffect, useMemo } from "react";

const AllHabitsContext = createContext();

const useHabits = ()=>{

    const [habitData, setHabits] = useState("")
    const [inEditState, setEditState] = useState(false)

    const setHabitData = useCallback((newData) => setHabits(newData))
    const setInEditState = useCallback((isEditing) => setEditState(isEditing))

    return useMemo(()=>{
        return{
        habitData,
        setHabitData,
        inEditState,
        setInEditState}
    }, [habitData, inEditState])

}

export const AllHabitsContextProvider = ({children})=>{
    const {habitData, setHabitData, inEditState, setInEditState} = useHabits()

    return(
    <AllHabitsContext.Provider value = {{habitData, setHabitData, inEditState, setInEditState}}>
        {children}
    </AllHabitsContext.Provider>)
}

export const useHabitsState = ()=>{
    return useContext(AllHabitsContext)    
}
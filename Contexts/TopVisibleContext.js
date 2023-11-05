import { createContext, useCallback, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TopVisibleContext = createContext()
const storageKey = "isTopVisibleSetting"

const useTopVisible = () =>{
    const [isVisible, setVisibility] = useState(false)
    
    useEffect(()=>{
        const setIsVisibleInitialState = async ()=>{
            try {
                const isTopVisibleSettingString = await AsyncStorage.getItem(storageKey)
                const isTopVisibleSettingBool = isTopVisibleSettingString === "true"
                
                setVisibility(isTopVisibleSettingBool)
            } catch (err) {
                console.log(err)
            }
        }
        setIsVisibleInitialState()
    },[])

    const setIsVisible = useCallback((value)=>{
        setVisibility(value)
    },[])

    useEffect(()=>{
        const setIsTopVisibleSetting = async () => {
            try {
                await AsyncStorage.setItem(storageKey, isVisible.toString())
            } catch (err) {
                console.log(err)
            }
        }
        setIsTopVisibleSetting()
    },[isVisible])

    return {isVisible, setIsVisible}
}

export const TopVisibleProvider = ({children})=>{
    const stateObj = useTopVisible()

    return (
        <TopVisibleContext.Provider value={stateObj}>
            {children}
        </TopVisibleContext.Provider>
    )
}

export const useTopVisibleState =()=>{
    return useContext(TopVisibleContext)
}
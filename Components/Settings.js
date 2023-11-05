import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHabitsState } from "../Contexts/AllHabitsContext";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CreateHabitModal from "../Modals/CreateHabitModal";
import { useTopVisibleState } from "../Contexts/TopVisibleContext";
import {usePushNotifications} from "../Utility/PushNotifications.js"
import ArrowBtn from "./HelperComponents/ArrowBtn";
import NotificationBtn from "./HelperComponents/NotificationBtn.js"

const Settings = ()=>{
    const {isVisible, setIsVisible} = useTopVisibleState()
    const [isModalVisible, setModalVisible] = useState(false)
    const {inEditState, setInEditState} = useHabitsState()

    const {areEnabled, setAreEnabled} = usePushNotifications()
    
    const toggleNotifications = useCallback(()=>{
        if(areEnabled){
            setAreEnabled(false)
        }
        else{
            setAreEnabled(true)
        }
    },[areEnabled])

    const showAddModal = useCallback(()=>{
        setModalVisible(true)
    },[])

    const switchEditState = useCallback(()=>{
        setInEditState(!inEditState)
    },[inEditState])

    const switchVisibility = useCallback(()=>{
        setIsVisible(!isVisible)
    },[isVisible])

    const containerStyle = useMemo(()=>{
        if (!isVisible){
            return styles.container
        }
        else{
            return {...styles.container, paddingBottom:"5%"}
        }
    },[isVisible])

    return(
        <View style={containerStyle}>
            {isVisible?(
            <>
            <View style={styles.operationBtnsContainer}>
                <TouchableOpacity style={styles.operationBtn} onPress={showAddModal}>
                    <Text style={{color:'#0EC64B', fontSize:35}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.operationBtn} onPress = {switchEditState}>
                    <Text style={{color:'#F3061A', fontSize:35}}>-</Text>
                </TouchableOpacity>
                <NotificationBtn isBellOn={areEnabled} onPressFunc={toggleNotifications}/>
            </View>
            <View style={{marginRight:20}}>
                <ArrowBtn isArrowUp={true} onPressFunc={switchVisibility}/>
            </View>
            </>):(
            <View>   
                <ArrowBtn isArrowUp={false} onPressFunc={switchVisibility}/>
            </View>
            )}
        <CreateHabitModal isVisible={isModalVisible} onClose={()=>{setModalVisible(false)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:"15%",
        backgroundColor:"black",
    },
    operationBtnsContainer:{
        flex:1,
        flexDirection:"row",
        gap:15,
        marginLeft:20
    },
    operationBtn:{
        alignItems:"center",
        justifyContent:"center",
        minWidth:50,
        borderWidth:1,
        borderColor:'white',
        borderStyle:"dotted"
    }
});
export default Settings;
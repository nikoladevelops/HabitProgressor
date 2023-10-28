import React, { useState, useContext } from "react";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CreateHabitModal from "../Modals/CreateHabitModal";

const Settings = ()=>{
    const [isModalVisible, setModalVisible] = useState(false)
    const {inEditState, setInEditState} = useContext(AllHabitsContext)

    return(
        <View style={styles.container}>
            <View style={styles.operationBtnsContainer}>
                <TouchableOpacity style={styles.operationBtn} onPress={()=>{setModalVisible(true);}}>
                    <Text style={{color:'#0EC64B', fontSize:35}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.operationBtn} onPress = {()=>{setInEditState(!inEditState)}}>
                    <Text style={{color:'#F3061A', fontSize:35}}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
                <Text style={styles.settingsBtnText}>Settings</Text>
            </TouchableOpacity>
            <CreateHabitModal isVisible={isModalVisible} onClose={()=>setModalVisible(false)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        paddingTop:"15%",
        paddingBottom:"5%",
        backgroundColor:"black",
    },
    operationBtnsContainer:{
        flex:1,
        flexDirection:"row",
        gap:15,
        marginLeft:20
    },
    operationBtn:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        maxWidth:50,
        borderWidth:1,
        borderColor:'white',
        borderStyle:"dotted"
    },
    settingsBtn:{
        marginRight:30,
        backgroundColor:"#505050",
        padding:5,
        borderWidth:1,
        borderColor:"#fff",
        borderStyle:"dotted",
        position:"relative"
    },
    settingsBtnText:{
        color:"#fff",
        fontSize:20
    }
});
export default Settings;
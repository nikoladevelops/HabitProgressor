import React, {useContext} from "react";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native"
import Modal from "react-native-modal"
import {deleteHabitByIdAsync, getAllHabitsAsync} from "../db/db.js"

const DeleteModal = ({isVisible, onClose, habitId})=>{
    const {setHabitData} = useContext(AllHabitsContext)

    const deleteHabit = (id)=>{
        deleteHabitByIdAsync(id)
        .then(()=>getAllHabitsAsync())
        .then((result)=>{setHabitData(result); onClose()})
        .catch((err)=>console.log(err))
    }

    return(
        <Modal style={styles.modal} isVisible={isVisible} backdropOpacity={0.9} animationIn="zoomIn"
        animationOut="slideOutDown" onRequestClose={onClose}>
        <Text style={styles.modalText}>Are you sure you want to delete this habit?</Text>
            <View style={styles.operationBtnsContainer}>
                <TouchableOpacity style={{backgroundColor:"red",...styles.operationBtn}} onPress={()=> deleteHabit(habitId) }>
                    <Text style={styles.btnText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#505050",...styles.operationBtn}} onPress={onClose}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal:{
        flex:1,
        flexDirection:"column",
        paddingTop:150,
        alignItems:"center",
        gap:20,
        justifyContent:"flex-start"
    },
    modalText:{
        textAlign:"center",
        color:"#fff",
        fontSize:20
    },
    operationBtnsContainer:{
        flexDirection:"row",
        gap:15
    },
    btnText:{
        color:"#fff",
        fontSize:18,
    },
    operationBtn:{
        borderWidth:1,
        borderColor:"#fff",
        borderStyle:"dotted",
        padding:10,
        minWidth:80,
        alignItems:"center",
    },
});

export default DeleteModal;
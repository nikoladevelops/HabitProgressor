import React, {useState} from "react";
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native"
import Modal from "react-native-modal"
import {createHabitAsync} from "../db/db.js"
import {useHabitsState} from "../Contexts/AllHabitsContext";

const CreateHabitModal = ({isVisible, onClose})=>{
    const {habitData, setHabitData} = useHabitsState()
    const [description, setDescription] = useState("")

    const createNewHabit = async ()=>{
        try{
            const createdHabitId = await createHabitAsync(description, 0, null)
            setHabitData([...habitData, {id:createdHabitId, description, streakCount:0, lastCompletedDate:null}]);
            onClose();
            setDescription("") // Make sure to reset the state, so it doesn't remember the past description
        
        }catch(err){
            console.log(err)
        }
    }
    return(
        <Modal style={styles.modal} isVisible={isVisible} backdropOpacity={0.9} animationIn="zoomIn"
        animationOut="slideOutDown" onRequestClose={onClose}>
        <Text style={styles.modalText}>Create New Habit</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Habit" placeholderTextColor={"#505050"} onChangeText={setDescription}>
                </TextInput>
            </View>
            <View style={styles.operationBtnsContainer}>
                <TouchableOpacity style={{backgroundColor:"green",...styles.operationBtn}} onPress={()=> createNewHabit()}>
                    <Text style={styles.btnText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:"#505050",...styles.operationBtn}} onPress={onClose}>
                    <Text style={styles.btnText}>Close</Text>
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
        color:"#fff",
        fontSize:22,
        fontFamily:"Montserrat-Light"
    },
    inputContainer:{
        width:300,
        gap:12
    },
    textInput:{
        textAlign:"center",
        color:"#fff",
        padding:5,
        borderWidth:1,
        borderColor:"#fff",
        borderStyle:"dashed",
        fontSize:22,
        fontFamily:"Montserrat-Regular"
    },
    operationBtnsContainer:{
        flexDirection:"row",
        gap:15
    },
    btnText:{
        color:"#fff",
        fontSize:18,
        fontFamily:"Montserrat-Medium"
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

export default CreateHabitModal;
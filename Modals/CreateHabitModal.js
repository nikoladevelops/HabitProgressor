import React, {useContext, useState} from "react";
import AllHabitsContext from "../Contexts/AllHabitsContext";
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native"
import Modal from "react-native-modal"
import {createHabitAsync, getAllHabitsAsync} from "../db/db.js"

const CreateHabitModal = ({isVisible, onClose})=>{
    const {setHabitData} = useContext(AllHabitsContext)
    const [description, setDescription] = useState("")

    const createNewHabit = async ()=>{
        try{
            await createHabitAsync(description, 0, null)
            const allHabits = await getAllHabitsAsync()
            setHabitData(allHabits);
            onClose();
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
        fontSize:22
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
        fontSize:22
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

export default CreateHabitModal;
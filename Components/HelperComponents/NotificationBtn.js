import React from "react";
import {StyleSheet,TouchableOpacity} from "react-native"
import BellOn from "../../icons/bellOn.svg"
import BellOff from "../../icons/bellOff.svg"

const NotificationBtn = ({isBellOn, onPressFunc})=>{
    return (
    <TouchableOpacity style={styles.btn} onPress={onPressFunc}>
        {isBellOn ? 
        (
            <BellOn width={30} height={30}/>
        ):
        (
            <BellOff width={30} height={30}/>
        )}
    </TouchableOpacity>)
}

export default NotificationBtn;

const styles = StyleSheet.create({
    btn:{
        alignItems:"center",
        justifyContent:"center",
        minWidth:50,
        borderWidth:1,
        borderColor:'white',
        borderStyle:"dotted"
    }
})
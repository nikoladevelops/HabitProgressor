import React from "react";
import {StyleSheet,TouchableOpacity} from "react-native"
import ArrowUp from "../../icons/arrowUp.svg"
import ArrowDown from "../../icons/arrowDown.svg"

const ArrowBtn = ({isArrowUp, onPressFunc})=>{
    return (
    <TouchableOpacity style={styles.btn} onPress={onPressFunc}>
        {isArrowUp ? 
        (
            <ArrowUp width={30} height={30}/>
        ):
        (
            <ArrowDown width={30} height={30}/>
        )}
    </TouchableOpacity>)
}

export default ArrowBtn;

const styles = StyleSheet.create({
    btn:{
        minWidth:20
    }
})
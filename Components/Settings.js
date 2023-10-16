import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Settings = ()=>{
    return(
        <View style={styles.container}>
            <View style={styles.operationBtnsContainer}>
                <TouchableOpacity style={styles.operationBtn}>
                    <Text style={{color:'#0EC64B', fontSize:35}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.operationBtn}>
                    <Text style={{color:'#F3061A', fontSize:35}}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginRight:30}}>
                <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
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
    settingsText:{
        color:"#fff",
        fontSize:20
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
    }
});
export default Settings;
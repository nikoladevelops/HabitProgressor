import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Settings = ()=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        paddingTop:"15%",
        paddingBottom:"5%",
        backgroundColor:"black",
        alignItems:'flex-end',
        paddingRight:"8%",
    },
    settingsText:{
        color:"#fff",
        fontSize:25
    }
});
export default Settings;
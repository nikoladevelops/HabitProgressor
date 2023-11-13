import React from "react"
import { View, Text } from "react-native"

const NoHabitsFound = ()=>{
    return(
        <View style={{ flex: 1, minHeight: 500, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: '#fff', fontSize: 23, fontFamily:"Lato-Light" }}>No habits found.</Text>
        </View>
    )
}

export default NoHabitsFound;
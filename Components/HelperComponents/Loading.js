import React from "react"
import { View, Text } from "react-native"

const Loading = ()=>{
    return (
        <View style={{ flex: 1, minHeight: 500, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: '#fff', fontSize: 33, fontFamily:"Lato-Light" }}>Loading...</Text>
        </View>
    )
}

export default Loading;
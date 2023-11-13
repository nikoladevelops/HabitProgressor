import { useFonts } from "expo-font";

export const useCustomFonts = ()=>{
    const [fontsLoaded] = useFonts({
        "Montserrat-Light":require("../fonts/Montserrat-Light.ttf"),
        "Montserrat-Medium":require("../fonts/Montserrat-Medium.ttf"),
        "Montserrat-Regular":require("../fonts/Montserrat-Regular.ttf")
    })

    return {fontsLoaded}
}
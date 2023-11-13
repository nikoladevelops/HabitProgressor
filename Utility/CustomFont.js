import { useFonts } from "expo-font";

export const useCustomFonts = ()=>{
    const [fontsLoaded] = useFonts({
        "Lato-Regular": require("../fonts/Lato-Regular.ttf"),
        "Lato-Light": require("../fonts/Lato-Light.ttf")
    })

    return {fontsLoaded}
}
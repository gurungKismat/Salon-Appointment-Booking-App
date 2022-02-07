import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Home  from "../screens/Home/index";


const Stack = createNativeStackNavigator();

const  AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    );
}

export default AppStack;
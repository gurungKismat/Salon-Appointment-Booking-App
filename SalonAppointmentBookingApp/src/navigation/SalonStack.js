import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/SalonHome/SalonHome";


const Stack = createNativeStackNavigator();

const  SalonStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SalonHome" component={Home}/>
        </Stack.Navigator>
    );
}

export default SalonStack;
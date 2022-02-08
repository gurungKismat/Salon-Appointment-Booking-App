import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/CustomerHome/CustomerHome";


const Stack = createNativeStackNavigator();

const  CustomerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CustomerHome" component={Home}/>
        </Stack.Navigator>
    );
}

export default CustomerStack;
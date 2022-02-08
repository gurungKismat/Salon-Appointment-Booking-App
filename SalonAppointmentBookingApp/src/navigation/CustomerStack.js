import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/CustomerScreens/CustomerHome/CustomerHome";
import SearchScreen from "../screens/CustomerScreens/Search/Search";
import AppointmentScreen from "../screens/CustomerScreens/Appointments/Appointment";
import NotificationScreen from "../screens/CustomerScreens/Notifications/Notification";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text} from "react-native";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();

const Detail = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "black"}}>Detail Screen</Text>
        </View>
    );
}

const SearchNavigator = () => {
    return(
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="Search" component={SearchScreen}/>
            <SearchStack.Screen name="Detail" component={Detail}/>
        </SearchStack.Navigator>
    );
}


const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Discover" component={SearchNavigator} />
            <Tab.Screen name="CustomerAppointment" component={AppointmentScreen} />
            <Tab.Screen name="CustomerNotification" component={NotificationScreen} />
        </Tab.Navigator>
    );
}

const  CustomerStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="CustomerMain" component={Main}/>
        </Stack.Navigator>
    );
}

export default CustomerStack;
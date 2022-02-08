import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/CustomerScreens/CustomerHome/CustomerHome";
import SearchScreen from "../screens/CustomerScreens/Search/Search";
import AppointmentScreen from "../screens/CustomerScreens/Appointments/Appointment";
import NotificationScreen from "../screens/CustomerScreens/Notifications/Notification";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
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
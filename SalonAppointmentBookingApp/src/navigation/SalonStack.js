import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/SalonScreens/SalonHome/SalonHome';
import Notification from '../screens/SalonScreens/SalonNotification/Notification';
import Appointment from '../screens/SalonScreens/SalonAppointment/Appointments';
import Profile from '../screens/SalonScreens/SalonProfile/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SalonTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="SalonAppointment"
        component={Appointment}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-question" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
};

const SalonStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SalonTab" component={SalonTabScreen} />
    </Stack.Navigator>
  );
};

export default SalonStack;

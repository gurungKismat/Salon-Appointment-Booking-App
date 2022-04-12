import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/SalonScreens/SalonHome/SalonHome';
import Notification from '../screens/SalonScreens/SalonNotification/Notification';
import Appointment from '../screens/SalonScreens/SalonAppointment/Appointments';
import Profile from '../screens/SalonScreens/SalonProfile/Profile';
import SalonAvailability from '../screens/SalonScreens/SalonAvailability/SalonAvailability';
import SalonServices from '../screens/SalonScreens/SalonServices/SalonServices';
import SalonTransactionScreen from '../screens/SalonScreens/SalonTransactionHistory/SalonTransactionHistory';
import ProfileSettings from '../screens/SalonScreens/ProfileSettings/ProfileSettings';
import RequestedAppointment from '../screens/SalonScreens/RequestedAppointment/RequestedAppointment';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppointmentNavigatorSalon = createNativeStackNavigator();

// Screens inside Apointment Tab bar
const AppointmentsNavigator = () => {
  return (
    <AppointmentNavigatorSalon.Navigator
      initialRouteName="SalonAppointment"
      headerMode="screen">
      <AppointmentNavigatorSalon.Screen
        name="SalonAppointment"
        component={Appointment}
        options={{
          title: 'Appointments',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <AppointmentNavigatorSalon.Screen
        name="SalonRequestedAppointment"
        component={RequestedAppointment}
        options={{
          title: 'Requested Appointments',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </AppointmentNavigatorSalon.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="SalonHome">
      <HomeStack.Screen
        name="SalonHome"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <HomeStack.Screen
        name="SalonAvailability"
        component={SalonAvailability}
        options={{
          title: 'Salon Availability',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <HomeStack.Screen
        name="SalonServices"
        component={SalonServices}
        options={{
          title: 'Salon Services',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <HomeStack.Screen
        name="SalonTransaction"
        component={SalonTransactionScreen}
        options={{
          title: 'Salon Transaction',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="SalonProfile">
      <ProfileStack.Screen
        name="SalonProfile"
        component={Profile}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />

      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          title: 'Profile Settings',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

const SalonTabScreen = () => {
  return (
    <Tab.Navigator headerMode="screen">
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="SalonAppointmentNavigator"
        component={AppointmentsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Appointment',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-question" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      {/* 
      <Tab.Screen
        name="SalonAppointment"
        component={Appointment}
        options={{
          title: 'Appointment',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarLabel: 'Appointment',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-question" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
        }}
      /> */}

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          title: 'Notification',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6366f1',
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

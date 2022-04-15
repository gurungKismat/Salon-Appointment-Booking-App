import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/CustomerScreens/CustomerHome/CustomerHome';
import SearchScreen from '../screens/CustomerScreens/Search/Search';
import AppointmentScreen from '../screens/CustomerScreens/Appointments/Appointment';
import NotificationScreen from '../screens/CustomerScreens/Notifications/Notification';
import SalonInfo from '../screens/CustomerScreens/ViewSalonInfo/SalonInfo';
import CustomerProfile from '../screens/CustomerScreens/CustomerProfile/CustomerProfile';
import {View, Text} from 'react-native';
import SelectedServices from '../redux/store/features/service/SelectedService';
import CustomerProfileSettings from '../screens/CustomerScreens/ProfileSettings/ProfileSettings';
import RequestedAppointment from '../screens/CustomerScreens/RequestedAppointment/RequestedAppointment';
import PopularServices from '../screens/CustomerScreens/PopularServices/PopularServices';
import PastAppointment from '../screens/CustomerScreens/PastAppointment/PastAppointment';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const AppointmentNavigator = createNativeStackNavigator();
const ProfileNavigator = createNativeStackNavigator();

// Screens inside Apointment Tab bar
const AppointmentsNavigator = () => {
  return (
    <AppointmentNavigator.Navigator
      initialRouteName="CustomerAppointment"
      headerMode="screen">
      <AppointmentNavigator.Screen
        name="CustomerAppointment"
        component={AppointmentScreen}
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
      <AppointmentNavigator.Screen
        name="RequestedAppointment"
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
      <AppointmentNavigator.Screen
        name="CustomerPastAppointment"
        component={PastAppointment}
        options={{
          title: 'Past Appointments',
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
    </AppointmentNavigator.Navigator>
  );
};

// Screens inside Search Tab bar
const SearchNavigator = () => {
  return (
    <SearchStack.Navigator initialRouteName="Search" headerMode="screen">
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
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
    </SearchStack.Navigator>
  );
};

// Screens inside Search Tab bar
const CustomerProfileNavigator = () => {
  return (
    <ProfileNavigator.Navigator
      initialRouteName="CustomerProfile"
      headerMode="screen">
      <ProfileNavigator.Screen
        name="CustomerProfile"
        component={CustomerProfile}
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
      <ProfileNavigator.Screen
        name="CustomerProfileSettings"
        component={CustomerProfileSettings}
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
    </ProfileNavigator.Navigator>
  );
};

// Customer Initial Home Screen
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
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
        name="CustomerProfile"
        component={CustomerProfile}
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
      <HomeStack.Screen
        name="CustomerProfileSettings"
        component={CustomerProfileSettings}
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
      <HomeStack.Screen
        name="SalonInfo"
        component={SalonInfo}
        options={{
          // title: 'Salon Info',
          // headerStyle: {
          //   backgroundColor: '#6200ee',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          //   fontSize: 20,
          // },
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ServiceList"
        component={SelectedServices}
        options={{
          title: 'Book Service',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          // headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="PopularServices"
        component={PopularServices}
        options={{
          title: 'Popular Services',
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          // headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

// Main navigator with tab screens
const Main = () => {
  return (
    <Tab.Navigator headerMode="screen">
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarStyle: {
            backgroundColor: '#6366f1',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          // tabBarActiveTintColor: '#6366f1',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#a5b4fc',
        }}
      />
      <Tab.Screen
        name="Discover"
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Discover',
          tabBarStyle: {
            backgroundColor: '#6366f1',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#a5b4fc',
        }}
      />
      <Tab.Screen
        name="CustomerAppointmentNavigator"
        component={AppointmentsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Appointment',
          tabBarStyle: {
            backgroundColor: '#6366f1',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-question" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#a5b4fc',
        }}
      />
      <Tab.Screen
        name="CustomerProfileNavigator"
        component={CustomerProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarStyle: {
            backgroundColor: '#6366f1',
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#a5b4fc',
        }}
      />
      {/* <Tab.Screen
        name="CustomerAppointmentNavigator"
        component={AppointmentNavigator}
        options={{
          title: 'Appointment',
          headerStyle: {
            backgroundColor: '#6200ee',
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
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        }}
      /> */}

      {/* <Tab.Screen
        name="CustomerNotification"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          tabBarStyle: {
            backgroundColor: '#6366f1'
          },
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
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#a5b4fc',
        }}
      /> */}
    </Tab.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerMain" component={Main} />
    </Stack.Navigator>
  );
};

export default CustomerStack;

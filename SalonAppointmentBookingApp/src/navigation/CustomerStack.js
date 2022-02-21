import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/CustomerScreens/CustomerHome/CustomerHome';
import SearchScreen from '../screens/CustomerScreens/Search/Search';
import AppointmentScreen from '../screens/CustomerScreens/Appointments/Appointment';
import NotificationScreen from '../screens/CustomerScreens/Notifications/Notification';
import SalonInfo from '../screens/CustomerScreens/ViewSalonInfo/SalonInfo';
import {View, Text} from 'react-native';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();

const Detail = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Detail Screen</Text>
    </View>
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
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <SearchStack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail',
          headerStyle: {
            backgroundColor: '#6200ee',
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
            backgroundColor: '#6200ee',
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
          title: 'Salon Info',
          headerStyle: {
            backgroundColor: '#6200ee',
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
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Discover"
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Discover',
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="CustomerAppointment"
        component={AppointmentScreen}
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
      />

      <Tab.Screen
        name="CustomerNotification"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          headerStyle: {
            backgroundColor: '#6200ee',
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
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        }}
      />
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

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/CustomerScreens/CustomerHome/CustomerHome';
import SearchScreen from '../screens/CustomerScreens/Search/Search';
import AppointmentScreen from '../screens/CustomerScreens/Appointments/Appointment';
import NotificationScreen from '../screens/CustomerScreens/Notifications/Notification';
import {View, Text} from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();

const Detail = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Detail Screen</Text>
    </View>
  );
};

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

const Main = () => {
  return (
    <Tab.Navigator headerMode="screen">
      <Tab.Screen
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

          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'tomato',
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
          tabBarActiveTintColor: 'tomato',
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
          tabBarActiveTintColor: 'tomato',
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
          tabBarActiveTintColor: 'tomato',
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

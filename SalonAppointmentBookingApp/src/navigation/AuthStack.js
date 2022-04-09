import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/index';
import CustomerRegister from '../screens/Register/CutomerRegister';
import SalonRegister from '../screens/Register/SalonRegister';
import RegisterSelection from '../screens/RegisterationSelection/RegisterationSelection';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
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
      <Stack.Screen
        name="CustomerRegister"
        component={CustomerRegister}
        options={{
          title: 'Customer Register',
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

      <Stack.Screen
        name="SalonRegister"
        component={SalonRegister}
        options={{
          title: 'Salon Register',
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

      <Stack.Screen
        name="RegisterSelection"
        component={RegisterSelection}
        options={{
          title: 'Register Selection',
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
    </Stack.Navigator>
  );
};

export default AuthStack;

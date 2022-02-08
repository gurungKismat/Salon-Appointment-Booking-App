import React from 'react';
import Router from './src/navigation/Router';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import AuthStack from "./src/navigation/AuthStack";

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;

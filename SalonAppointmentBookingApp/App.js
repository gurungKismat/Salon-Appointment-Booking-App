import React from 'react';
import Router from './src/navigation/Router';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
// import AuthStack from "./src/navigation/AuthStack";

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

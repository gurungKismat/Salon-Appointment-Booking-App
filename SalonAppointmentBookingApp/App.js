import React from 'react';
import Router from './src/navigation/Router';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import store from './src/redux/store/store';
import {Provider} from 'react-redux';
// import AuthStack from "./src/navigation/AuthStack";

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

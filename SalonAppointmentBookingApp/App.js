import React from 'react';
import Router from './src/navigation/Router';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import store from './src/redux/store/store';
import {Provider} from 'react-redux';

// import AuthStack from "./src/navigation/AuthStack";

const App = () => {

  const theme = extendTheme({
    components: {
      Input: {
        borderColor: 'red.600',
        borderWidth: 2,
      },
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme} >
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

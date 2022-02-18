import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, Button} from 'react-native';

const HomeScreen = () => {
  const signout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Customer Home Screen</Text>
      <Button title="signout" onPress={signout} />
    </View>
  );
};

export default HomeScreen;

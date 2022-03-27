import React from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: 'black'}}>Salon Profile Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Profile;

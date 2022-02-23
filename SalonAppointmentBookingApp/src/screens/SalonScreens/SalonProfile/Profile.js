import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const Profile = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: 'black'}}>Salon Profile Screen</Text>
    </View>
  );
};

export default Profile;

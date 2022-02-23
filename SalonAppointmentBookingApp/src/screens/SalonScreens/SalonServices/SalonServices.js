import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const SalonServices = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: 'black'}}>Salon Services Screen</Text>
    </View>
  );
};

export default SalonServices;

import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const SalonAvailability = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: 'black'}}>Salon Availability Screen</Text>
    </View>
  );
};

export default SalonAvailability;

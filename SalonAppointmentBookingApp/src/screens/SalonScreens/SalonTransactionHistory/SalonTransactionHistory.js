import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const SalonTransactionScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: 'black'}}>Salon Transaction History Screen</Text>
    </View>
  );
};

export default SalonTransactionScreen;

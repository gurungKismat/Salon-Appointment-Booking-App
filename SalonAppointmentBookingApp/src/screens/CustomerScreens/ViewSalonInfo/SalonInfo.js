import React from 'react';
import Tabbar from '../../../components/CustomTabbar';
import ViewCart from '../../../components/ViewCart';
import {View} from 'react-native';

const SalonInfo = ({route}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
      <Tabbar data={route} />
      <ViewCart />
    </View>
  );
};

export default SalonInfo;

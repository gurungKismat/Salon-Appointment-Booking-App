import { TabRouter } from '@react-navigation/native';
import React from 'react';
import Tabbar from '../../../components/CustomTabbar';
import ViewCart from '../../../components/ViewCart';

const SalonInfo = ({route}) => {
  return (
    <>
      <Tabbar data={route}/>
      <ViewCart />
    </>
  );
};

export default SalonInfo;

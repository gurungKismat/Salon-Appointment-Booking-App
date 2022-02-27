import React from 'react';
import {View, Text, StatusBar, FlatList, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SelectedServices = () => {
    const service = useSelector(state => state.service);
    console.log('service ' + JSON.stringify(service));

    const renderItem = ({ item }) => (
      <Item title={item.serviceName} />
    );

  return (
    <View style={{flex: 1,}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <Text style={{color: "black", marginBottom: 20}}>Selected Services FlatList</Text>
      <FlatList
        data={service}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SelectedServices;


const styles = StyleSheet.create({
  item: {
    backgroundColor: "pink"
  },

  title: {
    color: "black"
  }
})
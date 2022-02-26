import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon, Actionsheet, useDisclose, Box, Checkbox} from 'native-base';
import ViewCart from './ViewCart';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Item = ({title}) => {
  const [select, setSelect] = useState(false);

  const onPress = () => {
    setSelect(!select);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.servicesItem} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Checkbox
          value="#6200ee"
          colorScheme="purple"
          size="md"
          icon={<Icon as={<MaterialCommunityIcon name="check" />} />}
          isChecked={select}
          aria-label="Add"
        />
      </TouchableOpacity>
    </View>
  );
};

const ServiceList = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#6200ee',
    padding: 15,
    marginVertical: 8,
  },
  header: {
    marginTop: 10,
    fontSize: 30,
    color: 'black',
  },
  title: {
    fontSize: 20,
    color: '#e8ecf1',
  },
  servicesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'blue',
  },
});

export default ServiceList;

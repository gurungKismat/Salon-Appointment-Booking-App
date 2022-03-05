import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Heading, Icon, Divider} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    categoryTitle: 'HairCut',
    // data: ['SkinFade', 'Buzzcut', 'HighFade'],
    data: [
      {serviceName: 'SkinFade', price: '200', duration: '30 min'},
      {serviceName: 'Buzzcut', price: '240', duration: '24 min'},
      {serviceName: 'HighFade', price: '250', duration: '35 min'},
    ],
  },

  {
    categoryTitle: 'Massage',
    // data: ['Feet', 'Message - Neck & Shoulders', 'Massage - Relaxation'],
    data: [
      {serviceName: 'Feet', price: '300', duration: '30 min'},
      {
        serviceName: 'Message - Neck & Shoulders',
        price: '440',
        duration: '24 min',
      },
      {serviceName: 'Massage - Relaxation', price: '250', duration: '1 hr'},
    ],
  },

  {
    categoryTitle: 'Skin Care',
    // data: ['Feet', 'Message - Neck & Shoulders', 'Massage - Relaxation'],
    data: [
      {serviceName: 'Facial Anti Acne', price: '500', duration: '30 min'},
      {serviceName: 'Facial Alovera', price: '450', duration: '24 min'},
      {serviceName: 'Fried Cleanup', price: '240', duration: '1 hr'},
    ],
  },
];

const Item = ({service, headers, index}) => {
  return (
    <View style={styles.serviceContainer}>
      <View style={styles.availableServices}>
        <View style={styles.itemRow}>
          <Text style={styles.availableItmText}>{service.serviceName}</Text>
          <Icon
            as={<MaterialCommunityIcon name={'pencil'} />}
            size={7}
            mr="2"
            color="white"
            onPress={() => alert('hello')}
          />
        </View>
        <Text style={styles.servicePrice}>Price: Rs {service.price}</Text>
        <Text style={styles.serviceDuration}>duration: {service.duration}</Text>
      </View>
    </View>
  );
};

const SalonServices = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#6200ee'} />
      <View style={styles.addServiceRow}>
        <Heading size="md">Add New Services</Heading>
        <Icon
          as={<MaterialCommunityIcon name={'plus'} />}
          size={10}
          mr="2"
          color="muted.400"
          onPress={() => alert('hello')}
        />
      </View>
      <Divider bg="black" thickness="2" my="2" />
      <Heading size="md" my="4">
        Available Services
      </Heading>
      <View style={styles.sectionListContainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section, index}) => (
            <Item
              service={item}
              headers={section.categoryTitle}
              index={index}
            />
          )}
          renderSectionHeader={({section: {categoryTitle}}) => (
            <Text style={styles.sectionHeader}>{categoryTitle}</Text>
          )}
        />
      </View>
    </View>
  );
};

export default SalonServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  addServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionListContainer: {
    flex: 1,
  },

  sectionHeader: {
    color: 'black',
    fontSize: 25,
    fontWeight: '400',
    margin: 5,
  },

  availableServices: {
    paddingVertical: 10,
    borderRadius: 20,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  serviceContainer: {
    paddingVertical: 8,
    width: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 20,
    marginVertical: 4,
  },

  availableItmText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 19,
  },

  servicePrice: {
    marginLeft: 8,
    marginTop: 10,
    color: 'white',
    fontSize: 15,
  },

  serviceDuration: {
    marginLeft: 8,
    marginTop: 4,
    color: 'white',
    fontSize: 15,
  },
});

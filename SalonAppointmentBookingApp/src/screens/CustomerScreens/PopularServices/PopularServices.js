import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Heading, Image, Divider} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DATA = [
  {
    id: 1,
    name: 'kismat',
    age: 21,
  },
  {
    id: 2,
    name: 'gurung',
    age: 25,
  },
];

const Item = ({data}) => {

    const addService = () => {
        alert('add')
    }

    const removeService = () => {
        alert('remove')
    }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.topRowItem}>
        <View style={styles.columnItems}>
          <Text style={{color: 'black', paddingVertical: 3, fontSize: 18}}>
            {data.serviceName}
          </Text>
          <Text style={styles.serviceDetail}>Price: Rs {data.price}</Text>
          <Text style={styles.serviceDetail}>Duration: Rs {data.duration}</Text>
        </View>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="Default Salon Img"
          size="md"
          rounded={10}
        />
      </View>
      <View style={styles.rowButtons}>
        <TouchableOpacity
            style={styles.btnStyle}
            onPress={addService}
        >
          <Text>Add Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={removeService}
            style={styles.btnStyle}
        >
          <Text>Remove Service</Text>
        </TouchableOpacity>
      </View>
      {/* <Divider thicknewss/> */}
    </View>
  );
};

const PopularServices = ({route}) => {

    const {serviceName} = route.params;
    console.log('service name passed: '+serviceName)
    const [serviceData, setServiceData] = useState({});

  const renderItem = ({item}) => <Item data={item} />;

  useEffect(() => {
    const subscriber = firestore().collection('salonServices').doc('OBJM3MsbiQbGcoxJZYakosA5BvT2').onSnapshot(doc => {
        if (doc.exists) {
            // console.log('doc exist')
            const salonData = doc.data().data;
            // console.log('salondata; '+JSON.stringify(salonData))
            const newData = salonData.find(item => {
                // console.log('item: '+JSON.stringify(item.categoryTitle))
                return item.categoryTitle == serviceName
            })
            // console.log('newdata: '+JSON.stringify(newData))   
            setServiceData(newData)
        }

        return () => subscriber();
    })
  }, [])



  return (
    <View style={styles.rootContainer}>
      <Heading ml={2}>{serviceData.categoryTitle}</Heading>
      <FlatList
      style={{marginTop: 10}}
        data={serviceData.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PopularServices;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#e7e5e4',
    padding: 20,
    
  },

  itemContainer: {
    backgroundColor: '#d6d3d1',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 20,
  },

  columnItems: {
    flexDirection: 'column',
  },

  topRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  serviceDetail: {
    color: 'black',
    fontSize: 17,
    paddingVertical: 2,
  },

  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 15,
  },

  btnStyle: {
      backgroundColor: 'red',
      padding: 10,
      marginRight: 5,
      borderRadius: 20,
  }
});

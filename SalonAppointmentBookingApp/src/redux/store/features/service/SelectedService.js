import React from 'react';
import {View, Text, StatusBar, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Icon} from 'native-base';

// flat list services items
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Icon
      ml="1"
      size="7"
      color="white"
      onPress={() => alert("clicked")}
      as={<MaterialCommunityIcon name="close" />}
    />
  </View>
);

const SelectedServices = () => {
  const service = useSelector(state => state.service);
  console.log('service ' + JSON.stringify(service));

  const renderItem = ({item}) => <Item title={item.serviceName} />;

  return (
    <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#6200ee'} />
      <View style={styles.salonInfo}>
        <View style={styles.leftContent}>
          <Text style={styles.salonName}>Reaver Salon</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Rating
              type="custom"
              ratingBackgroundColor="silver"
              tintColor="white"
              ratingColor="blue"
              readonly
              imageSize={24}
              style={{paddingVertical: 5}}
            />
            <Text style={{fontWeight: 'bold', color: 'black', marginStart: 5}}>
              4.5
            </Text>
          </View>
          <Text style={styles.salonInfoText}>Naxal, Kathmandu</Text>
        </View>
        <View style={styles.rightContent}>
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            size="lg"
          />
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Services
        </Text>
        <FlatList
          data={service}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default SelectedServices;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    marginTop: 5,
    backgroundColor: 'pink',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: 'black',
  },

  salonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  salonName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },

  salonInfoText: {
    color: 'black',
    fontSize: 16,
  },

  leftContent: {},

  rightContent: {},
});

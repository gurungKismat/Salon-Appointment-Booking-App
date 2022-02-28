import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'native-base';
import {useDispatch} from 'react-redux';
import {serviceAdded} from '../redux/store/features/service/serviceSlice';
import {useSelector} from 'react-redux';

const DATA = [
  {
    title: 'HairCut',
    data: ['SkinFade', 'Buzzcut', 'HighFade'],
  },

  {
    title: 'Massage',
    data: ['Feet', 'Message - Neck & Shoulders', 'Massage - Relaxation'],
  },

  {
    title: 'Skin Care',
    data: ['Facial Anti Acne', 'Facial Alovera', 'Fried Cleanup'],
  },
  {
    title: 'Nails',
    data: ['Removal', 'Pedicure', 'Paraffin'],
  },
];

const Item = ({title, headers, index}) => {
  const [select, setSelect] = useState();
  const dispatch = useDispatch();
  const service = useSelector(state => state.service);

  const selectedService = () => {
    const isServiceSelected = Boolean(
      service.find(item => title === item.serviceName),
    );
    // console.log("isServiceSelected: "+isServiceSelected)
    return isServiceSelected;
  };

  const onValChange = value => {
    setSelect(value);
    dispatch(
      serviceAdded({
        id: index,
        serviceHeading: headers,
        serviceName: title,
        isSelected: value,
      }),
    );
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.servicesItem}
        onPress={() => onValChange(!select)}>
        <Text style={styles.title}>{title}</Text>
        {!selectedService() ? (
          <Icon
            ml="1"
            size="8"
            color="white"
            as={<MaterialCommunityIcon name="plus" />}
          />
        ) : (
          <Icon
            ml="1"
            size="8"
            color="white"
            as={<MaterialCommunityIcon name="check" />}
          />
        )}
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
        renderItem={({item, section, index}) => (
          <Item title={item} headers={section.title} index={index} />
        )}
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
    borderRadius: 20,
  },
  header: {
    marginTop: 10,
    fontSize: 30,
    color: 'black',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e8ecf1',
  },
  servicesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'blue',
  },
});

export default ServiceList;

import React, {useState, useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';

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

const Item = ({salonId, serviceName, headers, index}) => {
  console.log('serviceName ' + JSON.stringify(serviceName));
  console.log('headers: ' + headers);
  const [select, setSelect] = useState();

  const dispatch = useDispatch();
  const service = useSelector(state => state.service);

  const selectedService = pickedService => {
    const isServiceSelected = Boolean(
      service.find(item => pickedService === item.serviceName),
    );
    // console.log("isServiceSelected: "+isServiceSelected)
    return isServiceSelected;
  };

  const onValChange = value => {
    setSelect(value);
    dispatch(
      serviceAdded({
        id: index,
        salonId: salonId,
        serviceHeading: headers,
        serviceName: serviceName.serviceName,
        isSelected: value,
      }),
    );
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.servicesItem}
        onPress={() => onValChange(!select)}>
        <View style={{flexDirection: "column"}}>
          <Text style={styles.title}>{serviceName.serviceName}</Text>
          <Text style={styles.servicePrice}>Price: Rs {serviceName.price}</Text>
              <Text style={styles.serviceDuration}>
                Duration: {serviceName.duration}
              </Text>
        </View>
        {!selectedService(serviceName.serviceName) ? (
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

const ServiceList = ({salonId}) => {
  // console.log("salonid: "+salonId)
  const [salonServices, setSalonServices] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('service list useeffect');
    firestore()
      .collection('salonServices')
      .doc(salonId)
      .onSnapshot(doucmentSnapshot => {
        if (doucmentSnapshot.exists) {
          const salonServices = doucmentSnapshot.data().data;
          console.log('services list; ' + JSON.stringify(salonServices));
          setSalonServices(salonServices);
          if (loading) {
            setLoading(false);
          }
        }
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={salonServices}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, section, index}) => (
          <Item
            salonId={salonId}
            serviceName={item}
            headers={section.categoryTitle}
            index={index}
          />
        )}
        renderSectionHeader={({section: {categoryTitle}}) => (
          <Text style={styles.header}>{categoryTitle}</Text>
        )}
      />
    </View>
  );
};

export default ServiceList;

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
    fontSize: 19,
    margin: 5,
    fontWeight: 'bold',
    color: '#e8ecf1',
  },
  servicesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'blue',
  },

  servicePrice: {
    marginLeft: 5,
    marginTop: 10,
    color: 'white',
    fontSize: 15,
  },

  serviceDuration: {
    marginLeft: 5,
    marginTop: 4,
    color: 'white',
    fontSize: 15,
  },
});

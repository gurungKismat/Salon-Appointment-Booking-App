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
import {serviceAdded} from '../redux/store/features/service/serviceSlice';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Item = ({salonId, serviceName, headers}) => {
  // console.log('serviceName ' + JSON.stringify(serviceName));
  // console.log('headers: ' + headers);
  const dispatch = useDispatch();
  const service = useSelector(state => state.service);

  // console.log('salon Id; ' + salonId);

  const [select, setSelect] = useState(false);

  // useEffect(() => {
  //   console.log("store value: "+JSON.stringify(service))
  //   console.log("select value; "+select)
  // },[service.length])

  const selectedService = pickedService => {
    const isServiceSelected = Boolean(
      service.find(item => pickedService === item.serviceName),
    );
    // console.log("isServiceSelected: "+isServiceSelected)
    return isServiceSelected;
  };

  const onValChange = value => {
    // console.log("value; "+value)

    if (service.length > 0) {
      if (service[0].salonId === salonId) {
        setSelect(value);
        dispatch(
          serviceAdded({
            id: uuid.v4(),
            salonId: salonId,
            serviceHeading: headers,
            serviceName: serviceName.serviceName,
            isSelected: value,
            servicePrice: serviceName.price,
          }),
        );
      } else {
        alert('Please select only one salon at a time');
        // console.log("CURRENT SERVICE: "+JSON.stringify(service))
      }
    } else {
      setSelect(value);
      dispatch(
        serviceAdded({
          id: uuid.v4(),
          salonId: salonId,
          serviceHeading: headers,
          serviceName: serviceName.serviceName,
          isSelected: value,
          servicePrice: serviceName.price,
        }),
      );
    }

    // console.log('service length: ' + service.length);
    // if (service.length > 0) {
    //   console.log('service length greater than 0 ');
    // }
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.servicesItem}
        onPress={() => onValChange(!select)}>
        <View style={{flexDirection: 'column'}}>
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
          // console.log('services list; ' + JSON.stringify(salonServices));
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
            // service={service}
            // dispatch={dispatch}
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

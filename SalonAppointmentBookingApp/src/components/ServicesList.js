import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Heading, Image, Divider, Icon} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {serviceAdded} from '../redux/store/features/service/serviceSlice';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';

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

const Item = ({salonId, serviceName, headers}) => {
  // console.log('serviceName ' + JSON.stringify(serviceName));
  // console.log('headers: ' + headers);
  const dispatch = useDispatch();
  const service = useSelector(state => state.service);

  const [select, setSelect] = useState(false);
  const [serviceImage, setServiceImg] = useState(undefined);

  // check if the store already has the same data before adding
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

  // return (
  //   <View style={styles.item}>
  //     <TouchableOpacity
  //       style={styles.servicesItem}
  //       onPress={() => onValChange(!select)}>
  //       <View style={{flexDirection: 'column'}}>
  //         <Text style={styles.title}>{serviceName.serviceName}</Text>
  //         <Text style={styles.servicePrice}>Price: Rs {serviceName.price}</Text>
  //         <Text style={styles.serviceDuration}>
  //           Duration: {serviceName.duration}
  //         </Text>
  //       </View>
  //       {!selectedService(serviceName.serviceName) ? (
  //         <Icon
  //           ml="1"
  //           size="8"
  //           color="white"
  //           as={<MaterialCommunityIcon name="plus" />}
  //         />
  //       ) : (
  //         <Icon
  //           ml="1"
  //           size="8"
  //           color="white"
  //           as={<MaterialCommunityIcon name="check" />}
  //         />
  //       )}
  //     </TouchableOpacity>
  //   </View>
  // );
  // const [selected, setSelected] = useState(false);

  // downloads the image from the storage
  const getImageUrl = async () => {
    const url = serviceName.serviceImage;
    if (url !== undefined) {
      // console.log('image exist');
      const reference = storage().ref().child('/serviceImages').child(url);
      // getServiceImage(reference);

      const downloadUrl = await reference.getDownloadURL();
      return downloadUrl;
    } else {
      // console.log('image undefined: '+url);
      return undefined;
    }
  };

  useEffect(() => {
    let isMounted = true;
    getImageUrl()
      .then(downloadUrl => {
        if (isMounted) {
          if (downloadUrl !== undefined) {
            setServiceImg(downloadUrl);
          }
          // if (loading) {
          //   setLoading(false);
          // }
        }
      })
      .catch(error => {
        console.error('error in salon services' + error);
      });

    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <Divider bg="muted.400" />
      <View
        style={!select ? styles.itemContainer : styles.itemContainerSelected}>
        <View style={styles.topRowItem}>
          <View style={styles.columnItems}>
            <Text style={{color: 'black', paddingVertical: 3, fontSize: 18}}>
              {serviceName.serviceName}
            </Text>
            <Text style={styles.serviceDetail}>
              Price: Rs {serviceName.price}
            </Text>
            <Text style={styles.serviceDetail}>
              Duration: Rs {serviceName.duration}
            </Text>
          </View>
          {serviceImage === undefined ? (
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Default Salon Img"
              size="lg"
              rounded={10}
            />
          ) : (
            <Image
              source={{
                uri: serviceImage,
              }}
              alt="Default Salon Img"
              size="lg"
              rounded={10}
            />
          )}
        </View>
        <View style={styles.rowButtons}>
          {!selectedService(serviceName.serviceName) ? (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => onValChange(!select)}>
              <Text style={{color: 'white'}}>Add Service</Text>
              <Icon
                ml="1"
                size="5"
                color="white"
                as={<MaterialCommunityIcon name="plus" />}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => onValChange(!select)}>
              <Text style={{color: 'white'}}>Service Added</Text>
              <Icon
                ml="1"
                size="5"
                color="white"
                as={<MaterialCommunityIcon name="check" />}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Divider bg="muted.400" />
    </>
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
    paddingTop: 30,
    // marginHorizontal: 16,
    bottom: 45,
  },
  item: {
    backgroundColor: '#6200ee',
    padding: 15,
    marginVertical: 8,
    borderRadius: 20,
  
  },
  header: {
    marginVertical: 10,
    marginLeft: 13,
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

  // added later

  rootContainer: {
    flex: 1,
    backgroundColor: '#e7e5e4',
  },

  itemContainer: {
    backgroundColor: '#e7e5e4',

    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  itemContainerSelected: {
    backgroundColor: '#d6d3d1',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  },

  iconBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 12,
    marginRight: 5,
    borderRadius: 25,
  },
});

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Heading, Image, Divider, Icon} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {serviceAdded} from '../../../redux/store/features/service/serviceSlice';
import {useSelector, useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import ViewCart from '../../../components/ViewCart';

// const DATA = [
//   {
//     id: 1,
//     name: 'kismat',
//     age: 21,
//   },
//   {
//     id: 2,
//     name: 'gurung',
//     age: 25,
//   },
// ];

const Item = ({data}) => {
  // console.log('data: ' + JSON.stringify(data));

  const serviceSelector = useSelector(state => state.service);
  console.log('serviceselector; ' + JSON.stringify(serviceSelector));
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [serviceImage, setServiceImg] = useState(undefined);

  // check if service is already added to the store
  const selectedService = pickedService => {
    const isServiceSelected = Boolean(
      serviceSelector.find(item => pickedService === item.serviceName),
    );

    return isServiceSelected;
  };

  const addService = value => {
    if (serviceSelector.length > 0) {
      if (serviceSelector[0].salonId === data.salonId) {
        setSelect(value);
        dispatch(
          serviceAdded({
            id: uuid.v4(),
            salonId: data.salonId,
            serviceHeading: data.categoryTitle,
            serviceName: data.serviceName,
            isSelected: value,
            servicePrice: data.price,
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
          salonId: data.salonId,
          serviceHeading: data.categoryTitle,
          serviceName: data.serviceName,
          isSelected: value,
          servicePrice: data.price,
        }),
      );
    }
  };

  // downloads the image from the storage
  const getImageUrl = async () => {
    const url = data.serviceImage;
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
              {data.serviceName}
            </Text>
            <Text style={styles.serviceDetail}>Price: Rs {data.price}</Text>
            <Text style={styles.serviceDetail}>
              Duration: Rs {data.duration}
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
          {!selectedService(data.serviceName) ? (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => addService(!select)}>
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
              onPress={() => addService(!select)}>
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

const PopularServices = ({route}) => {
  const {serviceName} = route.params;

  // console.log('service name passed: '+serviceName)
  const [serviceData, setServiceData] = useState({});
  const [services, setServices] = useState([]);

  const renderItem = ({item}) => <Item data={item} />;

  useEffect(() => {
    const subscriber = firestore()
      .collection('salonServices')
      .doc('UnA41iSIg0dGRbJVUYtEdtPossn2')
      .onSnapshot(doc => {
        if (doc.exists) {
          // console.log('doc exist')
          const salonData = doc.data().data;
          // console.log('salondata; '+JSON.stringify(salonData))
          const newData = salonData.find(item => {
            // console.log('item: '+JSON.stringify(item.categoryTitle))
            return item.categoryTitle == serviceName;
          });
          // console.log('newdata: '+JSON.stringify(newData))
          // const arr = [];
          // arr.push(newData);
          // console.log('arr: '+JSON.stringify(arr))
          const category = newData.categoryTitle;

          newData.data.forEach(service => {
            service.categoryTitle = category;
            service.salonId = 'UnA41iSIg0dGRbJVUYtEdtPossn2';
          });
          setServiceData(newData);
        }

        return () => subscriber();
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Heading ml={2} p={3} mb={5}>
        {serviceData.categoryTitle}
      </Heading>
      <FlatList
        style={{marginTop: 5, bottom: 30}}
        data={serviceData.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <ViewCart />
    </View>
  );
};

export default PopularServices;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 10,
  },

  itemContainer: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  itemContainerSelected: {
    backgroundColor: '#d1d5db',
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

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {Heading, Icon, Divider, useToast} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewServiceModal from '../../../components/AddNewServiceModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmptyList from '../../../components/EmptyList';
import UpdateSalonService from '../../../components/UpdateSalonService';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {updateService} from '../../../redux/store/features/updateService/updateserviceSlice';

// const DATA = [
//   {
//     categoryTitle: 'HairCut',
//     data: [
//       {serviceName: 'SkinFade', price: '200', duration: '30 min'},
//       {serviceName: 'Buzzcut', price: '240', duration: '24 min'},
//       {serviceName: 'HighFade', price: '250', duration: '35 min'},
//     ],
//   },

//   {
//     categoryTitle: 'Massage',
//     data: [
//       {serviceName: 'Feet', price: '300', duration: '30 min'},
//       {
//         serviceName: 'Message - Neck & Shoulders',
//         price: '440',
//         duration: '24 min',
//       },
//       {serviceName: 'Massage - Relaxation', price: '250', duration: '1 hr'},
//     ],
//   },

//   {
//     categoryTitle: 'Skin Care',
//     data: [
//       {serviceName: 'Facial Anti Acne', price: '500', duration: '30 min'},
//       {serviceName: 'Facial Alovera', price: '450', duration: '24 min'},
//       {serviceName: 'Fried Cleanup', price: '240', duration: '1 hr'},
//     ],
//   },
// ];

const SalonServices = () => {
  const toast = useToast();
  const id = 'test-toast';
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableServices, setAvailableServices] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.updateService);
  var currentHeader;
  var currServiceId;
  // const selector = useSelector(state => state.updateService);

  const editService = (header, service, index) => {
    console.log('service: ' + JSON.stringify(service));
    // sectionUpdated = header;
    // serviceUpdated = service;
    // indexUpdated = index;
    // console.log('header: ' + header);
    // console.log('serviceupdated: ' + service.serviceName);

    // dispatch(editService(service));

    // setModal();
    // console.log("header: "+header);
    // console.log(JSON.stringify(service))
    // alert(JSON.stringify(service));

    dispatch(
      updateService({
        category: header,
        serviceId: service.id,
        service: service.serviceName,
        price: service.price,
        duration: service.duration,
      }),
    );
    setUpdateModal(true);

    console.log('selector: ' + JSON.stringify(selector));
  };

  // display toast after adding new service
  const displayToast = () => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        title: 'Service Deleted',
        status: 'success',
        placement: 'bottom',
      });
    }
  };

  function filterService(value, index, initialService) {
    console.log('current header: ' + currentHeader);
    if (currentHeader.toLowerCase() === value.categoryTitle.toLowerCase()) {
      const serviceIndex = value.data.findIndex(
        element => element.id === currServiceId,
      );

      if (serviceIndex !== -1) {
        initialService[index].data.splice(serviceIndex, 1);
      }
    }
  }

  async function getData(docRef) {
    await docRef.get().then(documentSnapshot => {
      if (documentSnapshot.exists) {
        const servicesList = documentSnapshot.data();
        const services = servicesList.data;
        services.forEach(filterService);

        docRef
          .set({
            data: firestore.FieldValue.arrayUnion(...services),
          })
          .then(() => {
            displayToast();
          });
      }
    });
  }

  // deletes the avilable salon services
  const deleteService = (header, services) => {
    currentHeader = header;
    currServiceId = services.id;

    const docRef = firestore()
      .collection('salonServices')
      .doc(auth().currentUser.uid);

    getData(docRef);
  };

  const Item = ({service, headers, index}) => {
    // console.log('header: ' + headers);
    // console.log('service: ' + JSON.stringify(service));

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
              onPress={() => editService(headers, service, index)}
            />
          </View>
          <View style={styles.deleteServiceRow}>
            <View>
              <Text style={styles.servicePrice}>Price: Rs {service.price}</Text>
              <Text style={styles.serviceDuration}>
                Duration: {service.duration}
              </Text>
            </View>
            <Icon
              as={<MaterialCommunityIcon name={'delete'} />}
              size={7}
              mr="2"
              my="5"
              color="white"
              onPress={() => deleteService(headers, service)}
            />
          </View>
        </View>
      </View>
    );
  };

  const docRef = firestore()
    .collection('salonServices')
    .doc(auth().currentUser.uid);

  useEffect(() => {
    const fetchServices = docRef.onSnapshot(documentSnapshot => {
      // console.log('result: ' + JSON.stringify(documentSnapshot.data()));
      if (documentSnapshot.exists) {
        const result = documentSnapshot.data().data;
        // console.log('result ' + JSON.stringify(result));
        setAvailableServices(result);
        if (loading) {
          setLoading(false);
        }
      } else {
        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => fetchServices();
  }, []);

  if (loading) {
    null;
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#6200ee'} />
      <AddNewServiceModal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
      />
      <UpdateSalonService
        showModal={showUpdateModal}
        setShowModal={() => setUpdateModal(!showUpdateModal)}
        // sectionUpdated={sectionUpdated}
        // serviceUpdated={serviceUpdated}
        // indexUpdated={indexUpdated}
      />
      <View style={styles.addServiceRow}>
        <Heading size="md">Add New Services</Heading>
        <Icon
          as={<MaterialCommunityIcon name={'plus'} />}
          size={10}
          mr="2"
          color="muted.400"
          onPress={() => setShowModal(!showModal)}
        />
      </View>
      <Divider bg="black" thickness="2" my="2" />
      <Heading size="md" my="4">
        Available Services
      </Heading>
      <View style={styles.sectionListContainer}>
        {availableServices.length !== 0 ? (
          <SectionList
            sections={availableServices}
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
        ) : (
          <EmptyList message="No Services Added" />
        )}
      </View>
    </View>
  );
};

export default SalonServices;

const styles = StyleSheet.create({
  mainContainer: {
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

  deleteServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

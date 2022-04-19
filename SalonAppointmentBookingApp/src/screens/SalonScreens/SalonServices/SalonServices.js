import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {
  Heading,
  Icon,
  Divider,
  useToast,
  AlertDialog,
  Button,
  Image,
} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewServiceModal from '../../../components/AddNewServiceModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EmptyList from '../../../components/EmptyList';
import UpdateSalonService from '../../../components/UpdateSalonService';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {updateService} from '../../../redux/store/features/updateService/updateserviceSlice';
import storage from '@react-native-firebase/storage';

const SalonServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
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

  const editService = (header, service, index) => {
    console.log('service: ' + JSON.stringify(service));

    dispatch(
      updateService({
        category: header,
        serviceId: service.id,
        service: service.serviceName,
        price: service.price,
        duration: service.duration,
        serviceImage: service.serviceImage,
        imageUri: service.imageUri,
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

  var imageToDelete = '';

  function filterService(value, index, initialService) {
    console.log('current header: ' + currentHeader);
    if (currentHeader.toLowerCase() === value.categoryTitle.toLowerCase()) {
      const serviceIndex = value.data.findIndex(
        element => element.id === currServiceId,
      );

      if (serviceIndex !== -1) {
        // imageToDelete = initialService[index].data[serviceIndex].serviceImage;
        // console.log('imagetodlet: ' + imageToDelete);

        initialService[index].data.splice(serviceIndex, 1);

        if (initialService[index].data.length === 0) {
          console.log('service empty');
          initialService.splice(index, 1);
        }
      }
    }
  }

  // gets the data from the document
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
    onClose();
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

  // section list item
  const Item = ({service, headers, index}) => {
    const [select, setSelect] = useState(false);
    const [serviceImg, setServiceImg] = useState(undefined);
    const [loading, setLoading] = useState(true);

    // console.log('service: ' + JSON.stringify(service));

    // const getServiceImage = async reference => {
    //   const downloadUrl = await reference.getDownloadURL();
    //   setServiceImg(downloadUrl);
    // };

    // downloads the image from the storage
    const getImageUrl = async () => {
      const url = service.serviceImage;
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
      // console.log('item use effect called');
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
    }, []);

    return (
      <>
        <Divider bg="muted.400" />
        <View
          style={!select ? styles.itemContainer : styles.itemContainerSelected}>
          <View style={styles.topRowItem}>
            <View style={styles.columnItems}>
              <Text style={{color: 'black', paddingVertical: 3, fontSize: 18}}>
                {service.serviceName}
              </Text>
              <Text style={styles.serviceDetail}>
                Price: Rs {service.price}
              </Text>
              <Text style={styles.serviceDetail}>
                Duration: Rs {service.duration}
              </Text>
            </View>
            {serviceImg === undefined ? (
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
                  uri: serviceImg,
                }}
                alt="Default Salon Img"
                size="lg"
                rounded={10}
              />
            )}
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              onPress={() => editService(headers, service, index)}
              style={styles.iconBtn}>
              <Text style={{color: 'white'}}>Edit Service</Text>
              <Icon
                ml="1"
                size="5"
                color="white"
                as={<MaterialCommunityIcon name="pencil" />}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsOpen(!isOpen)}
              style={styles.iconBtn}>
              <Text style={{color: 'white'}}>Remove Service</Text>
              <Icon
                ml="1"
                size="5"
                color="white"
                as={<MaterialCommunityIcon name="delete" />}
              />
            </TouchableOpacity>
          </View>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Delete Service</AlertDialog.Header>
              <AlertDialog.Body>
                This will remove the service. This action cannot be reversed.
                Deleted data can not be recovered.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => deleteService(headers, service)}>
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </View>
        <Divider bg="muted.400" />
      </>
    );
  };

  const getAvatar = async serviceImg => {
    const reference = storage().ref().child('/serviceImages').child(serviceImg);
    const downloadUrl = await reference.getDownloadURL();
    console.log('downloadurl: ' + downloadUrl);
    setServiceImg(downloadUrl);
  };

  const docRef = firestore()
    .collection('salonServices')
    .doc(auth().currentUser.uid);

  useEffect(() => {
    // console.log('use effect of salon servcies called');
    const fetchServices = docRef.onSnapshot(documentSnapshot => {
      // console.log('result: ' + JSON.stringify(documentSnapshot.data()));
      if (documentSnapshot.exists) {
        const result = documentSnapshot.data().data;
        // console.log('result ' + JSON.stringify(result));
        setAvailableServices(result);
        // const serviceImg = documentSnapshot.data().serviceImage;
        // if (serviceImg !== undefined) {
        //   getAvatar(serviceImg);
        // }

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
    return null;
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'#6366f1'} />
      <AddNewServiceModal
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
      />
      <UpdateSalonService
        showModal={showUpdateModal}
        setShowModal={() => setUpdateModal(!showUpdateModal)}
      />
      <View style={styles.addServiceRow}>
        <Heading size="md">Add New Services</Heading>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Icon
            as={<MaterialCommunityIcon name={'plus'} />}
            size={10}
            mr="2"
            color="muted.400"
          />
        </TouchableOpacity>
      </View>
      <Divider bg="coolGray.400" thickness="2" my="1" />
      <View style={{padding: 5}}>
        <Heading size="md" my="4">
          Available Services
        </Heading>
      </View>
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
    // padding: 15,
    backgroundColor: '#f9fafb',
  },

  addServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  sectionListContainer: {
    flex: 1,
  },

  sectionHeader: {
    color: 'black',
    fontSize: 25,
    fontWeight: '400',
    margin: 5,
    padding: 10,
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

  itemColumn: {
    flexDirection: 'column',
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

  // added later;
  rootContainer: {
    flex: 1,
    backgroundColor: '#e7e5e4',
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
    paddingTop: 20,
  },

  btnStyle: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 5,
    borderRadius: 20,
  },

  iconBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 8,
    marginRight: 5,
    borderRadius: 25,
  },
});

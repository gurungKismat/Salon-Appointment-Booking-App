import React, {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Heading, Image, Text, Divider} from 'native-base';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmptyList from '../../../components/EmptyList';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UpcomingAppointment = ({item}) => {
  // console.log('item: ' + JSON.stringify(item));

  const [customerImg, setCustomerImg] = useState(undefined);
  const [valDisable, setValDisable] = useState(false);

  let services = '';
  item.docData.services.forEach(service => {
    services += service.serviceName + ', ';
  });
  services = services.replace(/,\s*$/, '');

  const getCustomerImage = async reference => {
    const downloadUrl = await reference.getDownloadURL();
    setCustomerImg(downloadUrl);
  };

  const acceptBtnPressed = docId => {
    // alert('accept: '+docId);
    firestore()
      .collection('Appointments')
      .doc(docId)
      .update({
        requestResult: 'Accepted',
      })
      .then(result => {
        // setIsDisable(true);
        alert('Appointment Accepted');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const rejectBtnPressed = docId => {
    // alert('reject');
    firestore()
      .collection('Appointments')
      .doc(docId)
      .update({
        appointmentCompleted: true,
        requestResult: 'Rejected',
      })
      .then(result => {
        // setIsDisable(true);
        alert('Appointment Rejected');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const isDisabled = () => {
    // alert('asdfads')
    console.log('requeset state: ' + item.docData.requestResult);
    if (item.docData.requestResult === 'Accepted') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const imgUri = item.docData.customerData.customerImage;

    if (imgUri !== undefined) {
      // console.log('image exist');
      const reference = storage()
        .ref()
        .child('/customerProfilePicture')
        .child(imgUri);

      getCustomerImage(reference);
    }
  }, []);

  return (
    <View style={{flexDirection: 'column', marginVertical: 8}}>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.topItem}>
            <Heading size="sm" px="3" mt={4}>
              {item.docData.customerData.name}
            </Heading>
            <View
              style={
                item.docData.requestResult === 'Pending'
                  ? styles.pending
                  : styles.accepted
              }>
              <Text style={{color: '#FFFFFF', fontSize: 13}}>
                {item.docData.requestResult}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', padding: 12}}>
              <View>
                <Text fontWeight="400" fontSize="md">
                  {item.docData.customerData.mobileNo}
                </Text>
                <Text fontWeight="400" fontSize="md">
                  Date: {item.docData.date}
                </Text>
                <Text fontWeight="400" fontSize="md">
                  Time: {item.docData.time}
                </Text>

                <Text fontWeight="400" fontSize="md">
                  Services: {services}
                </Text>
              </View>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 13}}>
              {customerImg === '' ? (
                <Image
                  source={{
                    uri: 'https://wallpaperaccess.com/full/317501.jpg',
                  }}
                  alt="Default Salon Img"
                  size="md"
                  borderRadius={100}
                />
              ) : (
                <Image
                  source={{
                    uri: customerImg,
                  }}
                  alt="Default Salon Img"
                  size="md"
                  borderRadius={100}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider thickness="2" bg="muted.300" />
      <View
        style={{
          backgroundColor: '#e7e5e4',
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            disabled={isDisabled()}
            onPress={() => acceptBtnPressed(item.docId)}
            style={!isDisabled() ? styles.acceptBtn : styles.acceptBtnDisabled}>
            <Text style={{color: 'white'}} fontSize="md">
              Accept
            </Text>
          </TouchableOpacity>
          <Divider orientation="vertical" thickness="2" bg="muted.300" />
          <TouchableOpacity
            disabled={isDisabled()}
            onPress={() => rejectBtnPressed(item.docId)}
            style={!isDisabled() ? styles.rejectBtn : styles.rejectBtnDisabled}>
            <Text style={{color: 'white'}} fontsize="md">
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PastAppointment = ({item}) => {
  let services = '';
  item.services.forEach(service => {
    services += service.serviceName + ', ';
  });
  services = services.replace(/,\s*$/, '');
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <View style={styles.topItem}>
          <Heading size="sm" px="3" mt={4}>
            {item.customerData.name}
          </Heading>
          <View
            style={
              item.requestResult === 'Rejected'
                ? styles.rejected
                : styles.accepted
            }>
            <Text style={{color: '#FFFFFF'}}>{item.requestResult}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', padding: 12}}>
            <View>
              <Text fontWeight="400" fontSize="md">
                {item.customerData.mobileNo}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Date: {item.date}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: {item.time}
              </Text>
              <Text fontWeight="400" fontSize="md" maxW="48">
                Services: {services}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 13}}>
            {item.salonImage === '' ? (
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                alt="Default Salon Img"
                size="md"
                rounded="md"
              />
            ) : (
              <Image
                source={{
                  uri: item.salonImage,
                }}
                alt="Default Salon Img"
                size="md"
                rounded="md"
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e7e5e4',
    width: '100%',
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  accepted: {
    backgroundColor: '#065f46',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  rejected: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  pending: {
    backgroundColor: '#ea580c',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  acceptBtn: {
    backgroundColor: '#15803d',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },

  acceptBtnDisabled: {
    backgroundColor: '#d6d3d1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },

  rejectBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },

  rejectBtnDisabled: {
    backgroundColor: '#d6d3d1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },

  bottomContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
});

const FirstRoute = () => {
  const [saloninfo, setSalonInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointmentData = async currentUserId => {
    await firestore()
      .collection('Appointments')
      .where('salonid', '==', currentUserId)
      .where('appointmentCompleted', '==', false)
      .onSnapshot(documents => {
        const appointmentDatas = [];

        documents.forEach(async document => {
          // console.log(
          //   'document id: ' +
          //     document.id +
          //     '  salon appointment documentData: ' +
          //     JSON.stringify(document.data()),
          // );
          const docId = document.id;
          const docData = document.data();
          const allInfo = {
            docId,
            docData,
          };
          appointmentDatas.push(allInfo);
        });
        console.log('appointmentdatas: ' + JSON.stringify(appointmentDatas));
        saloninfo.splice(0, saloninfo.length);
        setSalonInfo([...saloninfo, ...appointmentDatas]);
        // setCustomerData(customerInfos);
        if (loading) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const currentUserId = auth().currentUser.uid;
    fetchAppointmentData(currentUserId);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      {saloninfo.length > 0 ? (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 12, marginTop: 20}}>
            <FlatList
              data={saloninfo}
              renderItem={({item}) => <UpcomingAppointment item={item} />}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <EmptyList message="No Upcoming Appointments" />
        </View>
      )}
    </>
  );
};

const SecondRoute = () => {
  const [salonInfo, setSalonInfo] = useState([]);
  const [loading, setLoading] = useState();

  const fetchAppointmentData = async currentUserId => {
    await firestore()
      .collection('Appointments')
      .where('salonid', '==', currentUserId)
      .where('appointmentCompleted', '==', true)
      .onSnapshot(documents => {
        const datas = [];
        documents.forEach(document => {
          console.log(
            'second route document id: ' +
              document.id +
              ' second route documentData: ' +
              JSON.stringify(document.data()),
          );
          datas.push(document.data());
        });
        salonInfo.splice(0, salonInfo.length);
        setSalonInfo([...salonInfo, ...datas]);
        if (loading) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const currentUserId = auth().currentUser.uid;
    fetchAppointmentData(currentUserId);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      {salonInfo.length > 0 ? (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 12, marginTop: 20}}>
            <FlatList
              data={salonInfo}
              renderItem={({item}) => <PastAppointment item={item} />}
            />
          </View>
          {/* <EmptyList message="No Past Appointments" /> */}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <EmptyList message="No Past Appointments" />
        </View>
      )}
    </>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming'},
    {key: 'second', title: 'Past'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'white'}}
        style={{backgroundColor: '#6366f1', border: 0}}
      />
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#6366f1'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const Appointment = () => {
  return <TabViewExample />;
};

export default Appointment;

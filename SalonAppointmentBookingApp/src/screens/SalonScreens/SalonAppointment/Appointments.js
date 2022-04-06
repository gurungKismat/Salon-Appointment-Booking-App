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
  // console.log("item: "+JSON.stringify(item.customerData))

  const [customerImg, setCustomerImg] = useState(undefined);

  let services = '';
  item.services.forEach(service => {
    services += service.serviceName + ', ';
  });
  services = services.replace(/,\s*$/, '');

  const getCustomerImage = async reference => {
    const downloadUrl = await reference.getDownloadURL();
    setCustomerImg(downloadUrl);
  };

  const acceptBtnPressed = () => {
    alert('accept')
  }

  const rejectBtnPressed = () => {
    alert('reject')
  }

  useEffect(() => {
    const imgUri = item.customerData.customerImage;

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
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.topItem}>
            <Heading size="sm" px="3" mt={4}>
              {item.customerData.name}
            </Heading>
            <View
              style={
                item.requestResult === 'Pending'
                  ? styles.pending
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
          onPress={acceptBtnPressed}
          style={styles.acceptBtn}>
            <Text style={{color: 'white'}} fontSize="md">
              Accept
            </Text>
          </TouchableOpacity>
          <Divider orientation="vertical" thickness="2" bg="muted.300" />
          <TouchableOpacity 
          onPress={rejectBtnPressed}
          style={styles.rejectBtn}>
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
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <View style={styles.topItem}>
          <Heading size="sm" px="3" mt={4}>
            {item.salonName}
          </Heading>
          <View
            style={
              item.requestResult === 'Pending'
                ? styles.pending
                : styles.accepted
            }>
            <Text style={{color: '#FFFFFF'}}>{item.requestResult}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', padding: 12}}>
            <View>
              <Text fontWeight="400" fontSize="md">
                {item.salonAddress}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Date: {item.date}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: {item.time}
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

  rejectBtn: {
    backgroundColor: '#ef4444',
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
  const [customerData, setCustomerData] = useState([]);
  const [saloninfo, setSalonInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState('');

  const fetchAppointmentData = async currentUserId => {
    await firestore()
      .collection('Appointments')
      .where('salonid', '==', currentUserId)
      .onSnapshot(documents => {
        const appointmentDatas = [];

        documents.forEach(async document => {
          console.log(
            'document id: ' +
              document.id +
              '  salon appointment documentData: ' +
              JSON.stringify(document.data()),
          );

          appointmentDatas.push(document.data());
        });
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
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 12, marginTop: 20}}>
        <FlatList
          data={saloninfo}
          renderItem={({item}) => <UpcomingAppointment item={item} />}
        />
      </View>
    </View>
  );
};

const SecondRoute = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <EmptyList message="No Past Appointments" />
  </View>
);

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
        style={{backgroundColor: '#6200ee', border: 0}}
      />
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#6200ee'} />
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

import React, {useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Box, Center, Stack, Heading, Image, Text, HStack} from 'native-base';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmptyList from '../../../components/EmptyList';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {serviceAdded} from '../redux/store/features/service/serviceSlice';

const DATA = [
  {name: 'kismat', age: 21},
  {name: 'tobi', age: 22},
];

const UpcomingAppointment = ({item}) => {
  // console.log('upcoiming item doc id: ' + JSON.stringify(item));
  const navigation = useNavigation();

  const upcomingAppointmentPressed = id => {
    // alert(id);
    navigation.navigate('RequestedAppointment', {
      requestedAppointmentId: id,
    });
  };

  return (
    <TouchableOpacity onPress={() => upcomingAppointmentPressed(item.docId)}>
      <View style={styles.itemContainer}>
        <View style={styles.topItem}>
          <Heading size="sm" px="3" mt={4}>
            {item.docData.salonName}
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
                {item.docData.salonAddress}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Date: {item.docData.date}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: {item.docData.time}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 13}}>
            {item.docData.salonImage === '' ? (
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
                  uri: item.docData.salonImage,
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

const PastAppointment = ({item}) => {
  // console.log('past item: '+JSON.stringify(item))
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CustomerPastAppointment', {
          pastDocId: item.docId,
        })
      }>
      <View style={styles.itemContainer}>
        <View style={styles.topItem}>
          <Heading size="sm" px="3" mt={4}>
            {item.docData.salonName}
          </Heading>
          <View
            style={
              item.docData.requestResult === 'Rejected'
                ? styles.rejected
                : styles.accepted
            }>
            <Text style={{color: '#FFFFFF'}}>{item.docData.requestResult}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', padding: 12}}>
            <View>
              <Text fontWeight="400" fontSize="md">
                {item.docData.salonAddress}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Date: {item.docData.date}
              </Text>
              <Text fontWeight="400" fontSize="md">
                Time: {item.docData.time}
              </Text>
            </View>
          </View>
          <View style={{paddingVertical: 10, paddingHorizontal: 13}}>
            {item.docData.salonImage === '' ? (
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
                  uri: item.docData.salonImage,
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

const FirstRoute = () => {
  const [saloninfo, setSalonInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointmentData = async currentUserId => {
    await firestore()
      .collection('Appointments')
      .where('customerId', '==', currentUserId)
      .where('appointmentCompleted', '==', false)
      .onSnapshot(documents => {
        const datas = [];
        documents.forEach(document => {
          // console.log(
          //   'document id: ' +
          //     document.id +
          //     'documentData: ' +
          //     JSON.stringify(document.data()),
          // );
          const docId = document.id;
          const docData = document.data();
          const allDatas = {
            docId,
            docData,
          };

          datas.push(allDatas);
        });
        setSalonInfo(datas);
        if (loading) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    // console.log('customer appintment');
    const currentUserId = auth().currentUser.uid;
    fetchAppointmentData(currentUserId);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      {saloninfo.length > 0 ? (
        <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
          <View style={{paddingHorizontal: 12, marginTop: 20,}}>
            <FlatList
              data={saloninfo}
              renderItem={({item}) => <UpcomingAppointment item={item} />}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
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
      .where('customerId', '==', currentUserId)
      .where('appointmentCompleted', '==', true)
      .onSnapshot(documents => {
        const datas = [];
        documents.forEach(document => {
          // console.log(
          //   'second route document id: ' +
          //     document.id +
          //     ' second route documentData: ' +
          //     JSON.stringify(document.data()),
          // );

          const docId = document.id;
          const docData = document.data();
          const allDatas = {
            docId,
            docData,
          };

          datas.push(allDatas);
        });
        // salonInfo.splice(0, salonInfo.length);

        setSalonInfo(datas);
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
        <View style={{flex: 1, backgroundColor: '#f9fafb'}}>
          <View style={{paddingHorizontal: 12, marginTop: 20}}>
            <FlatList
              data={salonInfo}
              renderItem={({item}) => <PastAppointment item={item} />}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb'}}>
          <EmptyList message="No Upcoming Appointments" />
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

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e7e5e4',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 20,
    marginVertical: 8,
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

  rejected: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 6,
    paddingVertical: 7,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

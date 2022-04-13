import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, FlatList, StyleSheet} from 'react-native';
import {Image, Divider} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';

const Item = ({salonData}) => {
  // console.log('SALON DATA IN ITEM: ' + JSON.stringify(salonData));
  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={styles.item}>
        <Text style={styles.title}>
          {salonData.serviceHeading} - {salonData.serviceName}
        </Text>
        <Text style={styles.title}>Price: {salonData.servicePrice}</Text>
      </View>
    </View>
  );
};

const PastAppointment = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [salonInfo, setSalonInfo] = useState([]);
  const [customerImage, setCustomerImage] = useState();
  const [totalPrice, setTotalPrice] = useState('');
  const [appointmentInfo, setAppointmentInfo] = useState({});

  const {docId} = route.params;
  const navigation = useNavigation();

  console.log('docid in slaon: ' + docId);

  const renderItem = ({item}) => {
    return <Item salonData={item} />;
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection('Appointments')
      .doc(docId)
      .onSnapshot(async documentSanpshot => {
        if (documentSanpshot.exists) {
          // console.log('requrest appointment data: '+JSON.stringify(documentSanpshot.data()))

          let priceAmount = 0;
          const salonDatas = documentSanpshot.data().services;
          salonDatas.forEach(salonData => {
            priceAmount += Number(salonData.servicePrice);
          });

          // const salonId = documentSanpshot.data().salonid;

          const reference = storage()
            .ref()
            .child('/customerProfilePicture')
            .child(documentSanpshot.data().customerData.customerImage);

          // console.log(
          //   'customer img: ' +
          //     documentSanpshot.data().customerData.customerImage,
          // );

          const imgDownloadUrl = await reference.getDownloadURL();
          // console.log('url received: ' + imgDownloadUrl);

          // console.log('slaon address: '+salonAddress)
          // setAvailableTime(availableTime);
          // setSalonAddress(salonAddress);
          setAppointmentInfo(documentSanpshot.data());
          setTotalPrice(priceAmount);
          setSalonInfo(salonDatas);
          setCustomerImage(imgDownloadUrl);
          if (loading) {
            setLoading(false);
          }
        }
      });

    return () => subscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={'#6366f1'} />
      <FlatList
        style={{backgroundColor: 'white'}}
        ListHeaderComponent={
          <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
            <View style={styles.salonInfo}>
              <View style={styles.leftContent}>
                <Text style={styles.salonName}>
                  {appointmentInfo.customerData.name}
                </Text>
                <Text style={styles.salonInfoText}>
                  {appointmentInfo.customerData.mobileNo}
                </Text>

                <Text style={{marginTop: 5, color: 'black'}}>
                  {appointmentInfo.customerData.email}
                </Text>
              </View>
              <View style={styles.rightContent}>
                {customerImage == undefined ? (
                  <Image
                    source={{
                      uri: 'https://wallpaperaccess.com/full/317501.jpg',
                    }}
                    borderRadius={100}
                    resizeMode="cover"
                    alt="Customer Image"
                    size="lg"
                  />
                ) : (
                  <Image
                    source={{
                      uri: customerImage,
                    }}
                    borderRadius={100}
                    resizeMode="cover"
                    alt="Customer Image"
                    size="lg"
                  />
                )}
              </View>
            </View>
            <Divider my="4" thickness={'2'} />
            <View style={{marginTop: 3}}>
              <Text style={{color: 'black', fontSize: 19}}>
                Date: {appointmentInfo.date}
              </Text>
              <Text style={{color: 'black', fontSize: 19}}>
                Time: {appointmentInfo.time}
              </Text>
            </View>
            <Divider my="4" thickness={'2'} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 7,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Services
              </Text>
              <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                Total Price: {totalPrice}
              </Text>
            </View>
          </View>
        }
        data={salonInfo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default PastAppointment;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    marginTop: 5,
    backgroundColor: '#6200ee',
    flexDirection: 'column',
    borderRadius: 20,
  },

  title: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  salonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  salonName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },

  salonInfoText: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 2,
  },

  leftContent: {
    flexDirection: 'column',
  },

  rightContent: {},

  editSchedule: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  requestAppointment: {
    width: '60%',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 5,
  },

  bottomContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},

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
});

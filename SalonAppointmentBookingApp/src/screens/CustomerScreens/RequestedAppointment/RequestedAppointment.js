import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image, Icon, Divider} from 'native-base';
import {Rating} from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

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

const RequestedAppointment = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [salonInfo, setSalonInfo] = useState([]);
  const [salonAvailability, setSalonAvailability] = useState();
  const [salonImage, setSalonImage] = useState();
  const [totalPrice, setTotalPrice] = useState('');
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [availableTime, setAvailableTime] = useState('');
  const [salonAddress, setSalonAddress] = useState('');
  const [salonRating, setSalonRating] = useState({});

  const {requestedAppointmentId} = route.params;
  // console.log('requesetd id: ' + requestedAppointmentId);

  const renderItem = ({item}) => {
    return <Item salonData={item} />;
  };

  const initialStar = () => {
    if (isNaN(salonRating)) {
      return 0;
    } else {
      return salonRating;
    }
  };

  const getRating = salonRating => {
    let totalRating = 0;
    let totalResponse = 0;
    for (let x in salonRating) {
      totalRating += Number(x) * Number(salonRating[x]);
      totalResponse += Number(salonRating[x]);
    }
    let finalRating = Math.round(totalRating / totalResponse);
    // console.log('final rating: ' + finalRating);
    return finalRating;
    // setStar(finalRating);
  };

  useEffect(() => {
    firestore()
      .collection('Appointments')
      .doc(requestedAppointmentId)
      .get()
      .then(async documentSanpshot => {
        if (documentSanpshot.exists) {
          // console.log('requrest appointment data: '+JSON.stringify(documentSanpshot.data()))

          let priceAmount = 0;
          const salonDatas = documentSanpshot.data().services;
          salonDatas.forEach(salonData => {
            priceAmount += Number(salonData.servicePrice);
          });

          const salonId = documentSanpshot.data().salonid;
          // console.log('salon Id: ' + salonId);
          let availableTime = '';
          await firestore()
            .collection('salonProfile')
            .doc(salonId)
            .get()
            .then(doc => {
              if (doc.exists) {
                // console.log('available time exist');
                availableTime = doc.data().data.salonAvailability.availableTime;
              }
            });

          let salonAddress = '';
          let totalRating = 0;
          await firestore()
            .collection('salons')
            .doc(salonId)
            .get()
            .then(doc => {
              if (doc.exists) {
                // console.log('available time exist');
                salonAddress = doc.data().address;
                const ratings = doc.data().ratings;
                totalRating = getRating(ratings);
                // console.log('total rating: ' + totalRating);
              }
            });

          // console.log('slaon address: '+salonAddress)
          setSalonRating(totalRating);
          setAvailableTime(availableTime);
          setSalonAddress(salonAddress);
          setAppointmentInfo(documentSanpshot.data());
          setTotalPrice(priceAmount);
          setSalonInfo(salonDatas);
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
    <>
      <StatusBar backgroundColor={'#6366f1'} />
      <FlatList
        style={{backgroundColor: 'white'}}
        ListHeaderComponent={
          <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
            <View style={styles.salonInfo}>
              <View style={styles.leftContent}>
                <Text style={styles.salonName}>
                  {appointmentInfo.salonName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Rating
                    type="custom"
                    ratingBackgroundColor="silver"
                    tintColor="white"
                    ratingColor="#facc15"
                    startingValue={initialStar()}
                    readonly
                    imageSize={24}
                    style={{paddingVertical: 5}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginStart: 5,
                    }}>
                    {initialStar()}
                  </Text>
                </View>
                <Text style={styles.salonInfoText}>{salonAddress}</Text>

                <Text style={{marginTop: 5, color: 'black'}}>
                  Available Time: {availableTime}
                </Text>
              </View>
              <View style={styles.rightContent}>
                {appointmentInfo.salonImage == undefined ? (
                  <Image
                    source={{
                      uri: 'https://wallpaperaccess.com/full/317501.jpg',
                    }}
                    alt="Default Salon Img"
                    size="lg"
                    rounded="md"
                  />
                ) : (
                  <Image
                    source={{
                      uri: appointmentInfo.salonImage,
                    }}
                    alt="Salon Image"
                    size="lg"
                    rounded="md"
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
        // ListFooterComponent={
        //   <TouchableOpacity
        //     onPress={paymentBtnPressed}
        //     // disabled={checkDisable()}
        //     style={styles.requestAppointment}>
        //     <Text style={{color: 'white', fontSize: 17, alignSelf: 'center'}}>
        //       Select Payment Method
        //     </Text>
        //   </TouchableOpacity>
        // }
      />
    </>
  );
};

export default RequestedAppointment;

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
});

import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, FlatList, StyleSheet} from 'react-native';
import {Image, Divider} from 'native-base';
import {Rating} from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
  const [totalPrice, setTotalPrice] = useState('');
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [availableTime, setAvailableTime] = useState('');
  const [salonAddress, setSalonAddress] = useState('');
  const [salonId, setSalonId] = useState('');
  const [ratingData, setRatingData] = useState({});
  const [startingRating, setStartingRating] = useState(0);
  const [ratingStatus, setRatingStatus] = useState(false);
  const [rating, setRating] = useState({
    5: '0',
    4: '0',
    3: '0',
    2: '0',
    1: '0',
  });

  const {pastDocId} = route.params;
  // console.log('past requesetd id: ' + pastDocId);

  const ratingCompleted = async rating => {
    // console.log('Rating is: ' + rating);

    await firestore()
      .collection('salons')
      .doc(salonId)
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log('available time exist');
          salonRating = doc.data().ratings;
          if (salonRating !== undefined) {
            // console.log('salon rating is not undefined');
            salonRating[rating] = Number(salonRating[rating]) + 1;
            firestore()
              .collection('salons')
              .doc(salonId)
              .update({
                ratings: salonRating,
              })
              .then(() => {
                const ratingData = {
                  ratingNo: rating,
                  isRated: true,
                  salonId: salonId,
                  customerId: auth().currentUser.uid,
                };
                firestore().collection('Appointments').doc(pastDocId).update({
                  ratingDatas: ratingData,
                });
                // console.log('Salon Rated');
              });
          } else {
            const ratingData = {
              5: '0',
              4: '0',
              3: '0',
              2: '0',
              1: '0',
            };
            ratingData[rating] = Number(ratingData[rating]) + 1;
            firestore()
              .collection('salons')
              .doc(salonId)
              .update({
                ratings: ratingData,
              })
              .then(() => {
                // console.log('Salon Rated');
                firestore().collection('Appointments').doc(pastDocId).update({
                  ratingNo: rating,
                  isRated: true,
                  salonId: salonId,
                  customerId: auth().currentUser.uid,
                });
              });
            // console.log('initial rating');
          }
        }
      });

    // console.log('rating data after rating: ' + JSON.stringify(ratingData));
  };

  const renderItem = ({item}) => {
    return <Item salonData={item} />;
  };

  // check if rating of salon is done or not
  const isRated = () => {
    // console.log('israted: ' + ratingData.isRated);
    if (ratingStatus) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    firestore()
      .collection('Appointments')
      .doc(pastDocId)
      .get()
      .then(async documentSanpshot => {
        if (documentSanpshot.exists) {
          // console.log('requrest appointment data: '+JSON.stringify(documentSanpshot.data()))

          let priceAmount = 0;
          const salonDatas = documentSanpshot.data().services;
          salonDatas.forEach(salonData => {
            priceAmount += Number(salonData.servicePrice);
          });

          // console.log('ratings: '+JSON.stringify(ratings))

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
          await firestore()
            .collection('salons')
            .doc(salonId)
            .get()
            .then(doc => {
              if (doc.exists) {
                // console.log('available time exist');
                salonAddress = doc.data().address;
              }
            });

          const ratings = documentSanpshot.data().ratingDatas;
          if (ratings !== undefined) {
            const initialRating = ratings.ratingNo;
            const isRated = ratings.isRated;
            setStartingRating(initialRating);
            setRatingStatus(isRated);
          }

          // console.log('slaon address: '+salonAddress)
          setAvailableTime(availableTime);
          setSalonAddress(salonAddress);
          setAppointmentInfo(documentSanpshot.data());
          setTotalPrice(priceAmount);
          setSalonInfo(salonDatas);
          setSalonId(salonId);
          setRatingData(ratings);

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
                    // ratingColor="blue"
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
                    4.5
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

            <Divider bg="coolGray.200" my={4} thickness={2} />
            <View style={{marginTop: 3}}>
              <Text style={{color: 'black', fontSize: 19}}>
                Date: {appointmentInfo.date}
              </Text>
              <Text style={{color: 'black', fontSize: 19}}>
                Time: {appointmentInfo.time}
              </Text>
            </View>
            <Divider bg="coolGray.200" my={4} thickness={2} />
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
        ListFooterComponent={
          // <TouchableOpacity
          //   // onPress={paymentBtnPressed}
          //   // disabled={checkDisable()}
          //   style={styles.requestAppointment}>
          //   <Text style={{color: 'white', fontSize: 17, alignSelf: 'center'}}>

          //   </Text>
          // </TouchableOpacity>

          <View style={{flex: 1, marginTop: 25, paddingHorizontal: 15}}>
            <Divider bg="coolGray.200" my={4} thickness={2} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 20}}>Rate Salon</Text>
              <Rating
                startingValue={startingRating}
                onFinishRating={ratingCompleted}
                style={{paddingVertical: 10}}
                imageSize={30}
                readonly={isRated()}
                type="custom"
                ratingBackgroundColor="silver"
                tintColor="white"
              />
            </View>
            <Divider bg="coolGray.200" my={4} thickness={2} />
          </View>
        }
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

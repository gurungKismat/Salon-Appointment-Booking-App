import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Icon, Divider} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {serviceDeleted, deleteAllServices} from './serviceSlice';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

const removeService = deleteItem => {
  deleteItem();
};

// flat list services items
const Item = ({title, deleteItem}) => {
  console.log('item in selected service: '+JSON.stringify(title));
  return (
  <View style={{paddingHorizontal: 10}}>
    <View style={styles.item}>
      <Text style={styles.title}>{title.serviceHeading} - {title.serviceName}</Text>
      <Icon
        mr="2"
        size="7"
        color="white"
        onPress={() => removeService(deleteItem)}
        as={<MaterialCommunityIcon name="close" />}
      />
    </View>
  </View>
);
}
const SelectedServices = () => {
  const cartItems = useSelector(state => state.service);
  // console.log('cartitms: ' + JSON.stringify(cartItems));
  let totalPrice = 0;
  let btnDisable = undefined;
  if (cartItems.length > 0) {
    cartItems.forEach(item => {
       totalPrice += Number(item.servicePrice);
       btnDisable = item.btnDisable;
      //  console.log('btn disable: '+btnDisable)
    })
  }

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const {id} = route.params;
  // console.log('received id: ' + id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [salonInfo, setSalonInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [salonImage, setsalonImage] = useState();
  const [salonAvailability, setSalonAvailability] = useState();
  const [currSalonId, setCurrSalonId] = useState('');

  // const service = useSelector(state => state.service);
  // console.log('service ' + JSON.stringify(service));

  const deleteItem = id => {
    console.log('deletid: ' + id);
    dispatch(
      serviceDeleted({
        id: id,
      }),
    );
    alert('delet');
  };

  const renderItem = ({item}) => (
    // <Item title={item.serviceName} deleteItem={() => deleteItem(item.id)} />
    <Item title={item} deleteItem={() => deleteItem(item.id)} />
  );

  // handles the change after selecting date from the date picker
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const today = selectedDate.toDateString();
      setShowDate(!showDate);
      setDate(today);
    } else {
      setShowDate(!showDate);
    }
  };

  // handles the time selected from the time picker
  const onChangeTime = (event, selectedDate) => {
    console.log('current time: ' + selectedDate);
    if (selectedDate !== undefined) {
      const currTime = getCurrentTime(selectedDate);
      setShowTime(!showTime);
      setTime(currTime);
    } else {
      setShowTime(!showTime);
    }
  };

  function getCurrentTime(currDate) {
    console.log('function called time walal');
    let hour = currDate.getHours();
    const minute = currDate.getMinutes();
    const second = currDate.getSeconds();
    let prepand = hour >= 12 ? ' PM ' : ' AM ';
    hour = hour >= 12 ? hour - 12 : hour;
    if (hour === 0 && prepand === ' PM ') {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Noon';
      } else {
        hour = 12;
        prepand = ' PM';
      }
    }
    if (hour === 0 && prepand === ' AM ') {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Midnight';
      } else {
        hour = 12;
        prepand = ' AM';
      }
    }
    // console.log(`Current Time : ${hour}${prepand} : ${minute} : ${second}`);
    const currTime = `${hour}:${minute} ${prepand}`;
    return currTime;
    // console.log(currTime)
  }

  // display date picker
  const showDatepicker = () => {
    setShowDate(true);
  };

  // display time picker
  const showTimepicker = () => {
    setShowTime(true);
  };

  const getSalonImage = async reference => {
    const downloadUrl = await reference.getDownloadURL();
    setsalonImage(downloadUrl);
  };

  // request for appointment
  const requestAppointment = async () => {
    if (date !== '') {
      if (time != '') {
        const custId = auth().currentUser.uid;
        let customerInfos = {};
        await firestore().collection('customers').doc(custId).get().then(doc => {
          if (doc.exists) {
             customerInfos = doc.data();
             
          }
        })
        

        firestore().collection('Appointments').doc(uuid.v4()).set({
          customerId: custId,
          salonid: currSalonId,
          customerData: customerInfos,
          services: cartItems,
          date: date,
          time: time,
          requestResult: 'Pending',
          salonName: salonInfo.salonName,
          salonAddress: salonInfo.address,
          salonImage: salonImage,
          appointmentCompleted: false,
        })
        .then(() => {
          alert("Appointment Request Sent")
          navigation.popToTop();
          navigation.navigate('CustomerAppointment')
          dispatch(deleteAllServices())
        }).catch(error => {
          console.error(error);
        })
        ;
      } else {
        alert('Please Select Time');
      }
    } else {
      alert('Please Select Date');
    }
  };

  // check if request appointment button is disabled
  function checkDisable() {
    if (btnDisable === undefined) {
      return false;
    }else {
      return true;
    }
  }

  useEffect(() => {
    var salonId;

    if (cartItems.length > 0) {
      salonId = cartItems[0].salonId;
      setCurrSalonId(salonId);
    }

    firestore()
      .collection('salonProfile')
      .doc(salonId)
      .get()
      .then(document => {
        if (document.exists) {
          const salonAvailabilityData = document.data().data.salonAvailability;
          // console.log(
          //   'salonAvailabillity: ' + JSON.stringify(salonAvailabilityData),
          // );
          setSalonAvailability(salonAvailabilityData);
        }
      });

    firestore()
      .collection('salons')
      .doc(salonId)
      .get()
      .then(document => {
        if (document.exists) {
          // console.log('document exist');
          const salonDatas = document.data();
          // console.log('salon info: ' + JSON.stringify(salonDatas));
          setSalonInfo(salonDatas);
          const imgUri = salonDatas.salonImage;

          if (imgUri !== undefined) {
            // console.log('image exist');
            const reference = storage()
              .ref()
              .child('/salonImages')
              .child(imgUri);

            getSalonImage(reference);
          }

          if (loading) {
            setLoading(false);
          }
        } else {
          console.log('doc does not exist');
        }
      });
  }, []);

  // getting current date
  const currDate = new Date();



  if (loading) {
    return null;
  }

  return (
    <FlatList
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={
        <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
          <StatusBar backgroundColor={'#6200ee'} />
          <View style={styles.salonInfo}>
            <View style={styles.leftContent}>
              <Text style={styles.salonName}>{salonInfo.salonName}</Text>
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
                  ratingColor="blue"
                  readonly
                  imageSize={24}
                  style={{paddingVertical: 5}}
                />
                <Text
                  style={{fontWeight: 'bold', color: 'black', marginStart: 5}}>
                  4.5
                </Text>
              </View>
              <Text style={styles.salonInfoText}>{salonInfo.address}</Text>
              {salonAvailability && (
                <Text style={{marginTop: 5, color: 'black'}}>
                  Available Time: {salonAvailability.availableTime}
                </Text>
              )}
            </View>
            <View style={styles.rightContent}>
              {salonImage == undefined ? (
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
                    uri: salonImage,
                  }}
                  alt="Salon Image"
                  size="lg"
                  rounded="md"
                />
              )}
            </View>
          </View>
          <Divider my="4" thickness={'3'} />
          <View style={{marginTop: 7}}>
            {/* <DateTimePickerUi /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Date</Text>
              <TouchableOpacity
                style={styles.editSchedule}
                onPress={showDatepicker}>
                <Text style={{color: 'white', fontSize: 15}}>Select Date</Text>
              </TouchableOpacity>
            </View>
            <Text style={{color: 'black', paddingTop: 5, fontSize: 15}}>
              {date}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 19}}>Time </Text>
              <TouchableOpacity
                style={styles.editSchedule}
                onPress={showTimepicker}>
                <Text style={{color: 'white'}}>Select Time</Text>
              </TouchableOpacity>
            </View>
            <Text style={{color: 'black', paddingTop: 5, fontSize: 15}}>
              {time}
            </Text>
          </View>

          <View>
            {showDate && (
              <DateTimePicker
                testID="datePicker"
                value={currDate}
                mode={'date'}
                is24Hour={true}
                minimumDate={currDate}
                display="default"
                onChange={onChangeDate}
              />
            )}

            {showTime && (
              <DateTimePicker
                testID="timePicker"
                value={currDate}
                mode={'time'}
                display="default"
                is24Hour={false}
                onChange={onChangeTime}
              />
            )}
          </View>
          <Divider my="4" thickness={'3'} />

          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginTop: 7}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              Services
            </Text>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              Total Price: {totalPrice}
            </Text>
          </View>
        </View>
      }
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <TouchableOpacity
          onPress={requestAppointment}
          disabled={checkDisable()}
          style={styles.requestAppointment}>
          <Text style={{color: 'white', fontSize: 17, alignSelf: 'center'}}>
            Request Appointment
          </Text>
        </TouchableOpacity>
      }
    />
  );
};



export default SelectedServices;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    marginTop: 5,
    backgroundColor: '#6200ee',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },

  title: {
    color: 'white',
    paddingHorizontal: 10,
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

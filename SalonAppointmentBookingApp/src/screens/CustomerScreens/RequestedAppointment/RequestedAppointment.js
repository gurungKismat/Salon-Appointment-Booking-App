import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Rating} from 'react-native-ratings';

const RequestedAppointment = () => {
  const [loading, setLoading] = useState(true);
  const [salonInfo, setSalonInfo] = useState([]);
  const [salonAvailability, setSalonAvailability] = useState();


  useEffect(() => {

    

      if (loading) {
          return false;
      }
  },[])

  if (loading) {
      return null;
  }

  return (
    <>
      <StatusBar backgroundColor={'#6200ee'} />
      <FlatList
        style={{backgroundColor: 'white'}}
        ListHeaderComponent={
          <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
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
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      marginStart: 5,
                    }}>
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
                  <Text style={{color: 'white', fontSize: 15}}>
                    Select Date
                  </Text>
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
    </>
  );
};



export default RequestedAppointment;

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

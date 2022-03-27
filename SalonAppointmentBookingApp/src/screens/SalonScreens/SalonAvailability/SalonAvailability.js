import React, {useEffect, useState, useRef} from 'react';
import {View, StatusBar, FlatList, StyleSheet, Switch} from 'react-native';
import {Pressable, Divider, Text, Box, Center, useToast} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

var countTimePickerDisplayed = 0;
var constantVal = 1;

const Item = ({item, index, value, onValueChange}) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text fontSize="lg" color={'indigo.500'}>
          {item.day}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{false: '#e0e7ff', true: '#a5b4fc'}}
          thumbColor={value ? '#6366f1' : '#a5b4fc'}

          // offTrackColor="indigo.100"
          // onTrackColor="indigo.300"
          // onThumbColor="indigo.500"
          // offThumbColor="indigo.300"
        />
      </View>
      <View style={{marginTop: 10}}>
        <Divider bg="indigo.100" thickness="3" />
      </View>
    </View>
  );
};

const SalonAvailability = () => {
  const [initialTime, setInitialTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const weekDays = [
    {day: 'Sunday', daySelected: false},
    {day: 'Monday', daySelected: false},
    {day: 'Tuesday', daySelected: false},
    {day: 'Wednesday', daySelected: false},
    {day: 'Thursday', daySelected: false},
    {day: 'Friday', daySelected: false},
    {day: 'Saturday', daySelected: false},
  ];
  const [days, setDays] = useState([]);

  const docRef = firestore()
    .collection('salonProfile')
    .doc(auth().currentUser.uid);

  const toggleSwitch = (currVal, index, day) => {
    console.log('day selected: ' + day);
    console.log('day index: ' + index);
    console.log('current value: ' + currVal);
    const tempData = [...days];
    tempData[index].daySelected = !currVal;
    setDays(tempData);
  };

  // const renderItem = ({item}) => <Item title={item.title} />;
  const renderItem = ({item, index}) => {
    return (
      <Item
        item={item}
        index={index}
        value={item.daySelected}
        onValueChange={() => toggleSwitch(item.daySelected, index, item.day)}
      />
    );
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

  // handles the time selected from the time picker
  const onChangeTime = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      // if (initialTime.length != 0) {
      //   countTimePickerDisplayed = 0;
      // }
      countTimePickerDisplayed++;
      console.log('time not null');
      if (countTimePickerDisplayed === 1) {
        const currTime = getCurrentTime(selectedDate);
        setInitialTime(currTime);
        // setShowTime(false);
        // setShowTime(true);
      } else if (countTimePickerDisplayed === 2) {
        const currTime = getCurrentTime(selectedDate);
        setEndTime(currTime);
        setShowTime(false);
        countTimePickerDisplayed = 0;
      } else {
        setShowTime(false);
      }
    } else {
      setShowTime(!showTime);
    }
  };

  const footer = () => {
    // reset the datas in the salon availability screen
    const resetTime = () => {
      setInitialTime('');
      setEndTime('');
    };

    function isAvaiableTimeSelected() {
      if (initialTime.length !== 0 && endTime.length !== 0) {
        return true;
      } else {
        return false;
      }
    }

    async function addRoutine() {
      const salonAvailability = {
        availableDays: days,
        availableTime: initialTime + ' to ' + endTime,
      };

      await docRef.get().then(documentSnapshot => {
        if (!documentSnapshot.exists) {
          console.log('firs time');
          docRef.set({
            data: {
              salonAvailability: salonAvailability,
            },
          });
        } else {
          console.log('second time');
          docRef.update({
            'data.salonAvailability': salonAvailability,
          });
        }
      });

      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Available Time Updated',
          placement: 'top',
        });
      }
    }

    const addSalonAvailability = () => {
      const selectedTime = isAvaiableTimeSelected();
      if (selectedTime) {
        addRoutine();
      } else {
        alert('Time must be selected');
      }
    };

    return (
      <>
        <View>
          <View style={styles.availableTime}>
            <Text fontSize="lg" color={'indigo.500'}>
              Available Time
            </Text>
            <Pressable onPress={() => onChangeTime()}>
              {({isPressed}) => {
                return (
                  <Box
                    w="32"
                    borderWidth="1"
                    borderColor="coolGray.300"
                    shadow="3"
                    bg={isPressed ? 'indigo.300' : 'indigo.500'}
                    px="3"
                    py="3"
                    rounded="24"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Center>
                      <Text color={'white'}>Select Time</Text>
                    </Center>
                  </Box>
                );
              }}
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {initialTime.length > 0 ? (
              <>
                <Text fontSize="lg" color={'indigo.500'}>
                  {`${initialTime} to ${endTime}`}
                </Text>
                <Pressable onPress={() => resetTime()}>
                  {({isPressed}) => {
                    return (
                      <Box
                        w="32"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        shadow="3"
                        bg={isPressed ? 'indigo.300' : 'indigo.500'}
                        px="3"
                        py="3"
                        rounded="24"
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}>
                        <Center>
                          <Text color={'white'}>Clear Time</Text>
                        </Center>
                      </Box>
                    );
                  }}
                </Pressable>
              </>
            ) : (
              <Text />
            )}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Divider bg="indigo.100" thickness="3" />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={addSalonAvailability}>
            {({isPressed}) => {
              return (
                <Box
                  w="32"
                  borderWidth="1"
                  borderColor="coolGray.300"
                  shadow="3"
                  bg={isPressed ? 'primary.400' : 'primary.500'}
                  px="3"
                  py="3"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}>
                  <Center>
                    <Text color={'white'}>Add</Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>
        </View>
      </>
    );
  };

  const toast = useToast();
  const id = 'update-toast';

  async function getAvailiability() {
    await firestore()
      .collection('salonProfile')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('document exist');
          const docData = documentSnapshot.data();
          const fetchedAvailableDays =
            docData.data.salonAvailability.availableDays;
          const availableTime = docData.data.salonAvailability.availableTime;
          const availableTimeArray = availableTime.split('to');
          setDays(fetchedAvailableDays);
          setInitialTime(availableTimeArray[0]);
          setEndTime(availableTimeArray[1]);
          if (loading) {
            setLoading(false);
          }
        } else {
          // console.log('document does not exist');
          setDays(weekDays);
          if (loading) {
            setLoading(false);
          }
        }
      });
  }

  useEffect(() => {
    console.log('use effect availability');
    getAvailiability();
  }, []);

  // getting current date
  const currDate = new Date();

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#6200ee'} />
      <FlatList
        data={days}
        renderItem={renderItem}
        ListFooterComponent={footer}
        ListFooterComponentStyle={{marginVertical: 10}}
      />

      {showTime && (
        <DateTimePicker
          testID="timePicker"
          value={currDate}
          mode={'time'}
          display="spinner"
          is24Hour={false}
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

export default SalonAvailability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
  },

  item: {
    padding: 10,
    marginVertical: 2,
  },

  title: {
    color: 'indigo.100',
    fontSize: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 15,
  },

  availableTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

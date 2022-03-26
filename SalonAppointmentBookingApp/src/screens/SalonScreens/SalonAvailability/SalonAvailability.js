import React, {useEffect, useState} from 'react';
import {View, StatusBar, FlatList, StyleSheet} from 'react-native';
import {Switch, Pressable, Divider, Text, Box, Center} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

var countTimePickerDisplayed = 0;

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
          size="lg"
          offTrackColor="indigo.100"
          onTrackColor="indigo.300"
          onThumbColor="indigo.500"
          offThumbColor="indigo.300"
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
  const [time, setTime] = useState();

  const [days, setDays] = useState([
    {day: 'Sunday', daySelected: false},
    {day: 'Monday', daySelected: false},
    {day: 'Tuesday', daySelected: false},
    {day: 'Wednesday', daySelected: false},
    {day: 'Thursday', daySelected: false},
    {day: 'Friday', daySelected: false},
    {day: 'Saturday', daySelected: false},
  ]);

  const toggleSwitch = (currVal, index, day) => {
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
          <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "center", marginTop: 5}}>
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
          <Pressable>
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

  // getting current date
  const currDate = new Date();

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

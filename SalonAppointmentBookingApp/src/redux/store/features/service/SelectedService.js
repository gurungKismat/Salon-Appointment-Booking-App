import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Icon, Divider} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerUi from '../../../../components/DateTimePicker';

// flat list services items
const Item = ({title}) => (
  <View style={{paddingHorizontal: 10}}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Icon
        mr="2"
        size="7"
        color="white"
        onPress={() => alert('clicked')}
        as={<MaterialCommunityIcon name="close" />}
      />
    </View>
  </View>
);

const SelectedServices = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const service = useSelector(state => state.service);
  // console.log('service ' + JSON.stringify(service));

  const renderItem = ({item}) => <Item title={item.serviceName} />;

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

  // getting current date
  const currDate = new Date();

  return (
    <FlatList
      style={{backgroundColor: 'white'}}
      ListHeaderComponent={
        <View style={{flex: 1, padding: 13, backgroundColor: 'white'}}>
          <StatusBar backgroundColor={'#6200ee'} />
          <View style={styles.salonInfo}>
            <View style={styles.leftContent}>
              <Text style={styles.salonName}>Reaver Salon</Text>
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
              <Text style={styles.salonInfoText}>Naxal, Kathmandu</Text>
            </View>
            <View style={styles.rightContent}>
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                alt="Alternate Text"
                size="lg"
              />
            </View>
          </View>
          <Divider my="4" thickness={"3"}  />
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
          <Divider my="4" thickness={"3"}/>

          <View style={{marginTop: 7}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              Services
            </Text>
          </View>
        </View>
      }
      data={service}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <TouchableOpacity style={styles.requestAppointment}>
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

  leftContent: {},

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
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 5,
  },
});

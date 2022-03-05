import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerUi = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // handles the change after selecting date from the date picker
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const today = currentDate.toDateString();
      setShowDate(!showDate);
      setDate(today);
    } else {
      setShowDate(!showDate);
    }
  };

  // handles the time selected from the time picker
  const onChangeTime = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const currTime = currentDate.getHours() + ':' + currentDate.getMinutes();
      setShowTime(false);
      setTime(currTime);
    } else {
      setShowTime(false);
    }
  };

  // display date picker
  const showDatepicker = () => {
    setShowDate(true);
  };

  // display time picker
  const showTimepicker = () => {
    setShowTime(true);
  };

  const currDate = new Date();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginVertical: 20}}>
        <Text style={{color: 'black'}}>Date: {date}</Text>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={{color: 'black'}}>Time: {time}</Text>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {showDate && (
        <DateTimePicker
          testID="datePicker"
          value={currDate}
          mode={'date'}
          is24Hour={true}
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
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

export default DateTimePickerUi;

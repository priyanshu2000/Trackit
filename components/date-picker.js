import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

export const Today = dayjs(new Date()).format('MMMM D, YYYY')

const DatePicker = ({ onValueChange, value }) => {

  const [date, setDate] = useState(value);
  const [show, setShow] = useState(false);
  const [showError, setshowError] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onValueChange(dayjs(selectedDate).format('MMMM D, YYYY'))
    const date1 = dayjs(new Date());
    const date2 = dayjs(currentDate);
    if(date1.diff(date2) <= 0){setshowError(true)}
    else{setshowError(false)}
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={{width:'100%'}}>
      <TouchableOpacity onPress={showMode} style={[styles.input,{borderColor: showError ? 'red' : 'black'}]} >
          <Text style={{opacity:0.6}} >{date ? dayjs(date).format('MMMM D, YYYY') : 'Date'}</Text>
          {date ? <>{ showError ?  <Ionicons name='alert-circle' color='red' size={20} /> : <Ionicons name='checkmark-circle' color='green' size={20} /> }</> : null}
      </TouchableOpacity>
      <Text style={styles.error}>{ showError ? 'The selected Date should be Today or Older' : '' }</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    input: { borderWidth: 0.8,fontSize: 14, color: '#222222', paddingHorizontal:10,paddingVertical:9,borderRadius:6,marginVertical: 5,justifyContent:'space-between',flexDirection:'row' },
    error: { color: '#FF3752', fontSize: 12, marginTop: 5 }
})

export default DatePicker;
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export const Today = dayjs(new Date()).format('MMMM D, YYYY')

const DatePicker = ({ onValueChange, value }) => {

  const [date, setDate] = useState(value);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onValueChange(dayjs(selectedDate).format('MMMM D, YYYY'))
    const date1 = dayjs(new Date());
    const date2 = dayjs(currentDate);
    if(date1.diff(date2) <= 0){setShowError(true)}
    else{setShowError(false)}
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showMode} style={[styles.input,{borderColor: showError ? colors.red : colors.black}]} >
          <Text style={styles.date} >{date ? dayjs(date).format('MMMM D, YYYY') : 'Date'}</Text>
          {date && <>{ showError ?  <Ionicons name='alert-circle' color='red' size={20} /> : <Ionicons name='checkmark-circle' color='green' size={20} /> }</>}
      </TouchableOpacity>
      {showError && <Text style={styles.error}>The selected Date should be Today or Older</Text>}
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
  container:{width:'100%'},
  input: { borderWidth: 0.8,fontSize: 14, color: colors.grey, paddingHorizontal:10,paddingVertical:9,borderRadius:6,marginVertical: 5,justifyContent:'space-between',flexDirection:'row' },
  date:{opacity:0.6},
  error: { color: colors.red, fontSize: 12, marginTop: 5 }
})

export default DatePicker;
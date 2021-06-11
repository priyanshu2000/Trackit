import Toast from 'react-native-toast-message';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const ToastMessage = (toastType, toastTitle, toastDescription) => {

    Toast.show({
        type:toastType,
        position: 'bottom',
        text1: toastTitle || type.toUpperCase(),
        text2: toastDescription || '',
        bottomOffset:0,
    });
}

const Icons = {
  error:'close-circle',
  success:'checkmark-circle',
}

const ToastBody = ({ text1,text2,color, Icons }) => {
  return (
    <View style={styles.mainBody}>
        <View style={[{backgroundColor:`${color}`},styles.tintColor]} ></View>
        <Ionicons name={Icons} size={35} color={color} style={styles.icon} />
        <View>
            <Text style={styles.textOne} >{text1}</Text>
            <Text style={styles.textTwo} >{text2}</Text>
        </View>
      </View>
  )
}

export const ToastConfig = {
  error: ({ text1, text2 }) => (
      <ToastBody text1={text1} text2={text2} color={colors.red} Icons={Icons.error}  />
    ),
  success: ({ text1,text2  }) => (
      <ToastBody text1={text1} text2={text2} color={colors.green} Icons={Icons.success} />
    ),
  };

const styles =  StyleSheet.create({
  mainBody:{height: 80,width: '100%',backgroundColor: colors.white,borderRadius:6,alignItems:'center',justifyContent:'flex-start',flexDirection:'row',},
  icon:{marginHorizontal:7.5},
  textOne:{fontWeight:"bold",opacity:0.5,},
  textTwo:{opacity:0.5},
  tintColor:{borderRadius:3,width:'1%',height:'100%'}
})

export default ToastMessage;
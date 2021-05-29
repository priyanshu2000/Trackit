import Toast from 'react-native-toast-message';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

// custom toast component

const ToastMessage = (toastType, toastTitle, toastDescription, visibilityTime) => {

  //toast method

    Toast.show({
        toastType,
        position: 'bottom',
        text1: toastTitle || type.toUpperCase(),
        text2: toastDescription || '',
        visibilityTime: 1500,
        autoHide: true,
        bottomOffset:0
    });
}

// constants

const colors = {
  error : "#de1738", // red tint color
  success: '#2e8b57', //green tint color
}

const Icons = {
  error:'close-circle',  // cross icon
  success:'checkmark-circle', //checkmark icon
}

// taost's custom body

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

// config for toast method according to the type of toast

export const ToastConfig = {
  error: ({ text1, text2 }) => (
      <ToastBody text1={text1} text2={text2} color={colors.error} Icons={Icons.error}  />
    ),
  success: ({ text1,text2  }) => (
      <ToastBody text1={text1} text2={text2} color={colors.success} Icons={Icons.success} />
    ),
  };

// styling for the component

const styles =  StyleSheet.create({
  mainBody:{height: 80,width: '100%',backgroundColor: 'white',borderRadius:6,alignItems:'center',justifyContent:'flex-start',flexDirection:'row',},
  icon:{marginHorizontal:7.5},
  textOne:{fontWeight:"bold",opacity:0.5,},
  textTwo:{opacity:0.5},
  tintColor:{borderRadius:3,width:'1%',height:'100%'}
})

export default ToastMessage;
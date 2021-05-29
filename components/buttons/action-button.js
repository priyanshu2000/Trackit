import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const ActionButton = ({ title, onPress, color }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress} >
            <Text style={[styles.title,{color:color}]} >{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{width:'60%',alignItems:'center',justifyContent:'center',paddingHorizontal:10,paddingVertical:5,backgroundColor: '#fff',shadowColor: '#000',shadowOpacity: 0.4,elevation: 3,borderRadius:5,borderColor:'white',margin:7},
    title:{margin:3.5,fontSize:15,fontWeight:'bold'}
})

export default ActionButton;
import React from 'react'
import { Text, StyleSheet,TouchableOpacity } from 'react-native'
import colors from '../constants/colors';

const Card = ({item,onPress}) => (
    <TouchableOpacity onPress={()=>onPress()} style={styles.card}>
        <Text >{item.description}</Text>
        <Text style={[styles.amountText,{color: item.type === 'Income' ? colors.green : colors.darkred}]} >${item.amount}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    card: {width: '100%',height: 45,borderRadius: 8,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row',backgroundColor: '#fff',shadowColor: '#000',shadowOpacity: 0.4,shadowRadius: 3,elevation: 1,paddingHorizontal: 15,marginVertical:7.5},
    amountText:{fontWeight:'700'}
})

export default Card

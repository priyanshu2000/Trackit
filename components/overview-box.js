import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import { getStatics } from '../api'

const OverviewBox = () => {

    const [statics, setstatics] = useState()

    getStatics().then(response=>setstatics(response))

    return (
        <View style={styles.boxContainer}>
        <View style={styles.box}>
                    <View style={styles.amountContainer} >
                        <Text style={styles.amountHeading} >Balance</Text>
                        <Text style={styles.balance} >${statics ? statics.Balance : 0}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={{justifyContent: 'space-evenly',height: '100%'}}>
                        <View style={styles.amountContainer} >
                            <Text style={styles.amountHeading}>Income</Text>
                            <Text style={styles.income} >${ statics ? statics.TotalIncome : 0 }</Text>
                        </View>
                        <View style={styles.amountContainer} >
                            <Text style={styles.expense} >${ statics ? statics.TotalExpense : 0 }</Text>
                            <Text style={styles.amountHeading}>Expense</Text>
                        </View>
                    </View>
                </View>
                </View>
    )
}

const styles = StyleSheet.create({
    boxContainer:{width:'100%',backgroundColor:"#fff",paddingHorizontal:20,paddingVertical:20,marginBottom:10},
    box: {width: '100%',height: 140,borderRadius: 8,alignItems: 'center',justifyContent: 'space-evenly',flexDirection: 'row',backgroundColor: '#fff',shadowColor: '#000',shadowOpacity: 0.4,shadowRadius: 3,elevation: 3,},
    amountContainer:{justifyContent:'center',alignItems:'center'},
    amountHeading:{fontSize:10},
    balance:{color:Colors.blue,fontSize:24,fontWeight:'bold'},
    income:{color:Colors.green,fontSize:20,fontWeight:'bold'},
    expense:{color:Colors.darkred,fontSize:20,fontWeight:'bold'},
    divider: {borderWidth: 1,height: '90%',opacity: 0.1},
})

export default OverviewBox

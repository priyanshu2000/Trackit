import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import { getStatics } from '../api'

const OverviewBox = () => {

    const [statics, setStatics] = useState()

    getStatics().then(response=>setStatics(response))

    return (
        <View style={styles.boxContainer}>
        <View style={styles.box}>
                    <View style={styles.amountContainer} >
                        <Text style={styles.amountHeading} >Balance</Text>
                        <Text style={styles.balance} >${statics ? statics.Balance : 0}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.rightContainer}>
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
    boxContainer:{width:'100%',backgroundColor:colors.white,paddingHorizontal:20,paddingVertical:20,marginBottom:10},
    box: {width: '100%',height: 140,borderRadius: 8,alignItems: 'center',justifyContent: 'space-evenly',flexDirection: 'row',backgroundColor: colors.white,shadowColor: colors.black,shadowOpacity: 0.4,shadowRadius: 3,elevation: 3,},
    amountContainer:{justifyContent:'center',alignItems:'center'},
    amountHeading:{fontSize:10},
    rightContainer:{justifyContent: 'space-evenly',height: '100%'},
    balance:{color:colors.blue,fontSize:24,fontWeight:'bold'},
    income:{color:colors.green,fontSize:20,fontWeight:'bold'},
    expense:{color:colors.darkRed,fontSize:20,fontWeight:'bold'},
    divider: {borderWidth: 1,height: '90%',opacity: 0.1},
})

export default OverviewBox

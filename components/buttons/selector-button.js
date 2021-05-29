import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const SelectorButton = ({ title1, title2, onValueChange, value }) => {

    const [selectedType, setselectedType] = useState(value || title1)

    /** setter function is exporting the value of selected type or selected value */

    const setter =(selected)=>(onValueChange( selected || title1))

    return (
        <View style={[{flexDirection:'row'},styles.typeButtonContainer]} >
            <TouchableOpacity onPress={()=>{setselectedType(title1);setter(title1)}} style={[styles.selectedTypeButton,{backgroundColor: selectedType == title1 ? colors.yellow : '#F5F5F5',borderTopLeftRadius:8,borderBottomLeftRadius:8}]} >
                <Text style={{color:selectedType === title1 ? 'white' : 'black'}} >{title1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setselectedType(title2);setter(title2)}} style={[styles.selectedTypeButton,{backgroundColor: selectedType == title2 ? colors.yellow : '#F5F5F5',borderBottomRightRadius:8,borderTopRightRadius:8}]}>
                <Text style={{color:selectedType === title2 ? 'white' : 'black'}} >{title2}</Text>
            </TouchableOpacity>
        </View>
        )
    }

const styles = StyleSheet.create({
    typeButtonContainer: {flexDirection: 'row',backgroundColor: 'white',justifyContent: 'center',width:'45%',height:35,alignItems:'center',marginVertical:25,},
    selectedTypeButton:{alignItems:'center',width:'50%',height:'100%',justifyContent:'center'},
    })
export default SelectorButton;
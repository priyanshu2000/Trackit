import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

const SelectorButton = ({ title1, title2, onValueChange, value }) => {

    const [selectedType, setSelectedType] = useState(value || title1)

    const setter =(selected)=>(onValueChange( selected || title1))

    return (
        <View style={[{flexDirection:'row'},styles.typeButtonContainer]} >
            <TouchableOpacity onPress={()=>{setSelectedType(title1);setter(title1)}} style={[styles.selectedTypeButton,{backgroundColor: selectedType == title1 ? colors.yellow : colors.white,borderTopLeftRadius:8,borderBottomLeftRadius:8}]} >
                <Text style={{color:selectedType === title1 ? colors.white : colors.black}} >{title1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setSelectedType(title2);setter(title2)}} style={[styles.selectedTypeButton,{backgroundColor: selectedType == title2 ? colors.yellow : colors.white,borderBottomRightRadius:8,borderTopRightRadius:8}]}>
                <Text style={{color:selectedType === title2 ? colors.white : colors.black}} >{title2}</Text>
            </TouchableOpacity>
        </View>
        )
    }

const styles = StyleSheet.create({
    typeButtonContainer: {flexDirection: 'row',backgroundColor: colors.white,justifyContent: 'center',width:'45%',height:35,alignItems:'center',marginVertical:25,},
    selectedTypeButton:{alignItems:'center',width:'50%',height:'100%',justifyContent:'center'},
    })
export default SelectorButton;
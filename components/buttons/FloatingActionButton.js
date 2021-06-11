import React from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/colors'
import colors from '../../constants/colors';

const FAB = ({ onPress })=>(
    <TouchableOpacity style={styles.floatingButton} onPress={()=> onPress() } >
        <AntDesign name="plus"  size={24} color={colors.white}/>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    floatingButton:{width: 55,height: 55,backgroundColor: Colors.yellow,justifyContent: 'center',alignItems: "center",borderRadius:20,position:'absolute',bottom: 20,},
})

export default FAB

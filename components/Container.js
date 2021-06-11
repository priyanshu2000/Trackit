import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../constants/colors'

const Container = ({children}) => {
    return (
        <View style={styles.container}>{children}</View>
)
}

const styles = StyleSheet.create({
    container:{alignItems:'center',flex:1,width:'100%',backgroundColor:colors.white}
})

export default Container

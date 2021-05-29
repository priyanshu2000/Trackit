import React from 'react'
import {View, StyleSheet} from 'react-native'

const Container = ({children}) => {
    return (
        <View style={styles.container}>{children}</View>
)
}

const styles = StyleSheet.create({
    container:{alignItems:'center',flex:1,width:'100%',backgroundColor:'#F5F5F5'}
})

export default Container

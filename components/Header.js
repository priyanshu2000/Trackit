import React, { useRef, useEffect } from 'react'
import { StyleSheet, Animated, Dimensions, View, Platform } from 'react-native'
import colors from '../constants/colors'
import { StatusBar } from "expo-status-bar"

const Header = () => {

    useEffect(() => {
        shrinkHeader()
    }, [])

    const shrinkAnim = useRef(new Animated.Value(Dimensions.get('window').height-75)).current;

    const shrinkText = useRef(new Animated.Value(60)).current;

    const shrinkHeader = () => {
        Animated.parallel([
            Animated.timing(shrinkAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver:false
            }),
            Animated.timing(shrinkText, {
                toValue: 22,
                duration: 900,
                useNativeDriver:false,
            })
    ]).start();
    };

    return (
        <>
            <View style={styles.statusbarContainer} >
            <StatusBar backgroundColor={colors.yellow} />
            </View>
            <Animated.View style={[styles.container,{height:shrinkAnim}]} >
                <Animated.Text style={[styles.title,{fontSize:shrinkText}]}>Trackit</Animated.Text>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{backgroundColor:colors.yellow,width:'100%',alignItems:'center',justifyContent:"center",paddingVertical:25,height:'100%'},
    statusbarContainer:{width:'100%',paddingTop: Platform.OS === "android" ? 20 : 0},
    title:{color:colors.white,fontWeight:'bold',}
})

export default Header

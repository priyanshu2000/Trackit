import React,{ useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AppInput = ({ placeHolder, onChange, value, type, autoFocus, isNumericInput }) => {

    const [focus, setfocus] = useState()
    const [showHint, setshowHint] = useState( value ? true : false)
    const [showError, setshowError] = useState(false)

    const handleInput = ( val )=> {
        const numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/
        const isNumber = numberRegex.test(val);
        if(val.length != 0&&isNumber&&isNumericInput){
                setshowHint(true);setshowError(false)
        }
        else if(val.length != 0&&!isNumericInput){
            setshowHint(true);setshowError(false)
        }
        else {
            setshowHint(true);setshowError(true)
        }
    }

    return (
        <View style={[styles.input, { borderColor:focus }]}>
            <TextInput
                keyboardType={type ? 'numeric' : 'default'}
                placeholderTextColor={'grey'}
                style={{flex:1}}
                placeholder={placeHolder}
                onChangeText={onChange}
                defaultValue={value}
                autoFocus={autoFocus}
                autoCapitalize='words'
                onFocus={()=>setfocus(colors.yellow)}
                onBlur={()=>setfocus('black')}
                onChange={(e)=>handleInput(e.nativeEvent.text)}
                onEndEditing={(e)=>handleInput(e.nativeEvent.text)}
            />
            {showHint ? <>{ showError ?  <Ionicons name='alert-circle' color='red' size={20} /> : <Ionicons name='checkmark-circle' color='green' size={20} />}</> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    input: { borderWidth: 0.8,fontSize: 14, paddingHorizontal:10 ,paddingVertical:5, borderRadius:6, width:'100%',marginVertical: 10, flexDirection:'row', alignItems:'center',justifyContent:'space-between'},
    error: {  fontSize: 12, margin: 3.5, color:'red' }
})

export default AppInput;

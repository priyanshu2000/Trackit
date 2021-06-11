import React,{ useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AppInput = ({ placeHolder, onChange, value, type, autoFocus, isNumericInput }) => {

    const [focus, setFocus] = useState()
    const [showHint, setShowHint] = useState( value ? true : false)
    const [showError, setShowError] = useState(false)

    const handleInput = ( val )=> {
        const numberRegex = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/
        const isNumber = numberRegex.test(val);
        if(val.length != 0 && isNumber && isNumericInput){
                setShowHint(true);setShowError(false)
        }
        else if(val.length != 0 && !isNumericInput){
            setShowHint(true);setShowError(false)
        }
        else {
            setShowHint(true);setShowError(true)
        }
    }

    return (
        <View>
            <View style={[styles.inputContainer, { borderColor:focus }]}>
                <TextInput
                    keyboardType={type ? 'numeric' : 'default'}
                    placeholderTextColor={'grey'}
                    style={styles.input}
                    placeholder={placeHolder}
                    onChangeText={onChange}
                    defaultValue={value}
                    autoFocus={autoFocus}
                    autoCapitalize='words'
                    onFocus={()=>setFocus(colors.yellow)}
                    onBlur={()=>setFocus(colors.black)}
                    onChange={(e)=>handleInput(e.nativeEvent.text)}
                    onEndEditing={(e)=>handleInput(e.nativeEvent.text)}
                />
                {showHint && <>{ showError ?  <Ionicons name='alert-circle' color='red' size={20} /> : <Ionicons name='checkmark-circle' color='green' size={20} />}</> }
            </View>
            {showHint && <>{ showError && <Text style={styles.error}>This field can not be empty.</Text>}</>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: { borderWidth: 0.8,fontSize: 14, paddingHorizontal:10 ,paddingVertical:5, borderRadius:6, width:'100%',marginVertical: 10, flexDirection:'row', alignItems:'center',justifyContent:'space-between'},
    input:{flex:1},
    error: { color: colors.red, fontSize: 12, marginTop: -5 }
})

export default AppInput;

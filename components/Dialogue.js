import React from 'react'
import { Modal, TouchableOpacity, View, StyleSheet,Text } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from '../constants/colors';

const Dialogue = ({ isOpen, children, onClose, heading }) => {
    return (
        <Modal
            statusBarTranslucent={true}
            transparent={true}
            animationType='slide'
            visible={isOpen}
            animationOutTiming={1000}
        >
            <View style={styles.modalContainer}>
                <View style={styles.childrenContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}><AntDesign name="close"size={20} color="black"/></TouchableOpacity>
                    <Text style={styles.dialogueHeading}>{heading}</Text>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer:{ backgroundColor: colors.black, flex: 1, justifyContent:'flex-end', alignItems: 'center'},
    childrenContainer:{ backgroundColor:colors.white, alignItems: 'center', paddingBottom: 10, borderRadius: 10, height:'92%',width:'100%',paddingHorizontal:20},
    closeButton:{ alignSelf: 'flex-end', paddingTop: 10, paddingRight: 10 },
    dialogueHeading:{fontSize:18,opacity:0.6,color:'black'}
})

export default Dialogue;
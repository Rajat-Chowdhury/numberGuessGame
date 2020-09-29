import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';

const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}> 
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText} > {props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        backgroundColor:Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius:8
    }, 
    buttonText:{
        color:'white',
        fontFamily:'product-sans',
        fontSize:18
    }
})

export default MainButton;
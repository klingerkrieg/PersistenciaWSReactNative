import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input'

export const buttonTypes = {
    success:'#38c23c',
    warning:'#e69834',
    normal:'#7db4ff'
}

const styles = StyleSheet.create({
    container:{
        margin:10
    },
    label:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold'
    },
    input:{
        fontSize:20,
        paddingTop:10,
        color:'#000',
        backgroundColor:'#ddd',
      },
});

export function LabeledInput(props){

    let type = props.type;
    if (type == undefined){
        type = 'text';
    }

    let input;
    if (type == 'text'){
        input = <TextInput value={props.value} style={styles.input}
                        onChangeText={text => props.onChangeText(text)} />
    } else
    if (type == 'password'){
        input = <TextInput value={props.value} style={styles.input} secureTextEntry={true}
                        onChangeText={text => props.onChangeText(text)} />
    } else
    if (type == 'textarea'){
        input = <TextInput value={props.value} style={styles.input}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => props.onChangeText(text)} />
    } else
    if (type == 'currency'){
        input = <CurrencyInput
                        value={props.value}
                        onChangeValue={text => props.onChangeText(text)}
                        style={styles.input}
                        prefix="R$"
                        delimiter="."
                        separator=","
                        precision={2}
                    />
    } else {
        console.log("Tipo inexistente para o LabeledInput:"+type);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {props.label}
            </Text>
            {input}
        </View>
    );
};
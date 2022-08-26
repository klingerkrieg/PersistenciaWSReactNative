import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input'
import { Masks, useMaskedInputProps } from 'react-native-mask-input';

export const buttonTypes = {
    success:'#38c23c',
    warning:'#e69834',
    normal:'#7db4ff'
}

export const styles = StyleSheet.create({
    container:{
        margin:10
    },
    label:{
        color:'#000',
        fontSize:global.titleFontSize,
        fontWeight:'bold'
    },
    input:{
        fontSize:global.normalFontSize,
        paddingTop:10,
        color:'#000',
        backgroundColor:'#ddd',
    },
    error:{
        marginTop:-1,
        padding:5,
        color:'red',
        backgroundColor:'#ddd',
        fontWeight:'bold'
    },
    helper: {
        fontSize:global.normalFontSize,
    },
    row:{
        flexDirection:'row'
    }
});

export function LabeledInput(props){

    let type = props.type;
    if (type == undefined){
        type = 'text';
    }
    let editable = props.editable;
    if (editable == undefined){
        editable = true;
    }

    

    let input;
    if (type == 'checkbox'){
        input = <CheckBox value={props.value}
                    onValueChange={props.onValueChange}
                    style={styles.checkbox} />
    } else
    if (type == 'phone'){
        const maskedInputProps = useMaskedInputProps({
            value:props.value,
            mask: Masks.BRL_PHONE,
        });
        input = <TextInput style={styles.input} {...maskedInputProps}
                        onChangeText={text => props.onChangeText(text)}
                        keyboardType="numeric"
                        editable={editable} />
    } else
    if (type == 'cpf'){
        const maskedInputProps = useMaskedInputProps({
            value:props.value,
            mask: Masks.BRL_CPF,
        });
        input = <TextInput style={styles.input} {...maskedInputProps}
                            onChangeText={text => props.onChangeText(text)}
                            keyboardType="numeric"
                            editable={editable} />
    } else
    if (type == 'cep'){
        const maskedInputProps = useMaskedInputProps({
            value:props.value,
            mask: Masks.ZIP_CODE,
        });
        input = <TextInput style={styles.input} {...maskedInputProps}
                            onChangeText={text => props.onChangeText(text)}
                            keyboardType="numeric"
                            editable={editable} />
    } else
    if (type == 'text'){
        input = <TextInput style={styles.input} value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                        keyboardType={props.keyboardType}
                        editable={editable} />
    } else
    if (type == 'email'){
        input = <TextInput value={props.value} style={styles.input} 
                        keyboardType="email-address"
                        onChangeText={text => props.onChangeText(text)}
                        editable={editable} />
    } else
    if (type == 'password'){
        input = <TextInput value={props.value} style={styles.input} 
                        secureTextEntry={true}
                        onChangeText={text => props.onChangeText(text)}
                        editable={editable} />
    } else
    if (type == 'textarea'){
        input = <TextInput value={props.value} style={styles.input}
                        multiline
                        numberOfLines={4}
                        editable={editable}
                        onChangeText={text => props.onChangeText(text)} />
    } else
    if (type == 'currency'){
        input = <CurrencyInput
                        value={props.value}
                        onChangeValue={text => props.onChangeText(text)}
                        keyboardType="numeric"
                        style={styles.input}
                        prefix="R$"
                        delimiter="."
                        separator=","
                        precision={2}
                        editable={editable}
                    />
    } else {
        console.log("Tipo inexistente para o LabeledInput:"+type);
    }

    if (type == 'checkbox'){
        return (
            <View style={styles.container}>

                <View style={styles.row}>
                    {input}
                    <TouchableOpacity activeOpacity={0.8} 
                        onPress={() => props.onValueChange(!props.value)}>
                        <Text style={styles.label} >
                            {props.label}
                        </Text>
                    </TouchableOpacity>
                </View>
                {props.helper != undefined &&
                <Text style={styles.helper}>
                    {props.helper}
                </Text>
                }
                {props.error != undefined &&
                <Text style={styles.error}>
                    {props.error}
                </Text>
                }      
            </View>);
    } else {
        return (
            <View style={styles.container}>

                <Text style={styles.label}>
                    {props.label}
                </Text>
                {input}

                {props.helper != undefined &&
                <Text style={styles.helper}>
                    {props.helper}
                </Text>
                }

                {props.error != undefined &&
                <Text style={styles.error}>
                    {props.error}
                </Text>
                }      
            </View>);
    }
};
import React, { useState, useRef } from 'react';
import { View, ToastAndroid, Image, ScrollView, StyleSheet} from 'react-native';
import { Button, buttonTypes } from '../components/Button';
import { LabeledInput } from '../components/LabeledInput';
import * as auth from '../controllers/Auth';

const styles = StyleSheet.create({
    input:{
      fontSize:20,
      margin:5,
      borderBottomWidth:1,
      color:"#000",
    },
    titleText:{
      fontSize:20,
      textAlign:'center',
      fontWeight:'bold'
    },
    buttons:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'center'
    },
})

export function Login(props){

    //cria os atributos de estado
    const [email, setEmail] = useState("admin@gmail.com");
    const [senha, setSenha] = useState("123456");
    
    const logar = ()  => {
        
        auth.logar({email:email, senha:senha}).then(resp => {
            
            if (resp.error == 0){
                global.token = resp.accessToken
                props.navigation.navigate("Produtos");

            } else {
                ToastAndroid.showWithGravity(
                    "Usuário ou senha inválida",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
        })
    }


    return <>

            <LabeledInput label="E-mail" value={email} 
                          onChangeText={text => setEmail(text)} />

            <LabeledInput label="Senha" value={senha} type="password"
                          onChangeText={text => setSenha(text)} />

            <Button type={buttonTypes.success} 
                    onPress={() => logar()}>Entrar</Button>

        </>
};

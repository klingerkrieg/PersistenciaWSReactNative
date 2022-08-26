import React, { useState, useRef } from 'react';
import { ToastAndroid} from 'react-native';
import { Button, buttonTypes } from '../components/Button';
import { LabeledInput } from '../components/LabeledInput';
import * as auth from '../controllers/Auth';

import { styles } from './Estilo';

export function Login(props){

    //cria os atributos de estado
    const [email, setEmail] = useState("admin@gmail.com");
    const [senha, setSenha] = useState("123456");
    
    const logar = ()  => {
        
        auth.logar({email:email, senha:senha}).then(resp => {
            
            if (resp == true){
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

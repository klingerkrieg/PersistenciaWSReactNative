import React, { useState, useRef } from 'react';
import { View, ToastAndroid, Image, Text, TextInput, StyleSheet} from 'react-native';
import { Button, buttonTypes } from '../components/Button';
import CurrencyInput from 'react-native-currency-input'
import { FotoPicker } from '../components/FotoPicker';

import * as produtos from '../controllers/Produtos';

const styles = StyleSheet.create({
    input:{
      fontSize:20,
      margin:5,
      borderBottomWidth:1,
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
    foto:{
        width:400,
        height:300,
        resizeMode: 'contain'
    }
})

export function CadastroProduto(props){

    //estado inicial do formulario
    var data = {nome:"", preco:0, descricao:"", foto:null}

    //caso seja para editar um item, pega as informacoes passadas
    if (props.navigation.getParam("data")){
        data = props.navigation.getParam("data");
    }

    //cria os atributos de estado
    const [id, setId] = useState(-1);
    const [nome, setNome] = useState(data.nome);
    const [preco, setPreco] = useState(data.preco);
    const [descricao, setDescricao] = useState(data.descricao);
    const [foto, setFoto] = useState(data.foto);
    const [upload, setUpload] = useState(null);
    
    
    const limpar = () => {
        setId(-1);
        setNome("");
        setPreco(0);
        setDescricao("");
        setFoto("");
    }

    const salvarCallBack = (resp) => {
        if (resp.error){
        ToastAndroid.showWithGravity(
            "Houve um erro ao salvar",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
        console.log(resp)
        } else {
            ToastAndroid.showWithGravity(
                "Produto salvo",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
    }

    
    const salvar = ()  => {
        let dados = {nome:nome,
                    preco:preco,
                    descricao:descricao};

        
        if (id == -1){
            produtos.save(dados,upload)
                        .then(salvarCallBack);
        } else {
            dados.id = id;
            produtos.update(dados,foto)
                        .then(salvarCallBack);
        }
    }

    const selectFile = (file) => {
        setUpload(file);
        setFoto(file)
    }


    return <View>
            <TextInput placeholder="Nome" style={styles.input} value={nome}
                onChangeText={text => setNome(text)}
                />

            <CurrencyInput
                        value={preco}
                        onChangeValue={text => setPreco(text)}
                        style={styles.input}
                        prefix="R$"
                        delimiter="."
                        separator=","
                        precision={2}
                    />

                <TextInput placeholder="Descrição" style={styles.input} value={descricao}
                    onChangeText={text => setDescricao(text)}
                    />

                <FotoPicker onSelect={selectFile} />

                {foto &&
                    <Image
                        style={styles.foto}
                        source={foto}
                    />
                }

                <View style={styles.buttons}>

                    <Button type={buttonTypes.success} 
                            style={{width:150}}
                            onPress={() => salvar()}>Salvar</Button>
                
                    <Button type={buttonTypes.warning} 
                            style={{width:150}}
                            onPress={() => limpar()}>Limpar</Button>

                </View>
        </View>
};

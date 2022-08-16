import React, { useState, useEffect } from 'react';
import { View, ToastAndroid, Image, ScrollView, StyleSheet} from 'react-native';
import { Button, buttonTypes } from '../components/Button';
import { FotoPicker } from '../components/FotoPicker';

import * as produtos from '../controllers/Produtos';
import { LabeledInput } from '../components/LabeledInput';

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
    foto:{
        width:400,
        height:300,
        resizeMode: 'contain'
    }
})

export function CadastroProduto(props){

    //estado inicial do formulario
    var data = {id:-1, nome:"", preco:0, descricao:"", foto:""}

    //caso seja para editar um item, pega as informacoes passadas
    if (props.route.params && props.route.params.data){
        data = props.route.params.data;
    }

    //cria os atributos de estado
    const [id, setId] = useState(data.id);
    const [nome, setNome] = useState(data.nome);
    const [preco, setPreco] = useState(data.preco);
    const [descricao, setDescricao] = useState(data.descricao);
    const [foto, setFoto] = useState(data.foto);
    const [upload, setUpload] = useState(null);
    

    useEffect(() => {
        if (id != -1){
            produtos.getPhoto(data).then((json)=>{
                console.log(json);
                setFoto(json.foto);
            });
        }
    }, [id, data]);
    
    const limpar = () => {
        setId(-1);
        setNome("");
        setPreco(0);
        setDescricao("");
        setFoto("");
        setUpload(null);
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
            produtos.update(dados,upload)
                        .then(salvarCallBack);
        }
    }

    const selectFile = (file) => {
        setUpload(file);
        setFoto(file)
        console.log(file);
    }


    return <ScrollView>

            <LabeledInput label="Nome" value={nome} 
                          onChangeText={text => setNome(text)} />

            <LabeledInput label="Preço" value={preco} type="currency"
                          onChangeText={text => setPreco(text)} />

            <LabeledInput label="Descrição" value={descricao} type="textarea"
                          onChangeText={text => setDescricao(text)} />

            <FotoPicker onSelect={selectFile} />

            {foto != "" &&
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
        </ScrollView>
};

import React, { useState, useEffect } from 'react';
import { View, ToastAndroid, Image, ScrollView, Text} from 'react-native';
import { Button, buttonTypes } from '../components/Button';
import { FotoPicker } from '../components/FotoPicker';

import * as controller from '../controllers/Produtos';
import { LabeledInput } from '../components/LabeledInput';
import { styles } from './Estilo';



export function CadastroProduto({navigation, route}){

    let defaultId = -1;

    //se veio uma id via parametro
    //quer dizer que está editando algum produto
    if (route.params != undefined){
        if (route.params.id != undefined){
            defaultId = route.params.id;
        }
    }

    //cria os atributos de estado
    const [id, setId] = useState(defaultId);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [foto, setFoto] = useState("");
    const [upload, setUpload] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        /**
         * Ao abrir essa tela, busca do banco os dados do produto
         */
         if (id != -1){
            controller.get(id).then((resp) => {
                if (resp.error){
                    //Se der erro volta
                    ToastAndroid.showWithGravity(
                        "Houve um erro ao recuperar a renovação",
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    navigation.goBack();
                } else {

                    //preenche as variaveis com as informacoes que vieram do banco
                    setNome(resp.data.nome);
                    setPreco(resp.data.preco);
                    setDescricao(resp.data.descricao);

                    //se deu certo, baixa a foto
                    controller.getPhoto(resp.data).then((json)=>{
                        setFoto(json.foto);
                        setLoading(false);
                    });
        
                }
            });
        } else {
            //se for um novo cadastro
            setLoading(false);
        }
    },[navigation])
    
    
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
            controller.save(dados,upload)
                        .then(salvarCallBack);
        } else {
            dados.id = id;
            controller.update(dados,upload)
                        .then(salvarCallBack);
        }
    }

    const selectFile = (file) => {
        setUpload(file);
        setFoto(file)
    }

    if (loading == true) {
        return  <View style={styles.centerMessage}>
                    <Text style={styles.messages}>Carregando...</Text>
                </View>
    } else {
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
    }
};

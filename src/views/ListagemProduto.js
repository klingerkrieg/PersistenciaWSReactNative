import React, {useRef, useEffect} from 'react';
import { ToastAndroid, Alert, StyleSheet, Text} from 'react-native';

import { SimpleList } from '../components/SimpleList';
import { Button, buttonTypes } from '../components/Button';

//Controller
import * as controller from '../controllers/Produtos';

import { styles } from './Estilo';

import "intl";
import 'intl/locale-data/jsonp/pt-BR'

export function ListagemProduto (props){

  const listRef = React.useRef(null);
  const navigation = props.navigation;
  const { navigate } = props.navigation;


  useEffect(() => {
      navigation.addListener('focus', payload => {
          listRef.current.update();
      })
  }, [navigation]);


  const updateList = () => {
    /* Contexto de ListagemSimples */
    listRef.current.setRefreshing(true);
    controller.getAll()
      .then((resp) => {
          if (resp.error){
            ToastAndroid.showWithGravity(
              "Houve um erro ao carregar a lista",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            console.log(resp)
          } else {
            listRef.current.setItems(resp.data);
            listRef.current.setRefreshing(false);
          }
        }
      );
  }


  const editar = (item) =>{
    navigate("Cadastro de produtos",{id:item.id});
  }

  const deletar = (item) => {
    /* Contexto de ListagemSimples */
    //Esta função irá ser executada no contexto do ListagemSimples
    //Então ela poderá usar por exemplo this.update (Que é um método que existe
    //apenas dentro de ListagemSimples)
    Alert.alert(
      'Confirmação',
      'Deseja excluir esse produto?',
      [
        {text: 'Não',style: 'cancel',},
        {text: 'Sim', onPress: () => {
          controller.del(item.id).then((resp) => {
              if (resp.error){
                ToastAndroid.showWithGravity(
                  "Houve um erro ao salvar",
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER
                );
                listRef.current.update();
              } else {
                listRef.current.update();
              }
            });
        }},
      ],
      {cancelable: false},
    );
  }
  

  return <>
          {/* este componente ListagemSimples irá receber 
            e executar as funções definidas em ListagemProduto (Aqui) */}
            <SimpleList 
                      ref={listRef}
                      onPress={editar} 
                      onLongPress={deletar} 
                      update={updateList} 
                      item={(item) => <Text>{item.nome} - R$ {new Intl.NumberFormat('br',
                                                                      {styles:'currency', 
                                                                      currency: 'BRL',  
                                                                      minimumFractionDigits: 2}).format(item.preco)}
                                        </Text>}
                      navigate={navigate}
                      />

            <Button 
              type={buttonTypes.normal}
              onPress={() => navigate("Cadastro de produtos") }>Novo</Button>

          </>
}


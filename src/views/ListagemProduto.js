import React, {useRef, useEffect} from 'react';
import { ToastAndroid, Alert, StyleSheet, Text} from 'react-native';

import { ListagemSimples } from '../components/ListagemSimples';
import { Button, buttonTypes } from '../components/Button';

//Controller
import * as produtos from '../controllers/Produtos';

import "intl";
import 'intl/locale-data/jsonp/pt-BR'

const styles = StyleSheet.create({
  
});

export function ListagemProduto (props){

  const listagemRef = React.useRef(null);
  const navigation = props.navigation;
  const { navigate } = props.navigation;

  useEffect(() => {
    //Ao carregar a tela pela primeira vez
    //console.log("useEffect");
    let navigationListener = navigation.addListener('focus', payload => {
      //Irá verificar todas as vezes que essa tela receber o foco
      //console.log("FOCO")
      listagemRef.current.update(); //Atualiza a lista
    })
  }, [listagemRef, navigation]);


  const updateList = () => {
    /* Contexto de ListagemSimples */
    setRefreshing(true);
    produtos.getAll()
      .then((resp) => {
          if (resp.error){
            ToastAndroid.showWithGravity(
              "Houve um erro ao carregar a lista",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            console.log(resp)
          } else {
            setItems(resp.data);
            setRefreshing(false);
          }
        }
      );
  }


  const editar = (id) =>{
    /* Contexto de ListagemSimples */
    produtos.get(id).then((resp) => {

      if (resp.error){
        ToastAndroid.showWithGravity(
          "Houve um erro ao recuperar",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        console.log(resp)
      } else {
        
        navigate("Cadastro de produtos",{data:resp.data});

      }
    });
  }

  const deletar = (id) => {
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
            produtos.del(id).then((resp) => {
              if (resp.error){
                ToastAndroid.showWithGravity(
                  "Houve um erro ao salvar",
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER
                );
                listagemRef.current.update();
              } else {
                listagemRef.current.update();
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
            <ListagemSimples 
                      ref={listagemRef}
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


import React, {Component} from 'react';
import { ToastAndroid, Alert, StyleSheet, Text} from 'react-native';

import ListagemSimples from '../components/ListagemSimples';
import { Button, buttonTypes } from '../components/Button';

//Controller
import * as produtos from '../controllers/Produtos';

import "intl";

const styles = StyleSheet.create({
  
});

class ListagemProduto extends Component {

  state = {};

  constructor(props){
    super(props);
    this.listagemRef = React.createRef();
  }

  componentDidMount(){
    //Principal modificacao
    //https://reactnavigation.org/docs/navigation-events#navigationaddlistener

    let context = this;
    this.navigationListener = this.props.navigation.addListener('willFocus', payload => {
      //por algum motivo isso só funciona se o construtor for definido em ListagemSimples.js
      try{
        context.listagemRef.current.update();
      } catch(e){
      }
    })
  }


  updateList(){
    /* Contexto de ListagemSimples */
    this.setState({refreshing: true});
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
            this.setState({items:resp.data, refreshing: false});
          }
        }
      );
  }


  editar(id){
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
        
        this.props.navigate("Cadastro de produtos",{data:resp.data});

      }
    });
  }

  deletar(id){
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
                console.log(resp)
              } else {
                this.update();
              }
            });
        }},
      ],
      {cancelable: false},
    );
  }
  

  render(){
    const { navigate } = this.props.navigation;

    return <>
            {/* este componente ListagemSimples irá receber 
              e executar as funções definidas em ListagemProduto (Aqui) */}
              <ListagemSimples 
                        ref={this.listagemRef}
                        onPress={this.editar} 
                        onLongPress={this.deletar} 
                        update={this.updateList} 
                        item="nome"
                        item2={(item) => <Text>{item.nome} - R${new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(item.preco)}</Text>}
                        navigate={navigate}
                        />

              <Button 
                type={buttonTypes.normal}
                onPress={() => navigate("Cadastro de produtos") }>Novo</Button>

            </>
  }
}

export default ListagemProduto;


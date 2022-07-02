import React, {Component} from 'react';
import { View, ToastAndroid, TouchableHighlight, Alert, RefreshControl, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as produtos from './Produtos';
import CurrencyInput from 'react-native-currency-input'
import SwipeUpDown from 'react-native-swipe-up-down';

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
  slideUp:{
    height:30,
    textAlign:'center',
    backgroundColor:'green'
  },
  buttons:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'center'
  },
  button:{
    height:50,
    marginLeft:15,
    width:150
  },
  success:{
    backgroundColor:'#38c23c',
  },
  warning:{
    backgroundColor:'#e69834',
  },
  buttonText:{
    fontSize:20,
    paddingTop:10,
    textAlign:'center',
    color:'#ffffff',
  },
  list:{
    marginBottom:60
  },
  itemList:{
    borderBottomWidth:1,
    padding:20,
  },
  itemText:{
    fontSize:20
  }
});

class App extends Component {

  state = {
          refreshing:false,
          id:-1,
          nome:"",
          preco:0,
          descricao:"", 
          produtos:[]};

  constructor(props){
    super(props);
    this.swipper = React.createRef();
  }

  
  componentDidMount(){
    this.updateList();
  }

  updateList(){
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
            this.setState({produtos:resp.data, refreshing: false});
          }
        }
      );
  }

  novo(){
    this.setState({salvarNovo:true});
  }

  limpar(){
    this.setState({id:-1,nome:"",preco:0,descricao:""});
  }
  
  salvar(){
    if (this.state.id == -1){
      produtos.save({nome:this.state.nome,
                    preco:this.state.preco,
                    descricao:this.state.descricao})
                    .then((resp) => {
                      if (resp.error){
                        ToastAndroid.showWithGravity(
                          "Houve um erro ao salvar",
                          ToastAndroid.LONG,
                          ToastAndroid.CENTER
                        );
                        console.log(resp)
                      } else {
                        this.updateList()
                      }
                    });
    } else {
      produtos.update({id:this.state.id,
                      nome:this.state.nome,
                      preco:this.state.preco,
                      descricao:this.state.descricao})
                      .then((resp) => {
                        if (resp.error){
                          ToastAndroid.showWithGravity(
                            "Houve um erro ao salvar",
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER
                          );
                          console.log(resp)
                        } else {
                          this.updateList()
                        }
                      });
    }
    this.limpar()
    this.swipper.current.showMini();
  }

  editar(id){
    produtos.get(id).then((resp) => {

      if (resp.error){
        ToastAndroid.showWithGravity(
          "Houve um erro ao salvar",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
        console.log(resp)
      } else {

        this.setState(resp.data);
        this.swipper.current.showFull();

      }
    });
  }

  deletar(id){
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
                this.updateList()
              }
            });
        }},
      ],
      {cancelable: false},
    );
  }
  
  cadastroForm(){
    return <>
      <Text style={styles.titleText}>Cadastro de produtos</Text>
      <TextInput placeholder="Nome" style={styles.input} value={this.state.nome}
          onChangeText={text => this.setState({nome:text})}
        />

      <CurrencyInput
            value={this.state.preco}
            onChangeValue={text => this.setState({preco:text})}
            style={styles.input}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            onChangeText={(formattedValue) => {
              console.log(formattedValue); // $2,310.46
            }}
          />

      <TextInput placeholder="Descrição" style={styles.input} value={this.state.descricao}
          onChangeText={text => this.setState({descricao:text})}
        />

      <View style={styles.buttons}>
      <TouchableOpacity
              style={[styles.button,styles.success]}
              onPress={() => this.salvar()}
            >
            <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
              style={[styles.button,styles.warning]}
              onPress={() => this.limpar()}
            >
            <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      </View>
      
    </>
  }



  render(){

    return <>

            <Text style={styles.titleText}>Produtos</Text>

              <ScrollView style={styles.list} refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing}
                        onRefresh={this.updateList.bind(this)} />
                }>
              {this.state.produtos.map( (prod,i) => 
                  <TouchableHighlight style={styles.itemList} key={i} 
                    onPress={() => this.editar(prod.id)} 
                    onLongPress={() => this.deletar(prod.id)}>
                    <Text style={styles.itemText}>{prod.nome}</Text>
                  </TouchableHighlight>
              )}
              </ScrollView>


              <SwipeUpDown
                itemMini={(show) => <View
                        style={{
                          alignItems: "center",
                          height:30
                        }}
                      >
                  <Text style={{fontSize:20}} onPress={show}>Cadastrar novo</Text>
                </View>}
                ref={this.swipper}
                itemFull={(hide) => this.cadastroForm()}
                animation="spring"
                disableSwipeIcon
                extraMarginTop={200}
                iconColor='yellow'
                iconSize={50}
                style={{ backgroundColor: '#ccc' }} 
              />


            </>
  }
}
export default App;


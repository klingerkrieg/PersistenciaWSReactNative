import React, {Component} from 'react';
import { TouchableHighlight, Alert, RefreshControl, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as produtos from './Produtos';
import CurrencyInput from 'react-native-currency-input'


const styles = StyleSheet.create({
  input:{
    fontSize:20,
    margin:5,
    borderBottomWidth:1,
  },
  slideUp:{
    height:30,
    textAlign:'center',
    backgroundColor:'green'
  },
  button:{
      backgroundColor:'#e69834',
      height:50,
    },
  buttonText:{
    fontSize:20,
    paddingTop:10,
    textAlign:'center',
    backgroundColor:'#e69834',
    color:'#ffffff',
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
          salvarNovo:true,
          refreshing:false,
          id:-1,
          nome:"",
          preco:0,
          descricao:"", 
          produtos:[]};

  
  componentDidMount(){
    this.updateList();
  }

  updateList(){
    this.setState({refreshing: true});
    produtos.getAll()
      .then((prods) => {
          this.setState({produtos:prods, refreshing: false});
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
                    .then(() => this.updateList());
    } else {
      produtos.update({id:this.state.id,
                      nome:this.state.nome,
                      preco:this.state.preco,
                      descricao:this.state.descricao})
                      .then(() => this.updateList());
    }
    //this.limpar()
    //this.setState({salvarNovo:false});
  }

  editar(id){
    produtos.get(id).then((prod) => {
      console.log(prod);
      this.setState(prod);
    });
  }

  deletar(id){
    Alert.alert(
      'Confirmação',
      'Deseja excluir esse produto?',
      [
        {text: 'Não',style: 'cancel',},
        {text: 'Sim', onPress: () => {
            produtos.del(id).then(() => this.updateList());
        }},
      ],
      {cancelable: false},
    );
  }
  scrollHandler(){
    console.log("AAAAAAAAA");
  }

  render(){

    return <>

              {this.state.salvarNovo == true ? 
                /* SE */
                <ScrollView style={{height:150}} onScroll={({nativeEvent}) => {
                  console.log(nativeEvent);
                }}>
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

                  <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.salvar()}
                        >
                        <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                  <Text style={styles.slideUp}>=========</Text>
                </ScrollView>
                : 
                /* SENÃO */
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.novo()}
                  >
                      <Text style={styles.buttonText}>Novo</Text>
                </TouchableOpacity>
              }


              <ScrollView refreshControl={
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

            </>
  }
}
export default App;


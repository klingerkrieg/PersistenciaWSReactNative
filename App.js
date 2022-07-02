import React, {Component} from 'react';
import {ScrollView, TouchableHighlight, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import * as produtos from './Produtos';

const styles = StyleSheet.create({
  input:{
    fontSize:20,
    margin:5,
    borderBottomWidth:1,
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
          id:-1,
          nome:"",
          preco:0,
          descricao:"", 
          produtos:[]};

  
  componentDidMount(){
    this.updateList();
  }

  updateList(){
    produtos.getAll()
      .then((prods) => {
          this.setState({produtos:prods})
        }
      );
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
  }

  editar(id){
    produtos.get(id).then((prod) => {
      console.log(prod);
      this.setState(prod);
    });
  }

  deletar(id){
    console.log(id);
    produtos.del(id)
    .then(() => this.updateList());
  }


  render(){

    return <>
              <TextInput placeholder="Nome" style={styles.input} value={this.state.nome}
                  onChangeText={text => this.setState({nome:text})}
                />

              <TextInput placeholder="Preço" style={styles.input} value={this.state.preco+""}
                  onChangeText={text => this.setState({preco:text})} keyboardType="numeric"
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

              <ScrollView>
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


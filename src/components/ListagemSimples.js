import React, {Component} from 'react';
import { TouchableHighlight, RefreshControl, View, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  list:{
    marginBottom:60
  },
  itemList:{
    borderBottomWidth:1,
    padding:20,
  },
  itemText:{
    fontSize:20,
    color:'#000',
    Text : {
      color:'#000',
      fontSize:20,
    }
  }
});

class ListagemSimples extends Component {

    state = {
          refreshing:false,
          items:[]};

  constructor(props){
    super(props);
  }

  update(){
    this.props.update.bind(this)();
  }
          
  
  componentDidMount(){
    this.update();
  }


  render(){
    
    return <>
              <ScrollView style={styles.list} refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing}
                        onRefresh={this.props.update.bind(this)} />
                }>
              {this.state.items.map( (item,i) => 
                  <TouchableHighlight style={styles.itemList} key={i} 
                    onPress={this.props.onPress.bind(this,item.id)} 
                    onLongPress={this.props.onLongPress.bind(this,item.id)}>
                    {/*<Text style={styles.itemText}>{item[this.props.item]}</Text>*/}
                    <Text style={styles.itemText}>
                      {this.props.item2(item)}
                    </Text>
                  </TouchableHighlight>
              )}
              </ScrollView>
            </>
  }
}
export default ListagemSimples;


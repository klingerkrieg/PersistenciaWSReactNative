import React, { useState, useCallback, useEffect, useImperativeHandle } from 'react';
import { TouchableHighlight, RefreshControl, View, Text, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    list:{
        marginBottom:60,
        minHeight:100,
    },
    itemList:{
        borderBottomWidth:1,
        padding:20,
    },
    itemText:{
        fontSize:20,
        color:'#000'
    }
});


export const ListagemSimples = React.forwardRef((props, ref) => {

    [refreshing,setRefreshing] = useState(false);
    [items, setItems] = useState([]);

    const onPress = (item) => {
      if (props.onPress != undefined){
        props.onPress(item.id);
      }
    };

    const onLongPress = (item) => {
      if (props.onLongPress != undefined){
        props.onLongPress(item.id);
      }
    };

    const _update = () => {
      props.update.bind(this)();
    }

    useImperativeHandle(ref, () => ({
      update(){
        _update();
      }
    }));


    return <View ref={ref}> 
              <ScrollView style={styles.list} refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={props.update.bind(this)} />
                }>

              {items.map( (item,i) => 
                  <TouchableHighlight style={styles.itemList} key={i} 
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item)}>
                    
                    <Text style={styles.itemText}>
                      {props.item(item)}
                    </Text>

                  </TouchableHighlight>
              )}
              </ScrollView> 
          </View>
  
});

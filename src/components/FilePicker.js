import React, { useState, useCallback } from 'react';
import { View, Text, StatusBar, Button, StyleSheet} from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';

const styles = StyleSheet.create({
    uri:{
      fontSize:20
    },
});

export function FilePicker(props){
    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [types.pdf],
        });
        setFileResponse(response);
        props.onSelect(response);
      } catch (err) {
        console.warn(err);
      }
    }, [props]);
    
  
    return (
      <View>
        <StatusBar barStyle={'dark-content'} />
        {fileResponse.map((file, index) => (
          <Text
            key={index.toString()}
            style={styles.uri}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {file?.uri}
          </Text>
        ))}
        <Button title="Select 📑" onPress={handleDocumentSelection} />
      </View>
    );
};
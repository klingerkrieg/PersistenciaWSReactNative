import React, { useState, useCallback } from 'react';
import { StyleSheet} from 'react-native';
//import DocumentPicker, { types } from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Button, buttonTypes } from './Button';

const styles = StyleSheet.create({
    uri:{
      fontSize:20
    },
});

export function FotoPicker(props){
    
    const handleDocumentSelection = useCallback(async () => {
      launchImageLibrary({selectionLimit: 1}, (response) => {
        if (response.assets) {
          props.onSelect(response.assets[0]);
        }
      });
    }, [props]);
    
  
    return (
        <Button type={buttonTypes.normal} 
                      onPress={handleDocumentSelection}>Selecionar foto</Button>
    );
};
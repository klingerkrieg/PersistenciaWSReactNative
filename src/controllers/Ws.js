import base64 from 'react-native-base64'
import queryString from 'query-string';
import FormData from 'form-data'

export async function makeRequest(method,action,data){
    if (data == null){
        data = "";
    }
    try{
        const rawResponse = await fetch(global.wsIP+'/'+action, {
            method: method,
            headers: {'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
            },
            body: queryString.stringify(data)
        });

        const json = await rawResponse.json();

        return json;
    } catch(err){
        return {error:true,message:err}
    }
}

export async function makeRequest2(method,action,dados,arquivos){
    const url = global.wsIP+'/'+action;

    let formData = new FormData();

    for ( var key in dados ) {
        formData.append(key, dados[key]);
    }
    console.log(arquivos);
    for ( var key in arquivos ) {
        formData.append(key, arquivos[key]);
        console.log(key)
        console.log(arquivos[key])
    }

    let options = {}
    options.method = method;
    options.headers = {'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)};
    options.body = formData;
    

    try{
        const rawResponse = await fetch(url,options);
        const json = await rawResponse.json();
        return json;
    } catch(err){
        return {error:true,message:err}
    }
}

/*
export async function makeRequest2(method,action,dados){
    const url = global.wsIP+'/'+action;

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    const data = new FormData(dados);

    for ( var key in dados ) {
        form_data.append(key, item[key]);
    }

    /*if (this.state.rg != null){ 
        if(this.state.rg.uri != null){
            console.log("Entrou aqui");
            data.append('rg',{
                name: this.state.rg.fileName,
                type: this.state.rg.type,
                uri:
                    Platform.OS === 'android'
                    ? this.state.rg.uri
                    : this.state.rg.uri.replace('file://', ''),
                })
        } else{
            console.log("Entrou aqui 3");
            data.append('rg', this.state.rg.replace('static/fotos/', ''))
        }
    }//

    xhr.setRequestHeader('Authorization', 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword))
    try{
        xhr.send(data);
    } catch(err){
        return {error:true,message:err}
    }
    xhr.onreadystatechange = e => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            return {error:true,message:xhr.responseText};
        }
    };
}

*/
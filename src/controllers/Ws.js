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
    
    for ( var key in arquivos ) {
        let fileData = {name:arquivos[key].fileName,
                    uri:arquivos[key].uri,
                    type:arquivos[key].type}
        formData.append(key, fileData);
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

export async function getImage(path,name){
    let options = {
        method:'GET',
        fileCache:true,
        headers:{'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)}
    }
    
    let url = global.wsIP + "/" + path + "/" + name;
    
    try{
        const resp = await fetch(url,options);
        const blob = await resp.blob();
        //transforma o blob para uma string base64
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              resolve(base64data);
            };
          });

    } catch(e){
        console.log("Erro ao recuperar imagem:");
        console.log(e);
        return "";
    }
}

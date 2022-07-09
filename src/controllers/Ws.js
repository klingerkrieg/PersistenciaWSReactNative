import base64 from 'react-native-base64'
import FormData from 'form-data'

export async function makeRequest(method,action,dados,arquivos){
    const url = global.wsIP+'/'+action;

    method = method.toUpperCase();

    if (method != "GET"){
        var formData = new FormData();

        for ( var key in dados ) {
            formData.append(key, dados[key]);
        }
        
        for ( var key in arquivos ) {
            let fileData = {name:arquivos[key].fileName,
                        uri:arquivos[key].uri,
                        type:arquivos[key].type}
            formData.append(key, fileData);
        }
    }

    let options = {}
    options.method = method;
    
    //Basic Authorization
    //options.headers = {'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)};

    //Authorization com token
    if (global.token != null){
        options.headers = {'x-access-token': global.token};
    }

    if (method != 'GET'){
        options.body = formData;
    }
    

    try{
        const rawResponse = await fetch(url,options);
        const json = await rawResponse.json();
        return json;
    } catch(err){
        return {error:true,message:err}
    }
}

export async function getRemoteImage(path,name){
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

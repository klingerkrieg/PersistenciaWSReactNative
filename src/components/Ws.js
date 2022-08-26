//import base64 from 'react-native-base64'
import FormData from 'form-data'

export async function makeRequest(method,action,dados,arquivos){
    const url = global.wsIP+'/'+action;

    method = method.toUpperCase();

    
    let options = {}
    options.method = method;
    options.headers = {};

    
    let hasFiles = false;
    if (arquivos != undefined && typeof arquivos == 'object'){
        hasFiles = true;
    }

    var data;
    if (hasFiles){
        data = new FormData();
        for ( var key in dados ) {
            data.append(key, dados[key]);
        }

        for ( var key in arquivos ) {
            hasFiles = true;
            if ( Array.isArray(arquivos[key])){
                arquivos[key].map((file,i) => {
                    //só adiciona os elementos que tiverem fileName
                    if (file.fileName == undefined){
                        return;
                    }
                    data.append(key+"["+i+"]", {name:file.fileName,
                                                uri:file.uri,
                                                type:file.type})
                })
            } else {
                let fileData = {name:arquivos[key].fileName,
                            uri:arquivos[key].uri,
                            type:arquivos[key].type}
                data.append(key, fileData);
            }
        }

        options.headers = {'Content-Type':'multipart/form-data'}
    } else {
        data = new URLSearchParams(dados).toString();
        options.headers = {'Content-Type':'application/x-www-form-urlencoded'};
    }
    
    
    //Basic Authorization
    //options.headers = {'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)};

    //Authorization com token
    if (global.token != null){
        options.headers['x-access-token'] = global.token;
    }

    if (method != 'GET'){
        options.body = data;
    }
    
    if (global.debug){
        console.log("\r\n");
        console.log(method + " " + url);
        console.log("====Headers=====");
        console.log("\t" + options.headers['Content-Type']);
        if (hasFiles){
            options.body._parts.map((el,i) => {
                console.log(el[0] + " : " + JSON.stringify(el[1]));
            })
            //console.log("\t" + options.body._parts);
        } else {
            console.log("\t" + options.body);
        }
    }

    try{
        const rawResponse = await fetch(url,options);
        const json = await rawResponse.json();
        if (debug){
            console.log("====Response=====");
            console.log(json);
        }
        return json;
    } catch(err){
        if (debug){
            console.log("====Response=====");
            console.log(err);
        }
        return {error:true,message:err}
    }
}

export async function getRemoteImage(path){
    let options = {
        method:'GET',
        fileCache:true,
        //headers:{'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)}
    }

    if (global.token != null){
        //options.headers = {'Authorization': 'Bearer '+global.token};
        options.headers = {'x-access-token': global.token};
    }
    
    let url = global.wsIP + "/" + path;

    if (global.debug){
        console.log("\r\n");
        console.log("GET " + url);
        console.log("====Headers=====");
        console.log("\t" + options.headers['Authorization']);
    }
    
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

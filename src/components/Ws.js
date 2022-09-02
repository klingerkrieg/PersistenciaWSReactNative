import FormData from 'form-data'
const axios = require('axios').default;

function uploadBuild(dados, arquivos){
    if (arquivos != undefined && typeof arquivos == 'object'){
        let data = new FormData();
        for ( var key in dados ) {
            data.append(key, dados[key]);
        }

        for ( var key in arquivos ) {
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
        return data;
    }
    return false;
}



export async function makeRequest(method,action,dados,arquivos){
    
    //Verifica se é uma chamada para uma url ou uma action
    let url = null;
    if (action.indexOf('http') > -1){
        url = action;
    } else {
        url = global.wsIP+'/'+action;
    }

    //se for para debugar
    if (global.debug){
        console.log("====Request=====");
        console.log(method + " " + url);
        console.log("\t" + JSON.stringify(dados));
    }    

    //Configura o header
    let headers = {};


    //Se constroi o conjunto de dados que será enviado
    //Isso é necessário caso haja upload de arquivos
    let newDados = uploadBuild(dados, arquivos);
    if (newDados != false){
        dados = newDados;
        headers['Content-Type'] = 'multipart/form-data';
    }


    if (global.token != null) {
        //Basic Authorization
        //headers = {'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword)};
        if (global.auth_header == AUTH_NODE){
            headers['x-access-token'] =  global.token //Node    
        } else
        if (global.auth_header == AUTH_LARAVEL){
            headers['Authorization']  = 'Bearer '+ global.token //Laravel
        }

        //se houver upload
        if (newDados != false){
            headers['Content-Type'] = 'multipart/form-data';
        }

        if (global.debug){
            console.log("====Headers=====");
            console.log("\t" + JSON.stringify(headers))
        }
    }

    let erro = null;

    //faz a requisicao
    const resp = await axios({
        method:method,
        url:url,
        data:dados,
        timeout: 3000,
        headers: headers
    }).catch(err => {
        console.log("====Response=====");
        console.log(err)
        erro = err;
        console.log("=================");
    });

    if (resp == undefined){
        return {error:1, message:erro};
    }

    //se for para debugar
    if (global.debug){
        console.log("====Response=====");
        console.log(resp.data);
        console.log("=================");
    }

    return resp.data
}

export async function getRemoteImage(path){
    let url = global.wsIP + "/" + path;

    //Se for para debugar
    if (global.debug){
        console.log("====Request=====");
        console.log("GET " + url);
    }

    //Configura o header
    let headers = {};
    if (global.token != null) {
        if (global.auth_header == AUTH_NODE){
            headers['x-access-token'] =  global.token //Node    
        } else
        if (global.auth_header == AUTH_LARAVEL){
            headers['Authorization']  = 'Bearer '+ global.token //Laravel
        }

        if (global.debug){
            console.log("====Headers=====");
            console.log("\t" + JSON.stringify(headers))
        }
    }


    //faz a requisicao
    const resp = await axios({
        method:'GET',
        url:url,
        timeout: 5000,
        headers: headers,
        responseType: 'blob'
    }).catch(err => {
        console.log("====Response=====");
        console.log(err)
        erro = err;
        console.log("=================");
    });

    
    try{
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(resp.data);
            reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
            };
        });
    } catch(e){
        console.log("**Erro ao converter imagem para base64");
        console.log(e);
        return "";
    }
}

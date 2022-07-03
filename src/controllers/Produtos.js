import { makeRequest, makeRequest2 } from './Ws';


export async function getAll(){
    
    const json = await makeRequest('GET','users');
    return json;
    
}


export async function get(id){
    
    const json = await makeRequest('GET','users/'+id);
    
    return json;
    
}

export async function save(dados, foto){

    let arquivos = [];
    if (foto != null){
        arquivos['foto'] = foto[0];
    }

    const json = await makeRequest2('POST','users', dados, arquivos);

    console.log("RESP");
    console.log(json);

    return json;
}


export async function update(dados){
    
    const json = await makeRequest('PUT','users', dados);

    return json;
}


export async function del(id){
    var dados = {'id':id};
    
    const json = await makeRequest('DELETE','users', dados);
    
    return json;
}
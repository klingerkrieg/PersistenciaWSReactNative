import { makeRequest } from './Ws';


export async function getAll(){
    
    const json = await makeRequest('GET','users');

    return json;
    
}


export async function get(id){
    
    const json = await makeRequest('GET','users/'+id);
    
    return json;
    
}

export async function save(dados){
    
    const json = await makeRequest('POST','users', dados);

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
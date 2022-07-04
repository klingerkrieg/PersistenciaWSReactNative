import { makeRequest, getRemoteImage } from './Ws';


export async function getAll(){
    
    const json = await makeRequest('GET','users');
    return json;
    
}


export async function get(id){
    
    let json = await makeRequest('GET','users/'+id);
    if (json.data.foto != ""){
        //tem que lembrar que as imagens tambem estao protegidas por senha
        //entao é feito um fetch para as imagens e transforma-se 
        //a imagem para uma string base 64, não fosse isso
        //poderia se usar o uri com o endereço web da imagem
        let base64 = await getRemoteImage('uploads',json.data.foto);
        json.data.foto = {uri: base64};
    }
    return json;
    
}

export async function save(dados, foto){

    let arquivos = [];
    if (foto != null){
        console.log(foto);
        arquivos['foto'] = foto;
    }

    const json = await makeRequest('POST','users', dados, arquivos);

    return json;
}


export async function update(dados, foto){

    let arquivos = [];
    if (foto != null){
        console.log(foto);
        arquivos['foto'] = foto;
    }

    const json = await makeRequest('PUT','users', dados, arquivos);

    return json;
}


export async function del(id){
    var dados = {'id':id};
    
    const json = await makeRequest('DELETE','users', dados);
    
    return json;
}
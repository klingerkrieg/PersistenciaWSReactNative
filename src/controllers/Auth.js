import { makeRequest, getRemoteImage } from './Ws';


export async function logar(dados){
    
    const json = await makeRequest('POST','login',dados);
    return json;
    
}

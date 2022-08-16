import { makeRequest, getRemoteImage } from '../components/Ws';


export async function logar(dados){
    
    const json = await makeRequest('POST','login',dados);
    return json;
    
}

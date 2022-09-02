import { makeRequest, getRemoteImage } from '../components/Ws';


export async function logar(dados){
    const json = await makeRequest('POST','login',dados);
    if (json.error == 0){
        global.token = json.accessToken
        return true;
    } else {
        return json;
    }
}

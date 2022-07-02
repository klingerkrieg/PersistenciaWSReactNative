import base64 from 'react-native-base64'
import queryString from 'query-string';

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


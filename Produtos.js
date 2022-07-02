import base64 from 'react-native-base64'
import queryString from 'query-string';



export async function getAll(){
    
    const rawResponse = await fetch(global.wsIP+'/users', {
        method: 'GET',
        headers: {'Content-Type':'text/html',
                'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
        }
    });
    
    const json = await rawResponse.json();
    
    if (json.error){
        return [];
    } else {
        return json.data;
    }
    
}


export async function get(id){
    const rawResponse = await fetch(global.wsIP+'/users/'+id, {
        method: 'GET',
        headers: {'Content-Type':'text/html',
                'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
        }
    });
    
    const json = await rawResponse.json();
    
    if (json.error){
        return [];
    } else {
        return json.data;
    }
    
}

export async function save(dados){
    
    const rawResponse = await fetch(global.wsIP+'/users', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
        },
        body: queryString.stringify(dados)
    });
    
    const json = await rawResponse.json();
    
    if (json.error){
        return [];
    } else {
        return json.data;
    }
}


export async function update(dados){
    console.log(dados);
    const rawResponse = await fetch(global.wsIP+'/users', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
        },
        body: queryString.stringify(dados)
    });
    
    const json = await rawResponse.json();
    console.log(json);
    if (json.error){
        return [];
    } else {
        return json.data;
    }
}


export async function del(id){
    var dados = {'id':id};
    const rawResponse = await fetch(global.wsIP+'/users', {
        method: 'DELETE',
        headers: {'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ base64.encode(global.wsUser+':'+global.wsPassword),
        },
        body: queryString.stringify(dados)
    });
    
    const json = await rawResponse.json();
    
    if (json.error){
        return [];
    } else {
        return json.data;
    }
}
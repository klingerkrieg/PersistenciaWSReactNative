//Config para emulador do android no pc
global.wsIP          = "http://10.0.2.2:8080";
//Config para usar o seu celular
//global.wsIP          = "http://10.195.1.51:8080";

global.token         = null;
global.debug         = true;

// Forma de envio do cabeçalho
AUTH_LARAVEL = 1; //Authorization:Bearer {token}
AUTH_NODE    = 2; //x-access-token:{token}

global.auth_header = AUTH_LARAVEL;

//nao utilizado
global.wsUser        = "admin";
global.wsPassword    = "123456";


global.titleFontSize  = 20;
global.normalFontSize = 18;
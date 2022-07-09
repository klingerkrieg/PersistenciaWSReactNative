
//Navegação
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { Login } from './Login'
import ListagemProduto from './ListagemProduto';
import { CadastroProduto } from './CadastroProduto';

//No final do arquivo
const MainNavigator = createStackNavigator({
    "Login": {screen: Login},
    "Produtos": {screen: ListagemProduto},
    "Cadastro de produtos": {screen: CadastroProduto},
});

const App = createAppContainer(MainNavigator);
export default App;
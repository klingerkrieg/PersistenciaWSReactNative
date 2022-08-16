
//Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './Login'
import { ListagemProduto } from './ListagemProduto';
import { CadastroProduto } from './CadastroProduto';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Produtos" component={ListagemProduto} />
          <Stack.Screen name="Cadastro de produtos" component={CadastroProduto} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default App;
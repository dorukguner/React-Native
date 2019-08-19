import { createStackNavigator, createAppContainer } from 'react-navigation';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';

const MainNavigator = createStackNavigator({
  Menu: { screen: MenuScreen },
  Game: { screen: GameScreen },
},
  // {
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerVisible: false,
  //   }
  // }
);

const App = createAppContainer(MainNavigator);

export default App;

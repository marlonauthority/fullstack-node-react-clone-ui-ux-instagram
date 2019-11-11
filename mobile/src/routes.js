import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from './pages/Feed';
import New from './pages/New';

export default createAppContainer(
  createStackNavigator({
    Feed,
    New,
  })
);

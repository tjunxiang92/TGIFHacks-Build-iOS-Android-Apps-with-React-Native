import {
	StackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';

export default StackNavigator({
  Home: { screen: HomeScreen },
  Edit: { screen: EditScreen },
})

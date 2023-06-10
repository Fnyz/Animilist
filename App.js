import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Genres from './components/Genres';
import GenresDetails from './components/GenresDetails';
import HomePage from './components/HomePage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Genres" component={Genres} />
        <Stack.Screen name="GenresDetails" component={GenresDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
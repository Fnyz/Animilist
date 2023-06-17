import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Genres from './components/Genres';
import GenresDetails from './components/GenresDetails';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import Episode from './components/Episode';
import ViewPage from './components/ViewPage';


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
        <Stack.Screen name="AnimeDetail" component={DetailsPage} />
        <Stack.Screen name="Episodes" component={Episode} />
        <Stack.Screen name="View" component={ViewPage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
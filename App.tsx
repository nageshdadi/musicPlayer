import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MusicHome from './components/MusicHome';
import DetailMusic from './components/DetailMusic';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="musicHome" component={MusicHome} />
        <Stack.Screen name="detailMusic" component={DetailMusic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

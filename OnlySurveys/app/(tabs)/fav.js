import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import favList from '../subtabs/favList';
import Chatroom from '../subtabs/chatroom';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Fav" component={favList}/>
        <Stack.Screen 
          name="Chatroom" 
          component={Chatroom}
          options={({ route }) => ({ title: route.params.chatNum })}
        />

      </Stack.Navigator>
  );
}
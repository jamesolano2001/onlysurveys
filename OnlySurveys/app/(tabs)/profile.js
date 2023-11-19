import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import profile from '../subtabs/profileSummary';
import myreward from '../subtabs/myreward';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="My Profile" component={profile}/>
        <Stack.Screen name="My Rewards" component={myreward}/>
      </Stack.Navigator>
  );
}
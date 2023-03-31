/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CalendarScreen} from './src/screens/calendar/CalendarScreen';
import DayScreen from './src/screens/day/DayScreen';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName="Calendar">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Calendar"
            options={{headerShown: false}}
            component={CalendarScreen}
          />
          <Stack.Screen
            name="Day"
            options={{headerShown: false}}
            component={DayScreen}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

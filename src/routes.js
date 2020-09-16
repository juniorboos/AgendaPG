import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/User/Home';

const Stack = createStackNavigator();

const Routes = () => {
   return (
      <Stack.Navigator
         headerMode="none"
         screenOptions={{
            cardStyle: {
               backgroundColor: '#EBEBEB'
            }
         }}
      >
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="UserHome" component={UserHome} />

      </Stack.Navigator>
   )
}

export default Routes;

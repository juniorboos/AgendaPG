import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/User/Home';
import Chatbot from './pages/User/Chatbot';
import Subcategories from './pages/User/Subcategories';
import ItemView from './pages/User/ItemView';
import AdminHome from './pages/Admin/Home';
import Status from './pages/User/Status';
import Pass from './pages/Admin/Pass';

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
         <Stack.Screen name="Chatbot" component={Chatbot} />
         <Stack.Screen name="Subcategories" component={Subcategories} />
         <Stack.Screen name="ItemView" component={ItemView} />
         <Stack.Screen name="AdminHome" component={AdminHome} />
         <Stack.Screen name="Status" component={Status} />
         <Stack.Screen name="Pass" component={Pass} />

      </Stack.Navigator>
   )
}

export default Routes;

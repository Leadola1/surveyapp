import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Family from '../screens/Family';
import Farmer from '../screens/Farmer';
import Icon from 'react-native-vector-icons/MaterialIcons';

type screenType = {
  Farmer: undefined;
  Family: undefined;
};
const Tab = createBottomTabNavigator<screenType>();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Farmer') {
              iconName = focused ? 'person' : 'person';
            } else if (route.name === 'Family') {
              iconName = focused ? 'groups' : 'groups';
              size = 35;
            }
            return iconName !== undefined ? (
              <Icon name={iconName} size={size} color={color} />
            ) : null;
          },
          tabBarActiveTintColor: '#007155',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#007155',
          },

          headerTitleAlign: 'center',
          headerTintColor: 'white',
        })}>
        <Tab.Screen name="Farmer" component={Farmer} />
        <Tab.Screen name="Family" component={Family} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

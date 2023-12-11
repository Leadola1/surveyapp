import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DynamicFormPage from '../screens/DynamicFormPage';
import formData from '../assets/data.json';
import { FormFieldType } from '../assets/type';
type TabParamList = {
  [key: string]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const generatePages = () => {
  return Object.entries(formData).map(([key, value]) => (
    <Tab.Screen key={key} name={key}>
      {() => <DynamicFormPage formData={value as FormFieldType[]} formType={key as string} />}
    </Tab.Screen>
  ));
};

export default function Navigation() {
  const pages = generatePages();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'farmer_registration') {
              iconName = focused ? 'person' : 'person';
            } else {
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
        })}
      >
        {pages}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
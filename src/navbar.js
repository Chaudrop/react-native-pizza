import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import New from './screens/new';
import Profile from './screens/profile';
import Orders from './screens/orders';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="My Orders"
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tab.Screen
        name="My Orders"
        component={Orders}
        options={{
          tabBarLabel: 'My orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pizza" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order a new pizza"
        component={New}
        options={{
          tabBarLabel: 'New order',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavBar() {
  return <MyTabs />;
}

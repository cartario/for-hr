import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LessonsNavigator } from './lessons-stack-navigator';
import { BookedLessonsNavigator } from './lessons-booked-stack-navigator';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';

const Tab = createBottomTabNavigator();

export const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Lessons') {
            iconName = focused ? 'md-list-circle' : 'md-list-circle-outline';
          } else if (route.name === 'BookedLessons') {
            iconName = focused ? 'star' : 'star-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: THEME.MAIN_COLOR,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Lessons" component={LessonsNavigator} options={{ title: 'Все уроки' }} />
      <Tab.Screen
        name="BookedLessons"
        component={BookedLessonsNavigator}
        options={{ title: 'Избранное' }}
      />
    </Tab.Navigator>
  );
};
